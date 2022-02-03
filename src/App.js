import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  
  // apiKey = process.env.REACT_APP_NEWSMONK_API;
  apiKey = process.env.REACT_APP_NEWSDATA_API;
  pageSize = 4;
  country = 'in' ;

  state = {
    progress: 0,
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar height={3} color='#f11946' progress={this.state.progress}/>
          <Routes>
            {/* key attribute in component makes it unique, so the component will reload itself with updated props*/}
            <Route exact path="/world" element={<News setProgress={this.setProgress} key="world" pageSize={this.pageSize} country={this.country} category='world' apiKey={this.apiKey}/>} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country={this.country} category='business' apiKey={this.apiKey}/>} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country={this.country} category='entertainment' apiKey={this.apiKey}/>} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country={this.country} category='health' apiKey={this.apiKey}/>} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country={this.country} category='science' apiKey={this.apiKey}/>} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country={this.country} category='sports' apiKey={this.apiKey}/>} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country={this.country} category='technology' apiKey={this.apiKey}/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}
