export default defineEventHandler(async () => {
  try {
    const response = await $fetch(
      `https://api.openf1.org/v1/meetings?year=2024` // trouver un moyen de trouver la prochaine course
    )

    const nextRace = response[0]

    const relevantResponse = {
      id: nextRace?.meeting_key,
      name: nextRace?.meeting_name,
      officialName: nextRace?.meeting_official_name,
      date: nextRace?.date_start,
    }

    return relevantResponse
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Impossible de trouver une course',
    })
  }
})
