import React, { Component } from 'react'

class Form extends Component {

    constructor(props) {
        super(props) 
    }
    
    handleChange = (e) => { 
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    inputsPopulated = inputs => {
        return inputs.some( input => input )
    }
     

    render() { 
        // TODO: Autofill city or country
        const validInputs = this.inputsPopulated(this.props.city, this.props.country);
        return (
            <form onSubmit={this.props.getWeather}>
            { (this.props.city && this.props.country) ? (
                  <p><strong>You're in: </strong>
                      {this.state.city}
                      {validInputs ? ', ' : ''}
                      {this.state.country}
                    </p>
              ) : (
                  <p>{this.state.message}</p>
               )
            }
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