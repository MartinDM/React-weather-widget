import React, { Component } from 'react' 
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather';
import Message from './components/Message';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const units = 'metric';

class App extends Component {

  constructor(props){
    super(props);
    this.config = {
      errorMessageInput:  'Please enter a search',
      errorMessageAPI:  'API error'
    };
    this.state = {}
  }
 
  isValidResponse = (response) => response.cod === 200;

  capitaliseFirst = (str) => {
    if (  typeof str !== 'string' ) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  getWeather = async (fields) => {
    console.log('Getting weather');
    const city = fields.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},UK&appid=${API_KEY}&units=${units}`;
    
    // Await the data
    const api_call = await fetch(url)
    const response = await api_call.json();
    this.setState({
      loading: false,
      data: response || null,
      errorMessage: response.message ? `${ this.capitaliseFirst(response.message) }. Keep searching!` : null
    })
  };

  render() {
    // Will be Weather report or message message component
    let appOutput;
    let data = this.state.data;
    // Check for invalid data returned
    if (this.state.errorMessage || !data) { 
      const { errorMessage } = this.state
      appOutput = 
        <Message content={errorMessage}  />
    } else {
      appOutput =  
        <Weather 
          temperature={data.main.temp}
          city={data.name} 
          country={data.sys.country} 
          description={ this.capitaliseFirst( data.weather[0].description) } 
          humidity={data.main.humidity}
        /> 
    }
 
    return (
    <div className="main">
      <div className="content">  
          <Titles />
          <div className="weather-panel">
            <Form getWeather={this.getWeather} validate  />
            <div className="weatherform-feedback"> 
              <div className="weatherform-feedback__content">
              {appOutput}
              </div>
            </div>
          </div>
      </div>
    </div>
    );
  }
}

export default App;