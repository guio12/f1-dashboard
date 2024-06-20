import type { GrandPrixOverviewData } from '~/types/GrandPrixOverviewData'
import type { APIGrandPrixData } from '~/types/APIGrandPrixData'

async function fetchData(season: string): Promise<APIGrandPrixData> {
  // Finalement on patiente avant d'utiliser Open F1, la saison 2024 ne sera pas prête de suite
  //`https://api.openf1.org/v1/sessions?meeting_key=${round}`
  const response = await $fetch(`https://ergast.com/api/f1/${season}.json`)
  return response as APIGrandPrixData
}

function transformData(response: APIGrandPrixData): GrandPrixOverviewData[] {
  const seasonInfo = response.MRData.RaceTable.Races
  return seasonInfo?.map((grandPrix) => {
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
      countryName: Circuit.Location.country,
      dateStart: FirstPractice.date,
      dateEnd: date,
      time,
      isSprintGrandPrix: !!Sprint,
    }

    return gpInfo
  })
}

export default defineEventHandler(async (event) => {
  const { season } = event.context.params ?? {}

  try {
    const response = await fetchData(season)
    const relevantResponse = transformData(response)
    return relevantResponse
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: `Impossible de trouver les données de la saison ${season}`,
    })
  }
})
