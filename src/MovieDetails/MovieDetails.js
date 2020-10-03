import React, { useState, useEffect } from 'react'
import MainImage from '../helper/MainImage'
import { isAutheticated } from '../auth/helper'
import MovieInfo from './Sections/MovieInfo'
import Favorite from './Sections/Favorite'
import LikeDislikes from './Sections/LikeDislikes'
import Comments from './Sections/Comments'
import { API } from '../backend'
const APIurl = API ||"https://mernmovieapp.herokuapp.com/api";

function MovieDetails(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovies, setLoadingForMovies] = useState(true)
    const movieVariable = {
        movieId : movieId
    }
    const {user, token} = isAutheticated()

    useEffect(() => {
        fetchDetailInfo()
        fetchComments()        
    }, [])

    const fetchDetailInfo = () => {
        fetch(`${APIurl}/movie/${movieId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
            setLoadingForMovies(false)
        })
        .catch(err => console.log(err))
    }

    const fetchComments = () => {
        fetch(`${APIurl}/getComments`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Connection : "keep-alive"
            },
            body: JSON.stringify(movieVariable)
        } )
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.success){
                console.log( response.comments )
                setCommentLists(response.comments)
            } else {
                alert('Failed to get comments')
            }
        })
    }
    const addComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }
    return(
       <div >
           {!LoadingForMovies ? 
                <MainImage image= {`${APIurl}/movie/photo/${movieId}`}
                title = {Movie.title}
                description = {Movie.description}
                detailpage = {true}
                />
                
                :
                <div>Loading...</div>
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes movie movieId={movieId} userId={localStorage.getItem('userId')} />
            </div>

            {isAutheticated() &&
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight:'1160px', marginTop:'100px', paddingBottom:'0px'}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={user._id} />
                </div>
            }     
            
            {!LoadingForMovies ?
                <MovieInfo movie={Movie} />
                : <div>Loading..</div>
            }
            <Comments movieTitle={Movie.title} CommentLists={CommentLists} 
            postId={movieId} refreshFunction={addComment} />

             
       </div>
    );
}

export default MovieDetails