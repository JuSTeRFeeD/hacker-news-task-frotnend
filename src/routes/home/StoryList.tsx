import React from 'react'
import { observer } from 'mobx-react'
import stories from '../../store/storiesListStore'
import moment from "moment"
import { NavLink } from "react-router-dom";
import Path from "../../structures/path";

const StoryList = observer(() => {
  return (
    <div>
      {
        stories.storiesList.map((item) =>
          <div key={item.id} className="post">
            <NavLink to={`${Path.Story}/${item.id}`}>
              <div className="post__title">
                {item.title}
              </div>
              <div className="post__score">
                Points: {item.score}
              </div>
              <div className="post__info">
                <div>
                  By {item.by}
                </div>
                <div>
                  {moment.unix(item.time).format("DD.MM.YYYY, HH:mm:ss")}
                </div>
                <div>
                </div>
              </div>
            </NavLink>
          </div>
        )
      }
    </div>
  )
})

export default StoryList
