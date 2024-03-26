import type { APIGrandPrixData } from '~/types/APIGrandPrixData'
import type { GrandPrixDetailsData } from '~/types/GrandPrixDetailsData'

export default defineEventHandler(async () => {
  try {
    //finalement on patiente avant d'utiliser Open F1, la saison 2024 ne sera pas prête de suite
    const response: APIGrandPrixData = await $fetch(
      //'https://api.openf1.org/v1/meetings?meeting_key=latest'
      `https://ergast.com/api/f1/current/next.json`
    )

    const incomingGrandPrixInfo = response.MRData.RaceTable.Races[0]

    const {
      season,
      round,
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
    } = incomingGrandPrixInfo || {}

    const relevantResponse: GrandPrixDetailsData = {
      season,
      round,
      url,
      name: raceName,
      isSprintGrandPrix: !!Sprint,
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
    const addScheduleEntry = (
      scheduleObject: Record<string, any>,
      sessionData: { date: string; time: string },
      entryName: string
    ) => {
      if (sessionData) {
        scheduleObject[entryName] = {
          date: sessionData.date,
          time: sessionData.time,
        }
      }
    }

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
      message: 'Impossible de trouver la prochaine course',
    })
  }
})
