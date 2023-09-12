import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { NewsComponent } from './components/NewsComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';



export default function App() {


  const [progress, setProgress] = useState(0)

    // state = {
    //   progress: 0
    // }
  

  const updateProgress = (progress) =>{
    setProgress(progress)
  // this.setState({
  //   progress: progress
  // });
}


    return(
      <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => updateProgress(0)}
        height={3}
      />
        <Navbar />
        <Routes>
        <Route exact path='/' element={<NewsComponent progress={updateProgress} key="home" category="general" />} />
        <Route exact path='/business' element={<NewsComponent progress={updateProgress} key="business" category="business" />} />
        <Route exact path='/entertainment' element={<NewsComponent progress={updateProgress} key="entertainment" category="entertainment" />} />
        <Route exact path='/general' element={<NewsComponent progress={updateProgress} key="general" category="general" />} />
        <Route exact path='/health' element={<NewsComponent progress={updateProgress} key="health" category="health" />} />
        <Route exact path='/science' element={<NewsComponent progress={updateProgress} key="science" category="science" />} />
        <Route exact path='/sports' element={<NewsComponent progress={updateProgress} key="sports" category="sports" />} />
        <Route exact path='/technology' element={<NewsComponent progress={updateProgress} key="technology" category="technology" />} />
        </Routes>
      </Router>
    );
  }




