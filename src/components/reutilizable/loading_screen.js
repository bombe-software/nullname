import React, {Component} from 'react';
import './../../assets/loading.css';

export default class LoadingScreen extends Component{
  render(){
    return(
      <div className="containerLoading">
        <div className="dash uno"></div>
        <div className="dash dos"></div>
        <div className="dash tres"></div>
        <div className="dash cuatro"></div>
      </div>
    )
  }
}
