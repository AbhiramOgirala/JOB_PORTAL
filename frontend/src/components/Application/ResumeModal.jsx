import React, { useState } from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  const [viewMode, setViewMode] = useState('google');
  
  // For Google Docs viewer (more reliable for PDFs)
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(imageUrl)}&embedded=true`;

  const toggleViewMode = () => {
    setViewMode(viewMode === 'google' ? 'direct' : 'google');
  };

  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        
        <h3 style={{ marginBottom: '20px', textAlign: 'center', color: '#2d5649' }}>
          Resume Preview
        </h3>
        
        <div className="pdf-actions">
          <button 
            onClick={toggleViewMode} 
            className="view-mode-toggle"
          >
            {viewMode === 'google' ? 'Switch to Direct View' : 'Switch to Google Viewer'}
          </button>
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="download-btn"
          >
            Open in New Tab
          </a>
          <a 
            href={imageUrl} 
            download="resume.pdf"
            className="download-btn"
          >
            Download PDF
          </a>
        </div>
        
        <div className="pdf-embed-container">
          {viewMode === 'google' ? (
            <iframe 
              src={googleDocsViewerUrl}
              title="Resume PDF (Google Viewer)" 
              width="100%" 
              height="100%"
              style={{ border: "none" }}
            />
          ) : (
            <object
              data={imageUrl}
              type="application/pdf"
              width="100%" 
              height="100%"
            >
              <p>
                It appears your browser doesn't support embedded PDFs.
                Please use the buttons above to view the PDF.
              </p>
            </object>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
