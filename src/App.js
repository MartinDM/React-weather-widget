import React, { Component } from 'react' 
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather';
import Message from './components/Message';

const API_KEY = 'b5481847c2fbdcc96da8f27505c56e4c';
const units = 'metric';

class App extends Component {

  constructor(props){
    super(props);
    this.config = {
      errorMessageInput:  'Please enter a search',
      errorMessageAPI:  'API error',
      initialMessage: ''
    };
    this.state = {
      temperature: undefined,
      humidity: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      hasError: false,
      errorMessage: undefined,
      geo: undefined,
      hasData: false
    }
  }
 
/* 
  handleValidation = (...inputs) => {
    // Check that something is added to each input
     const error = !inputs.every( input => input ); 
     console.log(error);
     return error;
  } */


  isValidResponse = (response) => { 
    return (!response.cod === '404');
  }


  handleReturn = (weatherData) => {
    if ( !this.isValidResponse() ) {
        this.setState({
          hasError: true,
          errorMessage: weatherData.message + `. Keep searchin'`,
          hasData: false
        })
        return
    }

    // If valid response, populate state with weather data
    const data = weatherData;
    this.setState({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      geo: data.coord,
      hasData: true
    })
  }

/* 
  validateSubmit = (e) => {
    e.preventDefault();
    const city = e.target.elements['city'].value;
    const country = e.target.elements['country'].value;
    if (this.isInvalidInput([city, country])) {
      console.log('error :(');
      this.setState({
        hasData: false,
        hasError: true,
        errorMessage: this.config.errorMessageInput
      })
    }
  } */

  
  getWeather = async (fields) => {
    console.log('getting weather');
    console.log(fields);
    const city = fields.city.value;
    const country = fields.country.value
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${units}`;
    
    // Fetch returns a promise we're awaiting
    const api_call = await fetch(url)
    const apiResponse = await api_call.json(); 
    console.log(apiResponse)
    this.handleReturn(apiResponse);
  }

  render() { 
    const hasResult = this.state.hasData;
    let appOutput = undefined; 
    if (hasResult) {
      appOutput =  
      <Weather 
        temperature={this.state.temperature}
        city={this.state.city} 
        country={this.state.country} 
        description={this.state.description} 
        humidity={this.state.humidity}
        geo={this.state.geo}
      />
    } else {
      // if no data:
      // * nothing submitted
      // * invalid terms
      const message = this.state.errorMessage;
      appOutput = 
      <Message content={message}  />
    }

    return (
    <div className="main">
      <div className="content">  
          <Titles />
          <div className="weather-panel">
            <Form getWeather={this.getWeather} validate  />
            {appOutput}
          </div>
      </div>
    </div>
    );
  }
}

export default App;
 