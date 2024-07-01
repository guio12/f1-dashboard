import type { APIGrandPrixData } from '~/types/APIGrandPrixData'
import type { GrandPrixDetailsData } from '~/types/GrandPrixDetailsData'
import type { GrandPrixFullScheduleData } from '~/types/GrandPrixFullScheduleData'

async function fetchData(
  season: string,
  round: string
): Promise<APIGrandPrixData> {
  // Finalement on patiente avant d'utiliser Open F1, la saison 2024 ne sera pas prête de suite
  //`https://api.openf1.org/v1/sessions?meeting_key=${round}`
  const response = await $fetch(
    `https://ergast.com/api/f1/${season}/${round}.json`
  )
  return response as APIGrandPrixData
}

function transformData(
  response: APIGrandPrixData,
  season: string,
  round: string
): GrandPrixDetailsData {
  const roundInfo = response.MRData.RaceTable.Races[0]

  const {
    url,
    raceName,
    date,
    time,
    Circuit,
    FirstPractice,
    SecondPractice,
    ThirdPractice,
    Sprint,
    Qualifying,
  } = roundInfo

  const fullSchedule: GrandPrixFullScheduleData = {
    firstPractice: {
      date: FirstPractice.date,
      time: FirstPractice.time,
    },
    secondPractice: {
      date: SecondPractice.date,
      time: SecondPractice.time,
    },
    thirdPractice: undefined,
    sprint: undefined,
    qualifying: {
      date: Qualifying.date,
      time: Qualifying.time,
    },
    race: {
      date,
      time,
    },
  }

  /* On ajoute les sessions facultatives si elles existent
   * Il ne peut pas y avoir à la fois une session Sprint et une session ThirdPractice
   */
  if (Sprint) {
    fullSchedule.sprint = {
      date: Sprint.date,
      time: Sprint.time,
    }
  } else if (ThirdPractice) {
    fullSchedule.thirdPractice = {
      date: ThirdPractice.date,
      time: ThirdPractice.time,
    }
  }

  const relevantResponse: GrandPrixDetailsData = {
    season,
    round,
    url,
    name: raceName,
    isSprintGrandPrix: !!Sprint,
    fullSchedule,
    circuit: {
      url: Circuit.url,
      name: Circuit.circuitName,
      locality: Circuit.Location.locality,
      country: Circuit.Location.country,
      latitude: Circuit.Location.lat,
      longitude: Circuit.Location.long,
    },
  }

  return relevantResponse
}

export default defineEventHandler(async (event) => {
  const { season, round } = event.context.params ?? {}

  try {
    const response = await fetchData(season, round)
    const relevantResponse = transformData(response, season, round)
    return relevantResponse
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Impossible de trouver le détail du GP',
    })
  }
})
