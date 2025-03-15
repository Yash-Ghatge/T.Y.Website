import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not applied for any job.
        </h1>
      ) : (
        <>
          <div className="applications-section">
            <h3 className="applications-header">My Application For Jobs</h3>
            <div className="applications-container">
              {applications.map((element) => (
                <div className="application-card" key={element._id}>
                  <p className="application-detail">
                    <span>Job Title: </span> {element.jobInfo.jobTitle}
                  </p>
                  <p className="application-detail">
                    <span>Name: </span> {element.jobSeekerInfo.name}
                  </p>
                  <p className="application-detail">
                    <span>Email: </span> {element.jobSeekerInfo.email}
                  </p>
                  <p className="application-detail">
                    <span>Phone: </span> {element.jobSeekerInfo.phone}
                  </p>
                  <p className="application-detail">
                    <span>Address: </span> {element.jobSeekerInfo.address}
                  </p>
                  <p className="application-detail">
                    <span>Cover Letter: </span>
                    <textarea
                      className="cover-letter"
                      value={element.jobSeekerInfo.coverLetter}
                      rows={5}
                      disabled
                    ></textarea>
                  </p>
                  <div className="button-group">
                    <button
                      className="danger-btn"
                      onClick={() => handleDeleteApplication(element._id)}
                    >
                      Delete Application
                    </button>
                    <Link
                      to={element.jobSeekerInfo?.resume?.url}
                      className="primary-btn"
                      target="_blank"
                    >
                      View Resume
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyApplications;
