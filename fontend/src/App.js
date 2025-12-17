
import React, { useState } from 'react';
import './App.css';

function App() {

  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null); // stores data URL
  const [error, setError] = useState('');
  const [navExpanded, setNavExpanded] = useState(false);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle "generate" (for now, just show a placeholder image)
  const handleGenerate = () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    // Placeholder: use a random image from unsplash
    setImage(`https://source.unsplash.com/400x300/?${encodeURIComponent(prompt)}`);
    setError('');
  };



  // Step navigation logic
  const isFirstStep = step === 1;
  const isLastStep = step === 2; // update this when more steps are added


  // Navigation bar icons (simple SVGs for now)
  const navItems = [
    { icon: <span className="nav-icon">🏠</span>, label: 'Home' },
    { icon: <span className="nav-icon">🖼️</span>, label: 'Gallery' },
    { icon: <span className="nav-icon">📝</span>, label: 'Editor' },
    { icon: <span className="nav-icon">❓</span>, label: 'Help' },
  ];

  // Header bar icons (simple SVGs for now)
  const userIcon = <span className="header-icon" title="User">👤</span>;
  const settingsIcon = <span className="header-icon" title="Settings">⚙️</span>;

  // Main content for steps
  const stepContent = (
    <div className="step-content-inner">
      <div className="image-side">
        {image && (
          <div className="image-preview">
            <img src={image} alt={step === 1 ? 'Preview' : 'To edit'} />
          </div>
        )}
      </div>
      <div className="content-side">
        {step === 1 && (
          <>
            <h1>Step 1: Create or Upload a Picture</h1>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter a prompt to generate an image"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <button onClick={handleGenerate}>Generate</button>
            </div>
            <div className="input-group">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            {error && <div className="error-message">{error}</div>}
          </>
        )}
        {step === 2 && (
          <>
            <h1>Step 2: Edit Your Image</h1>
            <div className="editor-placeholder">Editor coming soon!</div>
          </>
        )}
        <div className="step-nav">
          <button className="step-btn" onClick={() => setStep(step - 1)} disabled={isFirstStep}>Previous</button>
          <button className="step-btn" onClick={() => setStep(step + 1)} disabled={isLastStep || (step === 1 && !image)}>Next</button>
        </div>
      </div>
    </div>
  );

  // Main app layout with nav and header
  return (
    <>
      <div
        className={`navbar${navExpanded ? ' expanded' : ''}`}
        onMouseEnter={() => setNavExpanded(true)}
        onMouseLeave={() => setNavExpanded(false)}
      >
        <div className="nav-icons">
          {navItems.map((item, idx) => (
            <div className="nav-item" key={idx}>
              {item.icon}
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="header-bar">
        {userIcon}
        {settingsIcon}
      </div>
      <div className="fullscreen-step">
        <div className="step-content">
          {stepContent}
        </div>
      </div>
    </>
  );

  return null;
}


export default App;
