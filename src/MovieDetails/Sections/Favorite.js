import React, { useEffect, useState } from 'react'
import { isAutheticated } from '../../auth/helper';
import { Tooltip } from 'antd';
import{HeartOutlined, HeartFilled} from '@ant-design/icons'
import { API } from '../../backend';

const APIurl = API ||"https://mernmovieapp.herokuapp.com/api";

function Favorite(props) {
    const {user, token} = isAutheticated();

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        movieRunTime: movieRunTime
    }

    const onClickFavorite = () => {

        if (!isAutheticated()) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            
            fetch(`${APIurl}/removeFromFavorite/${user._id}`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                },
                body:JSON.stringify(variables)
            })
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    setFavoriteNumber(FavoriteNumber-1);
                    setFavorited(!Favorited)
                } else {
                    alert('Failed to remove')
                }
             })
        } 
            else {
                fetch(`${APIurl}/addToFavorite/${user._id}`, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                    body:JSON.stringify(variables)
                })
                .then(response => response.json())
                .then(response => {
                    if(response.success){
                        setFavoriteNumber(FavoriteNumber+1);
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Add to Favorite')
                    }
                })
            }
    }

    useEffect(() => {

        fetch(`${APIurl}/favoriteNumber`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(variables)
        })
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                setFavoriteNumber(response.subscribeNumber)
            } else {
                alert('Failed to get Favorite Number')
            }
        })

        fetch(`${APIurl}/favorited/${user._id}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(variables)
        })
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                setFavorited(response.inFav)
            } else {
                alert('Failed to get Favorite Information')
            }
        })

    }, [])

    return (
        <div style ={{marginTop:"-128px", marginRight:"-50px"}}>
            {Favorited && (
                 <Tooltip title="Remove from Favorite">
                 <HeartFilled
                 style={{fontSize:"1.7rem", color:"Red"}} 
                 onClick={onClickFavorite} />
                 </Tooltip>
            )}
            {!Favorited && (
                <Tooltip title="Add to Favorite">
                <HeartOutlined
                style={{fontSize:"1.8rem"}} 
                onClick={onClickFavorite} />
                </Tooltip>
            )}
           
        </div> );
    
}

export default Favorite

