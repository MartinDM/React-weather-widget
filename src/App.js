import React, { Component } from 'react' 
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather';
const API_KEY = 'b5481847c2fbdcc96da8f27505c56e4c';
const units = 'metric';

class App extends Component {

  constructor(props){
    super(props);
    this.config = {
      errorMessageInput:  'Please enter a search',
      errorMessageAPI:  'API error: '
    };
    this.state = {
      temperature: undefined,
      humidity: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      error: undefined,
      errorMessage: undefined
    }
  }
 

  hasError = (...inputs) => { 
     const error = !inputs.every( input => input ); 
     if (error) {
      this.setState({
        error,
        errorMessage: this.config.errorMessageInput
      })
     } 
     return error;
  }

  validResponse = (response) => {
    const validResponse = (!response.cod === '404');
    return validResponse;
  }
  
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements['city'].value;
    const country = e.target.elements['country'].value
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${units}`;
    
    // Fetch returns a promise we're awaiting
    const api_call = await fetch(url)
    const apiResponse = await api_call.json(); 
    console.log(apiResponse)
    if ( !this.validResponse(apiResponse) ) {
        this.setState({
          error: this.validResponse(apiResponse),
          errorMessage: this.config.errorMessageAPI
        })
    }

    if ( !this.hasError(city, country) && !this.state.error) {
      const data = apiResponse;
      this.setState({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        error: this.validResponse(apiResponse),
      })
    }
  }

  render() { 
    return (
      <div className="container"> 
      <Titles /> 
      <Form getWeather={this.getWeather} />
      <Weather 
        temperature={this.state.temperature}
        city={this.state.city} 
        country={this.state.country} 
        description={this.state.description} 
        humidity={this.state.humidity}
        error={ this.state.error }
        />
      </div>
    );
  }
}

export default App;
 