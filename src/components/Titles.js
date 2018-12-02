
import React, { Component } from 'react'

class Titles extends Component {

  constructor(props) {
    super(props) 
    this.state = {
        title: '🌍 Weather widget',
        subTitle: `It's raining sideways`
    }
  } 
  render() {
    return (  
      <div className="title-panel">
        <h1>{this.state.title}</h1>
        <p>{this.state.subTitle}</p>
      </div> 
    )
  }
}

export default Titles


