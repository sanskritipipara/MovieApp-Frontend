import React, { useState, useCallback, useEffect } from 'react'
import { Typography, Popover, Button } from 'antd'
import { isAutheticated } from '../auth/helper';
import './favorite.css';
import { API } from '../backend';

const APIurl = API || "https://mernmovieapp.herokuapp.com/api";

const {Title} = Typography;

const Favoritepage = () => {

    const {user, token} = isAutheticated();
    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true);

    
    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = () => {
        fetch(`${APIurl}/getFavoredMovie/${user._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if(response.success){
                console.log(response.favorite)
                setFavorites(response.favorite)
                setLoading(false)
            } else {
                alert('Failed!')
            }
        })
    }

    const Delete = (movieId) =>{
        let variable = {
            movieId : movieId
        }
        fetch(`${APIurl}/removeFromFavorite/${user._id}` , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(variable)
        })
        .then( response => response.json())
        .then(response => {
            if(response.success){
                fetchFavorites()
            } else{
                alert('Failed to Remove!')
            }
        })
    }

    const ShowItems = Favorites.map((favorite, index) => {
        let image = (
            <div>
                <img src={`${APIurl}/movie/photo/${favorite.movieId}`} alt="movie" />
            </div>
        )
        
        return (
            <tr key={index}>
                <Popover content={image} title={favorite.movieTitle}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRunTime}</td>
                <td><button 
                    className="btn  btn-success"
                    onClick={() => Delete(favorite.movieId, favorite.userFrom)}>
                    Remove</button>
                </td>
            </tr>
        )
    })

    return(
        <div style={{ width: '85%', marginLeft:'3rem', paddingTop:'5rem' }} 
        class="Favpage">
            <Title level={2} > Favorite Movies By Me </Title>
            <hr />
            {!isAutheticated() ?
                <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Please Log in first...</p>
                    <a href="/login">Go to Login page</a>
                </div>
                :
                !Loading &&
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {ShowItems}
                    </tbody>
                </table>
            }
        </div>
    );
}
export default Favoritepage
