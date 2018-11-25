import React  from 'react';

const Weather = props => (
    <div className="weatherform-feedback"> 
        { props.error && props.erroMessage && <p><strong>Error:</strong> { props.errorMessage } </p> }
        { props.city && props.country && <p><strong>Location:</strong> { props.city} , {props.country } </p> }
        { props.temperature && <p><strong>Temperature:</strong> { props.temperature} C</p> }
        { props.humidity && <p><strong>Humidity:</strong> { props.humidity} </p> }
    </div>
);

export default Weather;