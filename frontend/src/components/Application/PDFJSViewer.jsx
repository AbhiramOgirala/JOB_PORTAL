import React from 'react';

const PDFJSViewer = ({ pdfUrl }) => {
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
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          height="500px"
        >
          <p>
            It appears your browser doesn't support embedded PDFs.
            Please use the buttons above to view the PDF.
          </p>
        </object>
      </div>
    </div>
  );
};

export default PDFJSViewer;

