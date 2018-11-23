import React, { Component } from 'react'

class Form extends Component {

    constructor(props) {

        super(props)
        this.state = { 
            city: '',
            country: ''
        }
    }
    
    handleChange = (e) => { 
        this.setState({
            [e.target.name]: e.target.value
        })
      }
     

    render() { 
        // TODO: Autofill city or country
        const city = this.state.city
        const country = this.state.country
        const bothPresent = city && country
        return (
            <form onSubmit={this.props.getWeather}>
                <p><strong>You're in: </strong>
                    {this.state.city}
                    {bothPresent ? ', ' : ''}
                    {this.state.country}
                 </p>
                <div className="form-group">
                    <input type="text" name="city" onChange={this.handleChange}  value={this.state.city} className="form-control" placeholder="City" />
                </div> 
                <div className="form-group">
                    <input type="text" name="country" onChange={this.handleChange} value={this.state.country} className="form-control" placeholder="Country" />
                </div> 
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Get weather</button>
                </div> 
            </form> 
        )
    }
}

export default Form