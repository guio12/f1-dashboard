export type APIGrandPrixData = {
  MRData: {
    RaceTable: {
      Races: {
        season: string
        round: string
        date: string
        time: string
        url: string
        raceName: string
        Circuit: {
          url: string
          circuitName: string
          Location: {
            locality: string
            country: string
          }
        }
        FirstPractice: {
          date: string
          time: string
        }
        SecondPractice: {
          date: string
          time: string
        }
        ThirdPractice?: {
          date: string
          time: string
        }
        Sprint?: {
          date: string
          time: string
        }
        Qualifying: {
          date: string
          time: string
        }
        Race: {
          date: string
          time: string
        }
      }[]
    }
  }
}
