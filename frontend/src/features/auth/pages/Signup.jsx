import "../../../style/Signup.css";
import { useState } from "react";
import { AuthHook } from "../hooks/AuthHook";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [fName, setfName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { loading, handleRegister } = AuthHook();

  const handleSubmit = async(e) => {
    e.preventDefault();

    setError('');
    try {
      await handleRegister({ fName, email, username, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create your account. Please try again.");
    }
  };

  return (
    <main className="signupPage">
      <section className="signupContainer">

        {/* Left Side */}
        <div className="signupIntro">
          <a href="/" className="signupLogo">
            career<span>MATCH</span>
          </a>

          <div className="introContent">
            <span className="signupEyebrow">
              <span className="signupDot"></span>
              START YOUR JOURNEY
            </span>

            <h1>
              Build your
              <span>career profile.</span>
            </h1>

            <p>
              Create your careerMATCH account and turn your resume,
              skills and experience into meaningful career insights.
            </p>
          </div>

          <div className="introFooter">
            <span>AI-powered</span>
            <span className="footerLine"></span>
            <span>Career intelligence</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="signupFormWrapper">

          <div className="formHeader">
            <span className="formEyebrow">CREATE ACCOUNT</span>

            <h2>Sign up</h2>

            <p>
              Already have an account?{" "}
              <a href="/login">Log in</a>
            </p>
          </div>

          <form className="signupForm" onSubmit={handleSubmit}>

            <div className="formGroup">
              <label htmlFor="fullName">Full Name</label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                value={fName}
                onChange={(e)=>setfName(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="username">Username</label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                autoComplete="username"
                required
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <div className="labelRow">
                <label htmlFor="password">Password</label>
                <span>Minimum 8 characters</span>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <div className="terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
              />

              <label htmlFor="terms">
                I agree to the{" "}
                <a href="/terms">Terms of Service</a>{" "}
                and{" "}
                <a href="/privacy">Privacy Policy</a>.
              </label>
            </div>

            {error && <p className="formError" role="alert">{error}</p>}

            <button type="submit" className="signupButton" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
              <span>↗</span>
            </button>

          </form>

          <p className="secureText">
            Your information is encrypted and securely handled.
          </p>

        </div>
      </section>
    </main>
  );
};

export default Signup;