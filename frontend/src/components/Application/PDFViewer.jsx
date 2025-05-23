import React from 'react';

const PDFViewer = ({ pdfUrl }) => {
  // Create a Google Docs viewer URL
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  
  return (
    <div className="pdf-viewer-container">
      <div className="pdf-actions">
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="download-btn"
        >
          Open in New Tab
        </a>
        <a 
          href={pdfUrl} 
          download="resume.pdf"
          className="download-btn"
        >
          Download PDF
        </a>
      </div>
      <div className="pdf-embed-container">
        <iframe
          src={googleDocsViewerUrl}
          width="100%"
          height="500px"
          frameBorder="0"
          title="PDF Viewer"
        >
          <p>Your browser doesn't support iframes. Please use the buttons above to view the PDF.</p>
        </iframe>
      </div>
    </div>
  );
};

export default PDFViewer;



