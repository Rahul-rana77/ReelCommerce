import React, { useEffect, useRef } from 'react'
import '../styles/reels.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const Home = () => {
  const [videos, setVideos] = useState([])
  const containerRef = useRef(null)

  const isAdmin = localStorage.getItem("role") === "admin"

   const handleLogout = async () => {
    await axios.post('http://localhost:8000/api/auth/admin/logout', {}, { withCredentials: true })
    navigate('/admin/login')
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const videos = container.querySelectorAll('video')

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        const vid = entry.target
        if (entry.intersectionRatio >= 0.6) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
        }
      })
    }

    const observer = new IntersectionObserver(onIntersect, {
      root: container,
      threshold: [0.6]
    })

    videos.forEach((v) => observer.observe(v))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/api/reels',
      {
        withCredentials: true
      })
      .then((res) => {
        // server returns { response: ..., reel: [...] }
        const reels = res.data?.reel || []
        setVideos(reels)
      })
      .catch((err) => {
        console.error('Error fetching reels:', err)
      })
  }, [])

  return (
    <div className="reels-container" ref={containerRef}>
      {videos.map((item) => (
        <section className="reel-item" key={item._id}>
          <video
            className="reel-video"
            src={item.video}
            preload="metadata"
            playsInline
            muted
            loop
            controls={false}
            onClick={(e) => {
              const v = e.currentTarget
              if (v.paused) v.play().catch(() => {})
              else v.pause()
            }}
          />

          <div className="reel-overlay">
            <div className="reel-left">
              <div className="reel-username">{item.title}</div>
              <div className="reel-desc">{item.description}</div>
              <Link to={"/author/" + item.author} className="reel-store-link">View Store</Link>
            </div>

            <div className="reel-actions" onClick={(e) => e.stopPropagation()}>
              {isAdmin && (
                <div
                  className="action create"
                  onClick={() => navigate('/createreel')}
                >
                  <div className="icon">＋</div>
                </div>
              )}
              <div className="action profile">
                <div className="avatar">+</div>
              </div>
              <div className="action like">
                <div className="icon">❤</div>
                <div className="count">999K</div>
              </div>
              <div className="action comment">
                <div className="icon">💬</div>
                <div className="count">2.4K</div>
              </div>
              <div className="action bookmark">
                <div className="icon">🔖</div>
                <div className="count">60K</div>
              </div>
              <div className="action share">
                <div className="icon">↗</div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home