import type { APIGrandPrixData } from '~/types/APIGrandPrixData'
import type { GrandPrixDetailsData } from '~/types/GrandPrixDetailsData'
import addScheduleEntry from '~/utils/addScheduleEntry'

export default defineEventHandler(async (event) => {
  const { season, round } = event.context.params ?? {}

  try {
    // Finalement on patiente avant d'utiliser Open F1, la saison 2024 ne sera pas prête de suite
    const response: APIGrandPrixData = await $fetch(
      //`https://api.openf1.org/v1/sessions?meeting_key=${round}`
      `https://ergast.com/api/f1/${season}/${round}.json`
    )

    const roundInfo = response?.MRData.RaceTable.Races[0]

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
    } = roundInfo || {}

    const relevantResponse: GrandPrixDetailsData = {
      url,
      name: raceName,
      fullSchedule: {
        firstPractice: {
          date: FirstPractice.date,
          time: FirstPractice.time,
        },
        secondPractice: {
          date: SecondPractice.date,
          time: SecondPractice.time,
        },
        qualifying: {
          date: Qualifying.date,
          time: Qualifying.time,
        },
        race: {
          date,
          time,
        },
      },
      circuit: {
        url: Circuit.url,
        name: Circuit.circuitName,
        locality: Circuit.Location.locality,
        country: Circuit.Location.country,
      },
    }

    // on rajoute une session de type Sprint ou ThirdPractice selon les cas
    if (Sprint) {
      addScheduleEntry(relevantResponse.fullSchedule, Sprint, 'sprint')
    }

    if (ThirdPractice) {
      addScheduleEntry(
        relevantResponse.fullSchedule,
        ThirdPractice,
        'thirdPractice'
      )
    }

    return relevantResponse
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Impossible de trouver le détail du GP',
    })
  }
})
