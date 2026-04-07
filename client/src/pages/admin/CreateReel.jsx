import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/auth.css'

const CreateReel = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [videoFile, setVideoFile] = useState(null)
	const [preview, setPreview] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

	const handleFileChange = (e) => {
		const file = e.target.files && e.target.files[0]
		if (!file) return
		if (!file.type.startsWith('video/')) {
			setMessage('Please select a valid video file')
			return
		}
		setVideoFile(file)
		setPreview(URL.createObjectURL(file))
		setMessage('')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!title || !description || !videoFile) {
			setMessage('Please fill all fields and attach a video')
			return
		}
		setLoading(true)
		setMessage('')

		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('video', videoFile)

		try {
			await axios.post('http://localhost:8000/api/reels', formData, {
				withCredentials: true,
				headers: { 'Content-Type': 'multipart/form-data' }
			})
			setMessage('Reel uploaded successfully')
			setTitle('')
			setDescription('')
			setVideoFile(null)
			setPreview(null)
		} catch (err) {
			setMessage(err?.response?.data?.message || 'Upload failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="auth-root">
			<div className="auth-card">
				<div className="auth-header">
					<h2 className="auth-title">Create Reel</h2>
					<p className="auth-sub">Upload a short video to your reels feed</p>
				</div>

				<form className="auth-form" onSubmit={handleSubmit}>
					<div className="form-row">
						<label>Title</label>
						<input
							className="input"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter title"
						/>
					</div>

					<div className="form-row">
						<label>Description</label>
						<textarea
							className="textarea"
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Describe your reel"
						/>
					</div>

					<div className="form-row">
						<label>Upload Video</label>
						<input
							className="input"
							type="file"
							accept="video/*"
							onChange={handleFileChange}
						/>
					</div>

					{preview && (
						<div className="form-row">
							<label>Preview</label>
							<video src={preview} controls style={{ width: '100%', borderRadius: 8 }} />
						</div>
					)}

					{message && <div className="small-note">{message}</div>}

					<div className="actions">
						<button className="btn-primary btn-block" type="submit" disabled={loading}>
							{loading ? 'Uploading...' : 'Upload Reel'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateReel

