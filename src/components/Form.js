import React, { Component } from 'react'
import { isEmpty } from '../helpers/helpers';
class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fields: {
                city: '',
                country: ''
            },
            valid: false
        }
        this.config = {
            msgInvalidInput: "Please provide both inputs"
        }
    }
    
    allPopulated = (fields) => Array.from(fields).every( field => field )  

    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({ 
            fields
        })
    }

    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let valid = this.state.valid;
        console.log(fields);
        if ( fields && !this.allPopulated(fields) ){
            valid = false;
            errors = this.config.msgInvalidInput;
            console.log(errors)
        }
        this.setState({
            errors,
            valid
        });
        return this.state.valid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if( this.validateForm() ){
            console.log('passed valids')
            this.props.getWeather(this.state.fields);
            return;
        }
        return;
    }
  
    render() {
        const bothFilled = this.allPopulated(this.state.fields.city, this.state.fields.country);
         return (
            <form onSubmit={this.handleSubmit}>
            { (this.state.fields.city || this.state.fields.country) ? (
                    <p><strong>You're in: </strong>
                      {this.state.fields.city}
                      {bothFilled ? ', ' : ''}
                      {this.state.fields.country}
                    </p>
              ) : (
                  <p>{this.state.message}</p>
               )
            }
                <div className="form-group">
                    <input type="text" name="city" onChange={this.handleChange} placeholder="City" className="form-control"   />
                    <input type="text" name="country" onChange={this.handleChange} placeholder="Country" className="form-control"  />
                </div> 
                <div className="form-group">
                    <input type="submit" value="Get weather" className="button" />
                </div> 
            </form> 
        )
    }
}

export default Form