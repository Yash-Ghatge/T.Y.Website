import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not posted any job!
        </h1>
      ) : (
        <>
          <div className="myjobs-container">
            <h3 className="myjobs-header">My Jobs</h3>
            <div className="jobs-list">
              {myJobs.map((element) => (
                <div className="job-card" key={element._id}>
                  <p className="job-detail">
                    <span>Job Title: </span> {element.title}
                  </p>
                  <p className="job-detail">
                    <span>Job Niche:</span> {element.jobNiche}
                  </p>
                  <p className="job-detail">
                    <span>Salary: </span> {element.salary}
                  </p>
                  <p className="job-detail">
                    <span>Location:</span> {element.location}
                  </p>
                  <p className="job-detail">
                    <span>Job Type:</span> {element.jobType}
                  </p>
                  <p className="job-detail">
                    <span>Company Name:</span> {element.companyName}
                  </p>
                  <p className="job-detail">
                    <span>Introduction:</span> {element.introduction}
                  </p>
                  <p className="job-detail">
                    <span>Qualifications:</span> {element.qualifications}
                  </p>
                  <p className="job-detail">
                    <span>Responsibilities:</span> {element.responsibilities}
                  </p>
                  {element.offers && (
                    <p className="job-detail">
                      <span>What Are We Offering:</span> {element.offers}
                    </p>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteJob(element._id)}
                  >
                    Delete Job
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyJobs;
