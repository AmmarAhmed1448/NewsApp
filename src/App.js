import { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { NewsComponent } from './components/NewsComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';



export default class App extends Component{


    state = {
      progress: 0
    }
  

  setProgress = (progress) =>{
  this.setState({
    progress: progress
  });
}

  

  render(){
    return(
      <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
        height={3}
      />
        <Navbar />
        <Routes>
        <Route exact path='/' element={<NewsComponent progress={this.setProgress} key="home" category="general" />} />
        <Route exact path='/business' element={<NewsComponent progress={this.setProgress} key="business" category="business" />} />
        <Route exact path='/entertainment' element={<NewsComponent progress={this.setProgress} key="entertainment" category="entertainment" />} />
        <Route exact path='/general' element={<NewsComponent progress={this.setProgress} key="general" category="general" />} />
        <Route exact path='/health' element={<NewsComponent progress={this.setProgress} key="health" category="health" />} />
        <Route exact path='/science' element={<NewsComponent progress={this.setProgress} key="science" category="science" />} />
        <Route exact path='/sports' element={<NewsComponent progress={this.setProgress} key="sports" category="sports" />} />
        <Route exact path='/technology' element={<NewsComponent progress={this.setProgress} key="technology" category="technology" />} />
        </Routes>
      </Router>
    );
  }
}



