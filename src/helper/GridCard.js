import React from 'react'
import { Col } from 'antd';


function GridCard(props) {

    let { key, image, movieId, movieTitle} = props;

    return (
        <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${movieId}`} >
                        <img style={{ width: '100%', height: '320px' }} alt={movieTitle} src={image} />
                    </a>
                </div>
            </Col>
    );
}


export default GridCard;
