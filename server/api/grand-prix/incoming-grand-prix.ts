export default defineEventHandler(async () => {
  try {
    const response = await $fetch(
      'https://api.openf1.org/v1/meetings?meeting_key=latest'
    )

    const incomingGrandPrixOverview = response[0]

    const relevantResponse: IncomingGrandPrixOverviewI = {
      id: incomingGrandPrixOverview?.meeting_key,
      name: incomingGrandPrixOverview?.meeting_name,
      officialName: incomingGrandPrixOverview?.meeting_official_name,
      countryName: incomingGrandPrixOverview?.country_name,
      location: incomingGrandPrixOverview?.location,
      date: incomingGrandPrixOverview?.date_start,
      year: incomingGrandPrixOverview?.year,
    }

    return relevantResponse
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Impossible de trouver la prochaine course',
    })
  }
})
