import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find your dream Jobs</h1>
        <p>Explore thousands of job opportunities and build your career.</p>
        <button className="cta-button" onClick={() => navigate('/jobs')}>Get Started</button>
      </div>
      <div className="hero-image">
        <img src="/work.jpg" alt="Job search" />
      </div>
    </section>
  );
};

export default HeroSection;

