import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import { isAutheticated } from '../../auth/helper';
import {CaretDownFilled} from '@ant-design/icons';
import{LikeOutlined, LikeFilled} from '@ant-design/icons'
import { API } from '../../backend';

const APIurl = API ||"https://mernmovieapp.herokuapp.com/api";

function LikeDislikes(props) {
    const {user, token} = isAutheticated()

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};

    if (props.movie) {
        variable = { movieId: props.movieId }
    } else {
        variable = { commentId: props.commentId }
    }

    useEffect(() => {

            fetch(`${APIurl}/getLikes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(variable)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if(response.success) {
                    setLikes(response.likes.length)

                    response.likes.map(like => {
                        if(isAutheticated() && like.userId === user._id) {
                            // console.log("CHECK")
                            setLikeAction('liked')
                        }
                    })                    
                } else {
                    alert('Failed to get likes')
                }
            })

            fetch(`${APIurl}/getDislikes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(variable)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if(response.success) {
                    setDislikes(response.dislikes.length)

                    response.dislikes.map(dislike => {
                        if ( isAutheticated() && dislike.userId === user._id) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })
        

    }, [])


    const onLike = () => {
       
        if (!isAutheticated()) {
            return alert('Please Log in first');
        }

        if (LikeAction === null) {

            fetch(`${APIurl}/upLike/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(variable)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.success) {

                    setLikes(Likes + 1)
                    setLikeAction('liked')

                    //If dislike button is already clicked
                        if (DislikeAction !== null) {
                        setDislikeAction(null)
                        setDislikes(Dislikes - 1)
                    }
                } else {
                    alert('Failed to increase the like')
                }
            })

        } else {
            
            fetch(`${APIurl}/unLike/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify(variable)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if(response.success) {
                    setLikes(Likes -1)
                    setLikeAction(null)
                } else {
                    alert('Failed to decrease the like')
                }
            })

        }

    }


    const onDisLike = () => {

        if (!isAutheticated()) {
            return alert('Please Log in first');
        }

        if (DislikeAction !== null) {

            fetch(`${APIurl}/unDisLike/${user._id}`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                },
                body: JSON.stringify(variable)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.success) {
                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)
                } else {
                    alert('Failed to decrease dislike')
                }
            })

        } else {
            fetch(`${APIurl}/upDisLike/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(variable)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.success) {
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')

                    if(LikeAction !== null ) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }
                } else {
                    alert('Failed to increase dislike')
                }
            })
        }
    }

    if(props.movie) {
        return (
            <div style={{marginTop:"145px", marginRight:"1060px"}}>
            <React.Fragment>
                <span key="comment-basic-like">
                    <Tooltip title="Like">
                        {LikeAction === 'liked' ?
                          <LikeFilled  
                          style={{fontSize:"1.7rem", color:"yellow"}}
                          onClick={onLike}/>
                        :
                          <LikeOutlined 
                          style={{fontSize:"1.7rem", color:"yellow"}}
                          onClick={onLike}/>
                        }   
                    </Tooltip>
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
                </span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span key="comment-basic-dislike">
                    <Tooltip title="Dislike">
                        {DislikeAction === 'disliked' ?
                        <LikeFilled 
                        style={{fontSize:"1.7rem", color:"yellow"}}
                        rotate ="180"
                        onClick={onDisLike}
                        />
                        :
                        <LikeOutlined 
                        style={{fontSize:"1.7rem", color:"yellow"}}
                        rotate ="180"
                        onClick={onDisLike}
                        />
                        }
                    </Tooltip>
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
                </span>
            </React.Fragment>
            </div>
        )
    
    } else {
        return (
            <div style={{ marginLeft:"60px"}}>
            <React.Fragment>
                <span key="comment-basic-like">
                    <Tooltip title="Like">
                        {LikeAction === 'liked' ?
                          <LikeFilled  
                          style={{fontSize:"0.9rem", color:"yellow"}}
                          onClick={onLike}/>
                        :
                          <LikeOutlined 
                          style={{fontSize:"0.9rem", color:"yellow"}}
                          onClick={onLike}/>
                        }   
                    </Tooltip>
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
                </span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span key="comment-basic-dislike">
                    <Tooltip title="Dislike">
                        {DislikeAction === 'disliked' ?
                        <LikeFilled 
                        style={{fontSize:"0.9rem", color:"yellow"}}
                        rotate ="180"
                        onClick={onDisLike}
                        />
                        :
                        <LikeOutlined 
                        style={{fontSize:"0.9rem", color:"yellow"}}
                        rotate ="180"
                        onClick={onDisLike}
                        />
                        }
                    </Tooltip>
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
                </span>
            </React.Fragment>
            </div>
        )
    }
}

export default LikeDislikes
