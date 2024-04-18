export type GrandPrixFullScheduleData = {
  firstPractice: {
    date: string
    time: string
  }
  secondPractice: {
    date: string
    time: string
  }
  thirdPractice?: {
    date: string
    time: string
  }
  sprint?: {
    date: string
    time: string
  }
  qualifying: {
    date: string
    time: string
  }
  race: {
    date: string
    time: string
  }
}