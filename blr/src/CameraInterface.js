import React, { useRef, useState } from 'react';
import './App.css'; 

const IconPerson = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const IconPalette = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>);
const IconImage = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>);
const IconPlay = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>);
const IconSettings = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
);

const CameraInterface = ({ onClose }) => {
  const colorInputRef = useRef(null); 
  const fileInputRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const SERVER_URL = "http://localhost:5000"; 

  const setMode = async (modeName) => {
    try {
      await fetch(`${SERVER_URL}/set_mode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: modeName })
      });
    } catch (err) { console.error("Error setting mode:", err); }
  };

  const handleColorChange = async (event) => {
    const selectedColor = event.target.value;
    try {
      await fetch(`${SERVER_URL}/set_color`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color: selectedColor })
      });
    } catch (err) { console.error("Error setting color:", err); }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      await fetch(`${SERVER_URL}/upload_bg`, {
        method: 'POST',
        body: formData
      });
    } catch (err) { console.error("Error uploading image:", err); }
  };

  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="app-container">
      
      <button className="close-button" onClick={onClose}>&times;</button>

      <div className="video-feed">
        {isPlaying ? (
            <>
              <img 
                src={`${SERVER_URL}/video_feed`} 
                alt="Live AI Feed"
                className="video-stream"
                onLoad={() => console.log("✅ Stream załadowany!")}
                onError={(e) => console.error("❌ Błąd ładowania streamu:", e)}
                style={{ width: '100%', height:  '100%', objectFit: 'contain' }}
              />
              <div style={{
                position: 'absolute', 
                top: 10, 
                left: 10, 
                background: 'rgba(0,0,0,0.7)', 
                color: 'white', 
                padding: '5px 10px',
                borderRadius:  '5px',
                fontSize: '12px'
              }}>
                Stream URL: {SERVER_URL}/video_feed
              </div>
            </>
        ) : (
            <div className="paused-overlay" style={{color: 'white'}}>Stream paused</div>
        )}
      </div>

      <div className="controls-bar">
        <input type="color" ref={colorInputRef} style={{ display: 'none' }} onChange={handleColorChange} />
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />

        <button className="control-button" onClick={handleTogglePlay} data-tooltip={isPlaying ? "Pause" : "Play"}>
            <IconPlay />
        </button>
        
        <button className="control-button" onClick={() => setMode('blur')} data-tooltip="Blur">
          <IconPerson />
        </button>
        
        <button className="control-button" onClick={() => colorInputRef.current.click()} data-tooltip="Change color">
          <IconPalette />
        </button>
        
        <button className="control-button" onClick={() => fileInputRef.current.click()} data-tooltip="Upload">
          <IconImage />
        </button>
        
        <button className="control-button" onClick={() => setMode('original')} data-tooltip="Reset">
          <IconSettings />
        </button>
      </div>
    </div>
  );
};

export default CameraInterface;