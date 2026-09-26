import "../../../style/Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const navigate = useNavigate();



  return (
    <main className="landing">
      {/* Navbar */}
      <header className="navbar">
        <a href="/" className="logo" aria-label="careerMATCH home">
          career<span>MATCH</span>
        </a>

        <nav className="navLinks" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#faqs">FAQs</a>
        </nav>

        <div className="navActions">
          <button className="btn btnGhost" onClick={()=>navigate('/login')}>Login</button>
          <button className="btn btnDark"onClick={()=>navigate('/signup')}>Sign up</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="heroContent">
          <div className="eyebrow">
            <span className="eyebrowDot"></span>
            AI-powered career matching
          </div>

          <h1>
            Turn your resume into
            <span> your next opportunity.</span>
          </h1>

          <p className="heroDescription">
            Upload your resume, understand your career profile, and discover
            opportunities that actually match your skills, experience, and
            goals.
          </p>

          <div className="heroActions">
            <button className="btn btnDark btnLarge">
              Analyze my resume
              <span className="arrow">↗</span>
            </button>

            <button className="btn btnOutline btnLarge">
              See how it works
            </button>
          </div>

          <div className="heroMeta">
            <div>
              <strong>AI</strong>
              <span>Resume analysis</span>
            </div>

            <div className="metaDivider"></div>

            <div>
              <strong>Smart</strong>
              <span>Career matching</span>
            </div>

            <div className="metaDivider"></div>

            <div>
              <strong>Fast</strong>
              <span>Instant insights</span>
            </div>
          </div>
        </div>

        {/* Resume Analysis Card */}
        <div className="heroVisual">
          <div className="visualGlow"></div>

          <div className="resumeCard">
            <div className="cardHeader">
              <div>
                <span className="cardLabel">RESUME ANALYSIS</span>
                <h3>Career Profile</h3>
              </div>

              <span className="statusDot"></span>
            </div>

            <div className="profileScore">
              <div className="scoreCircle">
                <span>87</span>
                <small>%</small>
              </div>

              <div>
                <p className="scoreTitle">Profile strength</p>
                <p className="scoreText">
                  Strong match potential detected
                </p>
              </div>
            </div>

            <div className="skillSection">
              <div className="skillHeader">
                <span>Detected skills</span>
                <span>8 skills</span>
              </div>

              <div className="skills">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>JavaScript</span>
                <span>REST API</span>
                <span>Git</span>
              </div>
            </div>

            <div className="matchCard">
              <div>
                <span className="matchLabel">TOP MATCH</span>
                <strong>Full Stack Developer</strong>
              </div>

              <span className="matchPercentage">94%</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="howSection" id="how-it-works">
        <div className="sectionHeading">
          <span className="sectionEyebrow">HOW IT WORKS</span>

          <h2>
            From resume to
            <span> career direction.</span>
          </h2>

          <p>
            careerMATCH turns your resume into useful career intelligence
            instead of leaving you to figure everything out yourself.
          </p>
        </div>

        <div className="steps">
          <article className="stepCard">
            <span className="stepNumber">01</span>
            <h3>Upload</h3>
            <p>
              Upload your existing resume and let the system extract your
              professional profile.
            </p>
          </article>

          <article className="stepCard">
            <span className="stepNumber">02</span>
            <h3>Analyze</h3>
            <p>
              AI identifies your skills, experience, strengths and potential
              career paths.
            </p>
          </article>

          <article className="stepCard">
            <span className="stepNumber">03</span>
            <h3>Match</h3>
            <p>
              Get relevant career opportunities based on your actual profile
              instead of generic recommendations.
            </p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="ctaSection">
        <div className="ctaContent">
          <span className="sectionEyebrow">READY?</span>

          <h2>
            Know where your
            <span> resume can take you.</span>
          </h2>

          <p>
            Stop guessing. Start understanding your career potential.
          </p>

          <button className="btn btnLight btnLarge">
            Analyze my resume
            <span className="arrow">↗</span>
          </button>
        </div>
      </section>

      {/* FAQs */}
      <section className="faqSection" id="faqs">
        <div className="sectionHeading">
          <span className="sectionEyebrow">FAQS</span>

          <h2>
            Questions?
            <span> We got you.</span>
          </h2>
        </div>

        <div className="faqList">
          <details>
            <summary>
              What is careerMATCH?
              <span>+</span>
            </summary>

            <p>
              careerMATCH is an AI-powered career platform that analyzes your
              resume and helps identify relevant skills, career paths and
              opportunities.
            </p>
          </details>

          <details>
            <summary>
              What does the AI analyze?
              <span>+</span>
            </summary>

            <p>
              The system can analyze information such as your skills,
              experience, education and projects to build a structured career
              profile.
            </p>
          </details>

          <details>
            <summary>
              Do I need to create an account?
              <span>+</span>
            </summary>

            <p>
              You can decide which features are available without an account
              and which require authentication as the application evolves.
            </p>
          </details>

          <details>
            <summary>
              Is my resume stored?
              <span>+</span>
            </summary>

            <p>
              Resume storage and privacy policies should be clearly defined
              before production. Your backend should also enforce appropriate
              access controls.
            </p>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footerLogo">
          career<span>MATCH</span>
        </div>

        <p>© 2026 careerMATCH. Built for better career decisions.</p>

        <div className="footerLinks">
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
          <a href="/">Contact</a>
        </div>
      </footer>
    </main>
  );
};

export default Landing;