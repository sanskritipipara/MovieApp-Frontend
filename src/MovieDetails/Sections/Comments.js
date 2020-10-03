import React, { useState } from 'react'
import { Input, Typography, } from 'antd';
import { isAutheticated } from '../../auth/helper';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { API } from '../../backend';
const { TextArea } = Input;
const { Title } = Typography;

const APIurl = API ||"https://mernmovieapp.herokuapp.com/api";

function Comments(props) {
    const {user, token} = isAutheticated()
    const {postId, CommentLists} = props;
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isAutheticated()) {
            return alert('Please Log in first');
        }
        const variables = {
            content: Comment,
        }
        console.log(variables)

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
                setComment("")
                props.refreshFunction(response.result)
            }else {
                alert('Failed to save Comment')
            }
        })
        
    }

    return (
        <div>
            <br />
            <Title style={{color:"silver", marginLeft:"75px", paddingTop:'20px'}} level={3} > Share your opinions - {props.movieTitle} </Title>
            <hr />
            {/* Comment Lists  */}
            {console.log(CommentLists)}

            {CommentLists && CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }

            {/* Root Comment Form */}
            <form style={{ display: 'flex', paddingBottom:"30px" , paddingTop:'20px'}} onSubmit={onSubmit}>
                <TextArea
                    style={{  marginLeft:'100px',width: '70%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <button 
                className="btn btn-outline-warning btn-small"
                style={{  borderRadius:'5%', height:'40px', marginTop:'5px', marginLeft:'5px' }} 
                onClick={onSubmit}>Share</button>
            </form>

        </div>
    )
}

export default Comments
