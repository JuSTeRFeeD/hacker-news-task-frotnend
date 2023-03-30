import { makeAutoObservable } from "mobx"
import { getAPI } from "../axios-helper"
import { Comment, Story } from "../structures/interfaces"

class StoryStore {
  story?: Story | null
  comments?: Comment[] | null
  isRefreshingComments = false

  constructor() {
    makeAutoObservable(this)
  }

  async getStory(id: number) {
    if (this.story?.id != id)
      this.story = null;
    else
      return;

    const res = await getAPI<Story>('Story/getStory', { id })
    if (!res.ok) return;

    this.story = res.data
    await this.refreshComments();
  }

  async refreshComments() {
    if (this.isRefreshingComments) return;
    this.isRefreshingComments = true;

    if (!this.story || !this.story?.kids?.length) {
      this.isRefreshingComments = false;
      return;
    }
    this.comments = await this.getChildComments(this.story.kids as number[]);
    this.isRefreshingComments = false;
  }

  async getChildComments(ids: number[]) : Promise<Comment[]> {
    if (!ids) return [];

    const params = ids.map((n, index) => `ids[${index}]=${n}`).join('&')
    const res = await getAPI<Comment[]>('Story/getComments?' + params)
    if (res.ok) {
      return res.data as Comment[];
    }
    return [];
  }
}

export default new StoryStore();
