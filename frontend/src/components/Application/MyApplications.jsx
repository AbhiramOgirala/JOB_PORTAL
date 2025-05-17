import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <center>
          <h1>My Applications</h1>
          </center>
          {applications.length <= 0 ? (
            <>
              {" "}
              <center>
              <h4>No Applications Found</h4></center>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <center>
          <h1>Applications From Job Seekers</h1>
          </center>
          {applications.length <= 0 ? (
            <>
            <center>
              <h4>No Applications Found</h4>
              </center>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
          <p className="status-display">
            <span>Application Status:</span>
            <span className={`status ${element.status}`}>
              {element.status.charAt(0).toUpperCase() + element.status.slice(1)}
            </span>
          </p>
        </div>
        <div className="resume">
          {element.resume.url.endsWith('.pdf') ? (
            <div 
              className="pdf-thumbnail" 
              onClick={() => openModal(element.resume.url)}
            >
              <span>View PDF Resume</span>
            </div>
          ) : (
            <img
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
          )}
        </div>
        {element.status === "pending" && (
          <div className="btn_area">
            <button onClick={() => deleteApplication(element._id)}>
              Delete Application
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const [status, setStatus] = useState(element.status);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/application/status/${element._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setStatus(newStatus);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
          {/* Only show status if it's accepted or rejected */}
          {status !== "pending" && (
            <p>
              <span>Status:</span>{" "}
              <span className={`status ${status}`}>{status}</span>
            </p>
          )}
        </div>
        <div className="resume">
          {element.resume.url.endsWith('.pdf') ? (
            <div 
              className="pdf-thumbnail" 
              onClick={() => openModal(element.resume.url)}
            >
              <span>View PDF Resume</span>
            </div>
          ) : (
            <img
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
          )}
        </div>
        <div className="status_actions">
          {/* Always show Accept/Reject buttons */}
          <button
            className="accept_btn"
            onClick={() => handleStatusUpdate("accepted")}
            disabled={status === "accepted"}
          >
            Accept
          </button>
          <button
            className="reject_btn"
            onClick={() => handleStatusUpdate("rejected")}
            disabled={status === "rejected"}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
};
