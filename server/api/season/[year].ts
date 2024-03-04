export default defineEventHandler(async (event) => {
  try {
    console.log(event.context.params)

    const { year } = event.context.params
    console.log(year)

    const response = await $fetch(
      `https://api.openf1.org/v1/meetings?year=${year}`
      //`https://api.openf1.org/v1/meetings?year=${year}`
    )

    //console.log(response)
    const relevantResponse = response?.map((gp) => {
      const { meeting_key, meeting_name, meeting_official_name, date_start, year } =
        gp || {}

      const gpInfo = {
        id: meeting_key,
        name: meeting_name,
        officialName: meeting_official_name,
        date: date_start,
        year: year,
      }

      return gpInfo
    })

    return relevantResponse
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: "Can't find the Grand Prix",
    })
  }
})
