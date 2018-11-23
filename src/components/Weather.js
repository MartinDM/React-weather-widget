import React, { Component } from 'react'

class Weather extends Component {

    constructor(props) { 
    super(props)
         
    }
 
    render() {
        if (this.props.error || !this.props.city) {
            return null
        }
        return (
            <div className="weatherform-feedback">
                <p>Weather in {this.props.city}, {this.props.country} is {this.props.description} with humidity of {this.props.humidity}</p>
            </div>
        )
  }
}

export default Weather
 
