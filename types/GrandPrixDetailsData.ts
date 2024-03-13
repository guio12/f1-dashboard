export type GrandPrixDetailsData = {
  season?: string
  round?: string
  url: string
  name: string
  isSprintGrandPrix?: boolean
  fullSchedule: {
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
  circuit: {
    url: string
    name: string
    locality: string
    country: string
  }
}
