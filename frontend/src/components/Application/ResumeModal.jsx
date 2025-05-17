import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {imageUrl.endsWith('.pdf') ? (
          <iframe 
            src={imageUrl} 
            title="Resume PDF" 
            width="100%" 
            height="500px"
            style={{ border: "none" }}
          />
        ) : (
          <img src={imageUrl} alt="resume" />
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
