export default defineEventHandler(async (event) => {
  console.log(event.context.params)
  const { id } = event.context.params

  try {
    const response = await $fetch(
      `https://api.openf1.org/v1/sessions?meeting_key=${id}`
    )

    //console.log(response)

    //const grandPrix = response[0]

    const relevantResponse = response?.map((session) => {
      const {
        location,
        country_name,
        year,
        session_name,
        session_type,
        session_key,
        date_start,
        date_end,
      } = session || {}

      const sessionInfo = {
        location,
        country_name,
        year,
        sessionName: session_name,
        sessionType: session_type,
        sessionId: session_key,
        dateStart: date_start,
        dateEnd: date_end,
      }

      return sessionInfo
    })

    console.log(relevantResponse);
    

    return relevantResponse
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Impossible de trouver le détail du GP',
    })
  }
})
