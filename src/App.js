import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API
  
  state ={
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }
  
  render() {
    return (
      <>
      <Router>
      <div>
        <Navbar />
        <LoadingBar
        height={2}
        color='#f11946'
        progress={this.state.progress}
        position= "absolute"
        bottom= "0"
        
        />
        <Routes>
          <Route exact path="/" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key ="general" pagesize={9} country="in" category= "general"/>} />
          <Route exact path="/sports" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key ="sports" pagesize={9} country="in" category= "sports"/>} />
          <Route exact path="/business" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key ="business" pagesize={9} country="in" category= "business"/>} />
          <Route exact path="/entertainment" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key ="entertainment" pagesize={9} country="in" category= "entertainment"/>} />
          <Route exact path="/health" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key ="health" pagesize={9} country="in" category= "health"/>} />
          <Route exact path="/technology" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key ="technology" pagesize={9} country="in" category= "technology"/>} />
          <Route exact path="/science" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key ="science" pagesize={9} country="in" category= "science"/>} />
        </Routes>
      </div>
      </Router>
      </>
    )
  }
}

export default App;