import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import LikeDislikes from './LikeDislikes';
import { isAutheticated } from '../../auth/helper';
import { API } from '../../backend';
const { TextArea } = Input;
const APIurl = API ||"https://mernmovieapp.herokuapp.com/api";


function SingleComment(props) {

    const {user, token} = isAutheticated()
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const {postId} = props;

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            responseTo: props.comment._id,
            content: CommentValue
        }
        
            fetch(`${APIurl}/${user._id}/${postId}/saveComment`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${token}`
                },
                body: JSON.stringify(variables)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if(response.success){
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.result)
                }else {
                    alert('Failed to save Comment')
                }
            })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span 
        style={{fontSize:'1rem', marginLeft:'550px'}}
        onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]

    return (
        <div>
            {console.log("In single")}
            <Comment
                actions={actions}
                author={ 
                        <p style={{ color:'white', fontSize:'1rem', marginTop:'5px'}}>
                            {props.comment.writer.name}</p>
                        }
                avatar={
                    <Avatar style={{ marginLeft:'100px'}}
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p style={{fontSize:'1rem', marginLeft:'50px', width:"50%"}}>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{marginLeft:'190px' ,width: '50%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <button className="btn btn-outline-warning btn-small" 
                    style={{ borderRadius:'5%', height:'40px', marginTop:'5px', marginLeft:'5px'}} 
                    onClick={onSubmit}>Reply</button>
                </form>
            }

        </div>
    )
}

export default SingleComment
