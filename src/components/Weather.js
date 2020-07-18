import React  from 'react';

const Weather = props => (
    <>
    { props.description && <p><strong>Description:</strong> { props.description} </p> }
    { props.city && props.country && <p><strong>Location:</strong> { props.city}, {props.country } </p> }
    { props.temperature && <p><strong>Temperature:</strong> { props.temperature}&deg;C</p> }
    { props.humidity && <p><strong>Humidity:</strong> { props.humidity} </p> }
    </>
);

export default Weather;