import React, { useState, useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = ({searchQuery}) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos')
        }
        
        const data = await response.json()
        setVideos(data.items || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [searchQuery])

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`)
  }

  if (loading) return <div className="home"><p>Loading...</p></div>
  if (error) return <div className="home"><p>Error: {error}</p></div>

  return (
    <div className="home">
      <div className="videos-grid">
        {videos.map((video) => (
          <div 
            key={video.id.videoId} 
            className="video-card"
            onClick={() => handleVideoClick(video.id.videoId)}
          >
            <img 
              src={video.snippet.thumbnails.medium.url} 
              alt={video.snippet.title}
              className="video-thumbnail"
            />
            <div className="video-card-info">
              <h3>{video.snippet.title}</h3>
              <p>{video.snippet.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home