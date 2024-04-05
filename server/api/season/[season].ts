import type { GrandPrixOverviewData } from '~/types/GrandPrixOverviewData'
import type { APIGrandPrixData } from '~/types/APIGrandPrixData'

export default defineEventHandler(async (event) => {
  const { season } = event.context.params ?? {}

  try {
    // Finalement on patiente avant d'utiliser Open F1, la saison 2024 ne sera pas prête de suite
    const response: APIGrandPrixData = await $fetch(
      //`https://api.openf1.org/v1/meetings?year=${year}`
      `https://ergast.com/api/f1/${season}.json`
    )

    const seasonInfo = response.MRData.RaceTable.Races

    const relevantResponse = seasonInfo?.map((grandPrix) => {
      const {
        season,
        round,
        url,
        raceName,
        Circuit,
        date,
        time,
        FirstPractice,
        Sprint,
      } = grandPrix || {}

      const gpInfo: GrandPrixOverviewData = {
        season,
        round,
        url: url,
        name: raceName,
        circuitName: Circuit.circuitName,
        dateStart: FirstPractice.date,
        dateEnd: date,
        time,
        isSprintGrandPrix: !!Sprint,
      }

      return gpInfo
    })

    return relevantResponse
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: `Impossible de trouver les données de la saison ${season}`,
    })
  }
})
