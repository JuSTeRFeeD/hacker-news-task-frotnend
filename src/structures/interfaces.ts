interface Story {
  id: number
  by: number
  url: string
  type: string
  time: number
  score: number
  title: string
  descendants: number
  kids?: number[]
}

interface Comment {
  id: number
  by: string
  text: string
  time: number
  type: string
  parent?: number
  kids?: number[]
  kidsComments?: Comment[]
}

export type { Story, Comment }
