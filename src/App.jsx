import React, { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Video from './pages/Video.jsx'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('141')

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route index element={<Home searchQuery={searchQuery} />} />
        <Route path='/video/:videoId' element={<Video />} />
      </Routes>
    </Router>
  )
}

export default App