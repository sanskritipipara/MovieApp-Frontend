import React from 'react'
import { Descriptions } from 'antd'
import { isAutheticated } from '../../auth/helper';


function MovieInfo(props) {

    const {movie} = props;
    
        if(isAutheticated()){
            return(
                <Descriptions style={{marginTop:'-40px', paddingBottom:"10px",
                color:'black', width:'65%', marginLeft:'80px', backgroundColor:'black'}} 
                title={<p style={{color:"silver", fontSize:'1.5rem'}}>MOVIE INFO</p>} 
                bordered={true}>
        
                    {/* <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Title</p>}
                        span={2}>{movie.title}</Descriptions.Item> */}
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Overveiw</p>}
                        span={3}>{movie.description}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Release Date</p>}
                        span={2}>{movie.release_date}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Runtime</p>}
                        span={2}>{movie.runtime}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Average Vote</p>}
                        span={2}>{movie.vote_average}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Vote Count</p>}
                        span={2}>{movie.vote_count}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Status</p>}
                        span={2}>{movie.status}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Popularity</p>}
                        span={3}>{movie.popularity}</Descriptions.Item>
        
                </Descriptions>
            )          
        } else {
            return(
                <Descriptions style={{marginTop:'70px', paddingBottom:"10px",
                color:'black', width:'65%', marginLeft:'80px', backgroundColor:'black'}} 
                title={<p style={{color:"silver", fontSize:'1.5rem'}}>MOVIE INFO</p>} 
                bordered={true}>
        
                    {/* <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Title</p>}
                        span={2}>{movie.title}</Descriptions.Item> */}
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Overveiw</p>}
                        span={3}>{movie.description}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Release Date</p>}
                        span={2}>{movie.release_date}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Runtime</p>}
                        span={2}>{movie.runtime}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Average Vote</p>}
                        span={2}>{movie.vote_average}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Vote Count</p>}
                        span={2}>{movie.vote_count}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Status</p>}
                        span={2}>{movie.status}</Descriptions.Item>
        
                    <Descriptions.Item style={{color:'silver'}} 
                        label= {<p style={{fontStyle:"italic", fontSize:"1rem"}}>Popularity</p>}
                        span={3}>{movie.popularity}</Descriptions.Item>
        
                </Descriptions>
            )          
        }
}

export default MovieInfo


