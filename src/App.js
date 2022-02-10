import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  // const apiKey = process.env.REACT_APP_NEWSDATA_API;
  // apiKey = process.env.REACT_APP_GNEWSIO_API;
  const apiKey = 'pub_42712d46fb0769f538fc02a7c0f605141ff3';
  const pageSize = 4;
  // const country = 'in';
  const [country, setCountry] = useState('')
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar country={country} setCountry={setCountry}/>
        <LoadingBar height={3} color='#f11946' progress={progress} />

        <Routes>
          {/* key attribute in component makes it unique, so the component will reload itself with updated props*/}
          <Route index element={<News setProgress={setProgress} key="world" pageSize={pageSize} country={''} category='world' apiKey={apiKey} />} />
          <Route exact path="/top" element={<News setProgress={setProgress} key="top" pageSize={pageSize} country={country} category='top' apiKey={apiKey} />} />
          <Route exact path="/world" element={<News setProgress={setProgress} key="world" pageSize={pageSize} country={''} category='world' apiKey={apiKey} />} />
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} country={country} category='business' apiKey={apiKey} />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country={country} category='entertainment' apiKey={apiKey} />} />
          <Route exact path="/environment" element={<News setProgress={setProgress} key="environment" pageSize={pageSize} country={country} category='environment' apiKey={apiKey} />} />
          <Route exact path="/food" element={<News setProgress={setProgress} key="food" pageSize={pageSize} country={country} category='food' apiKey={apiKey} />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country={country} category='health' apiKey={apiKey} />} />
          <Route exact path="/politics" element={<News setProgress={setProgress} key="politics" pageSize={pageSize} country={country} category='politics' apiKey={apiKey} />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} country={country} category='science' apiKey={apiKey} />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country={country} category='sports' apiKey={apiKey} />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country={country} category='technology' apiKey={apiKey} />} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App;
