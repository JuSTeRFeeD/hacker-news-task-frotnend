import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Path from "../../structures/path";
import { observer } from "mobx-react";
import './story.scss'
import moment from "moment";
import CommentItem from "./CommentItem";
import storyStore from "../../store/storyStore";


const Story = observer(() => {
  const story = storyStore.story;

  return !story ? null : (
    <div className="story">
      <h1>
        {!story.title ? '<Empty Title>' : story.title }
      </h1>
      <div className="story__date">
        {moment.unix(story.time).format("DD.MM.YYYY hh:mm:ss")}
      </div>
      {
        !story || !story.url ? null :
        <a
          className="button"
          target="_blank"
          href={story.url}
          rel="noreferrer"
        >
          Link to story page
        </a>
      }
    </div>
  )
})

const StoryView = observer(() => {
  const {id} = useParams()

  useEffect(() => {
    if (!id) return;
    storyStore.getStory(+id)
  }, []);

  const refreshComments = () => {
    storyStore.refreshComments();
  }

  const { comments, isRefreshingComments} = storyStore;
  const commentsList = !comments
    ? null
    : comments.map((item) => <CommentItem key={item.id} comment={item} level={0} isParentShowed={true}/>);

  return (
    <div className="story">
      <NavLink to={Path.Home} className="story__back">
        {'<'} Back
      </NavLink>
      <Story/>
      {
        !comments?.length ? null :
        <button
          onClick={() => refreshComments()}
        >
          { isRefreshingComments ? 'Refreshing...' : 'Refresh Comments' }
        </button>
      }
      {commentsList}
    </div>
  )
})

export default StoryView
