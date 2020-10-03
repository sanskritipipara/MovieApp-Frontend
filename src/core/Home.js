import React, { useState, useEffect } from "react";
import { Typography, Row } from 'antd';
import { getMovies } from "../helper/coreapi";
import MainImage from "../helper/MainImage";
import GridCard from "../helper/GridCard";
import { API } from "../backend";

const APIurl = API || "https://mernmovieapp.herokuapp.com/api";

const {Title} = Typography;

function Home() {

 const [Movies, setMovies] = useState([])
 const [MainMovieImage, setMainMovieImage] = useState(null)
 const [Loading, setLoading] = useState(true)
 const [error, setError] = useState(false)

 useEffect(() => {
   fetchMovies();
 }, []);

  const fetchMovies = () => {
    getMovies().then(data => {
      if(data.error){
        setError(data.error);
      } else{
        setMovies(data);
        setMainMovieImage(data[0]);
        setLoading(false)
      }
    });
  };

  const image = MainMovieImage ? 
  `${APIurl}/movie/photo/${MainMovieImage._id}` :
   `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940` ;

  return (
    <div style ={{width: '100%', margin: '0'}}>
      {MainMovieImage && 
        <MainImage
            image = {image}
            title = {MainMovieImage.title}
            description = {MainMovieImage.description}
        />    
      }
      <div style={{width: '85%', margin: '5rem auto'}}>
        <Title level={2} style={{color:'white'}}> Latest Movies </Title>
        <hr/>
        <Row gutter={[16,16]}>
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key= {index}>
              <GridCard
                  image={movie ? 
                    `${APIurl}/movie/photo/${movie._id}` :
                    `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940` 
                  }
                  movieId = {movie._id}
                  movieTitle = {movie.title}
               />   
            </React.Fragment>
          ))}
        </Row>
      </div>

    </div>
  );
}
export default Home;
