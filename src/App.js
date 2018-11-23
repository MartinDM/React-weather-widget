import React, { Component } from 'react' 
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather';
const API_KEY = 'b5481847c2fbdcc96da8f27505c56e4c';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      temperature: undefined,
      humidity: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      error: false
    }
  }
 
  
  getWeather = async (e) => {
    e.preventDefault();
     const city = e.target.elements['city'].value;
    const country = e.target.elements['country'].value
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`;
    console.log(url)
    // Fetch returns a promise we're awaiting
    const api_call = await fetch(url)
    const data = await api_call.json();
    console.log(data)
    this.setState( 
      {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        error: (data.code == '404')
      }
    )
  }

  render() { 
    return (
      <div className="container"> 
      <Titles /> 
      <Form getWeather={this.getWeather} />
      <Weather 
        city={this.state.city} 
        country={this.state.country} 
        description={this.state.description} 
        humidity={this.state.humidity} 
        />
      </div>
    );
  }
}

export default App;
 