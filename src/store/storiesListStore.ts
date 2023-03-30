import { makeAutoObservable } from 'mobx'
import { getAPI } from '../axios-helper'
import { Story } from "../structures/interfaces";

class StoriesListStore {
  isLoadingStories = false
  storiesList: Story[] = []

  constructor () {
    makeAutoObservable(this)
  }

  async getStories () {
    this.isLoadingStories = true

    const res = await getAPI<Story[]>('Story/getNewStories')
    this.storiesList = res.data

    this.isLoadingStories = false
  }
}

export default new StoriesListStore()
