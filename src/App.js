import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {

  state = {
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
    <>
    <Router>
      <Navbar/>
      
      <LoadingBar 
        color='red'
        height="2px"
        progress={this.state.progress}
      />

      <Routes>
        <Route exact path='/' element={<News setProgress={this.setProgress} key= "general" pageSize= {9} country="in"/>} />
        <Route exact path='/business' element={<News setProgress={this.setProgress} key= "business" category="business" pageSize= {9} country="in"/>} />
        <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key= "entertainment" category="entertainment" pageSize= {9} country="in"/>} />
        <Route exact path='/general' element={<News setProgress={this.setProgress} key= "general" category="general" pageSize= {9} country="in"/>} />
        <Route exact path='/health' element={<News setProgress={this.setProgress} key= "health" category="health" pageSize= {9} country="in"/>} />
        <Route exact path='/science' element={<News setProgress={this.setProgress} key= "science" category="science" pageSize= {9} country="in"/>} />
        <Route exact path='/sports' element={<News setProgress={this.setProgress} key= "sports" category="sports" pageSize= {9} country="in"/>} />
        <Route exact path='/technology' element={<News setProgress={this.setProgress} key= "technology" category="technology" pageSize= {9} country="in"/>} />
      </Routes>
    </Router>
    </>
    )
  }
}
