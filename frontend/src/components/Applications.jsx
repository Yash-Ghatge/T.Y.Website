import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1>You have no applications from job seekers.</h1>
      ) : (
        <>
          <div className="applications-container">
            <h3 className="applications-header">
              Applications For Your Posted Jobs
            </h3>
            <div className="applications-list">
              {applications.map((element) => (
                <div className="application-card" key={element._id}>
                  <p className="application-detail">
                    <span>Job Title: </span> {element.jobInfo.jobTitle}
                  </p>
                  <p className="application-detail">
                    <span>Applicant's Name: </span> {element.jobSeekerInfo.name}
                  </p>
                  <p className="application-detail">
                    <span>Applicant's Email: </span>{" "}
                    {element.jobSeekerInfo.email}
                  </p>
                  <p className="application-detail">
                    <span>Applicant's Phone: </span>{" "}
                    {element.jobSeekerInfo.phone}
                  </p>
                  <p className="application-detail">
                    <span>Applicant's Address: </span>{" "}
                    {element.jobSeekerInfo.address}
                  </p>
                  <p className="application-detail">
                    <span>Applicant's Cover Letter: </span>
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

export default Applications;
