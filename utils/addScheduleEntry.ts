export default function (
  scheduleObject: Record<string, any>,
  sessionData: { date: string; time: string },
  entryName: string
) {
  if (sessionData) {
    scheduleObject[entryName] = {
      date: sessionData.date,
      time: sessionData.time,
    }
  }
}
