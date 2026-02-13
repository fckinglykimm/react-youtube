import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Video.css'

const Video = () => {
  const { videoId } = useParams()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true)
        const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch video')
        }
        
        const data = await response.json()
        if (data.items.length > 0) {
          setVideo(data.items[0])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (videoId) {
      fetchVideoData()
    }
  }, [videoId])

  if (loading) return <div className="video-container"><p>Loading...</p></div>
  if (error) return <div className="video-container"><p>Error: {error}</p></div>
  if (!video) return <div className="video-container"><p>Video not found</p></div>

  const { snippet, statistics } = video

  return (
    <div className="video-container">
      <div className="video-player">
        <iframe
          width="100%"
          height="600"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="video-info">
        <h1>{snippet.title}</h1>
        
        <div className="video-stats">
          <span>{parseInt(statistics.viewCount).toLocaleString()} views</span>
          <span>{parseInt(statistics.likeCount).toLocaleString()} likes</span>
        </div>

        <div className="channel-info">
          <div>
            <h3>{snippet.channelTitle}</h3>
            <p>{snippet.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video