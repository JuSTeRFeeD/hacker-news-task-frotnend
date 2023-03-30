import React, { useEffect, useState } from 'react'
import { observer } from "mobx-react";
import { Comment } from "../../structures/interfaces";
import storyStore from "../../store/storyStore";
import moment from "moment";

interface CommentProps {
  comment: Comment
  level: number
  isParentShowed: boolean
}

const CommentItem = observer((props: CommentProps) => {
  const [isShowed, setIsShowed] = useState(false)
  const [childComments, setChildComments] = useState([] as Comment[])
  const [isLoadedChild, setIsLoadedChild] = useState(false)

  const offset = props.level * 5;
  const style = {
    marginLeft: `${offset > 50 ? 50 : offset}%`,
  };

  const toggle = async () => {
    const newVal = !isShowed;
    setIsShowed(newVal);
    if (newVal && !isLoadedChild && props.comment?.kids?.length != 0) {
      const kids = await storyStore.getChildComments(props.comment.kids as number[])
      setChildComments(kids)
      setIsLoadedChild(true);
    }
  }

  useEffect(() => {
    if (props.level == 0) {
      toggle()
    }
  }, [])

  return (
    (!props.comment.by && !props.comment.text || !props.isParentShowed) ? null :
      <div className="comment" style={style}>
        <div>
          {
            props.level === 0 ? null :
              <span
                onClick={() => toggle()}
                className={isShowed ? "comment__toggle comment__toggle_showed" : "comment__toggle"}
              >
          {isShowed ? 'HIDE' : 'SHOW'}
          </span>
          }
          <span className="comment__info">
          <span className="comment__by">
            {props.comment.by}
          </span>
          <span className="comment__date">
            {moment.unix(props.comment.time).fromNow()}
          </span>
        </span>
        </div>

        {
          !isShowed ? null :
            <p className="comment__text" dangerouslySetInnerHTML={{__html: props.comment.text}}/>
        }

        <div>
          {isShowed && props.comment.kids?.length && !isLoadedChild ? '...' : null}
          {
            childComments.map((childComment) => {
              return <CommentItem key={childComment.id} comment={childComment} level={1} isParentShowed={isShowed}/>
            })
          }
        </div>
      </div>
  )
})

export default CommentItem

