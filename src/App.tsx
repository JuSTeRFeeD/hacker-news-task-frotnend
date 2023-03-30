import React from 'react'
import Path from './structures/path'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import './App.scss'
import Home from './routes/home'
import StoryView from './routes/story_id'
import NotFound from "./routes/notFound";

class App extends React.Component<any, any> {
  public render() {
    return (
      <Router>
        <div className="app">
          <Routes>
            <Route path={Path.Home} element={<Home/>}/>
            <Route path={`${Path.Story}/:id`} element={<StoryView/>} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App
