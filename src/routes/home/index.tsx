import React, { useEffect, useState } from 'react'
import './home.scss'
import StoryList from './StoryList'
import stories from '../../store/storiesListStore'
import { observer } from "mobx-react";


const Home = observer(() => {
  const [intervalId, setIntervalId ] = useState<any>()

  useEffect(() => {
    refreshStories()
  }, [])

  const { isLoadingStories } = stories;

  const refreshStories = () => {
    if (isLoadingStories) return;
    clearInterval(intervalId)
    stories.getStories();
    const id = setInterval(() => stories.getStories(), 1000 * 60)
    setIntervalId(id)
  }

  return (
    <div>
      <div>
        <h1>Newest on Hackers News</h1>
        <button onClick={() => refreshStories()} style={{width: '150px'}}>
          { isLoadingStories ? 'Loading...' : 'Refresh news' }
        </button>
      </div>
      <StoryList/>
    </div>
  )
})

export default Home
