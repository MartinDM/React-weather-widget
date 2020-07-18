import React, { Component } from 'react'
import { isEmpty } from '../helpers/helpers';
class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fields: {
                city: ''
            },
            valid: false
        }
        this.config = {
            msgInvalidInput: "Please provide a City!"
        }
    }
    
    allPopulated = (fields) => Object.values(fields).some(field => field)

    handleChange = (e) => {
        let fields = this.state.fields;
        // Set input value into field
        fields[e.target.name] = e.target.value;
        this.setState({ 
            valid: this.allPopulated(fields)
        })
    }

    validateInput = () => {
        const fields = this.state.fields;
        this.setState({
            valid: this.allPopulated(fields),
            errors: this.config.msgInvalidInput
        })
        return this.state.valid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateInput();
        // Only searching by city for now
        const input = this.state.fields;
        if( this.state.valid ){
            this.props.getWeather(input);
            return;
        }
        if ( !this.allPopulated(input) ) {
            console.log('empty!')
        }
        return console.log('invalid');
    }
  
    render() {
        const bothFilled = this.allPopulated(this.state.fields.city, this.state.fields.country);
         return (
            <form onSubmit={this.handleSubmit}>
           
                <div className="form-group">
                    <input type="text" name="city" onChange={this.handleChange} placeholder="City" className="form-control"   />
                 </div> 
                <div className="form-group">
                    <input type="submit" value="Get weather" className="button" />
                </div> 
            </form> 
        )
    }
}

export default Form