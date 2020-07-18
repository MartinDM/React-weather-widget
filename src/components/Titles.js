
import React, { Component } from 'react'

class Titles extends Component {

  constructor(props) {
    super(props) 
    this.state = {
        title: 'Weather widget',
        subTitle: `when the window is too far away!`
    }
  } 
  render() {
    return (  
      <div className="title-panel">
        <h1 className="title-panel__title">{this.state.title}</h1>
        <p className="title-panel__subtitle">{this.state.subTitle}</p>
      </div> 
    )
  }
}

export default Titles;