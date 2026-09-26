import "../../../style/Login.css";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend/API integration yahan aayega
    console.log("Login submitted");
  };

  return (
    <main className="loginPage">
      <section className="loginContainer">

        {/* Left Side */}
        <div className="loginIntro">
          <a href="/" className="loginLogo">
            career<span>MATCH</span>
          </a>

          <div className="loginIntroContent">
            <span className="loginEyebrow">
              <span className="loginDot"></span>
              WELCOME BACK
            </span>

            <h1>
              Your career
              <span>journey continues.</span>
            </h1>

            <p>
              Sign in to access your career profile, resume insights,
              matches and personalized opportunities.
            </p>
          </div>

          <div className="loginIntroFooter">
            <span>AI-powered</span>
            <span className="loginFooterLine"></span>
            <span>Career intelligence</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="loginFormWrapper">

          <div className="loginFormHeader">
            <span className="loginFormEyebrow">
              SIGN IN
            </span>

            <h2>Welcome back.</h2>

            <p>
              Don't have an account?{" "}
              <a href="/signup">Create one</a>
            </p>
          </div>

          <form
            className="loginForm"
            onSubmit={handleSubmit}
          >
            {/* Username / Email */}
            <div className="loginFormGroup">
              <label htmlFor="usernameOrEmail">
                Username or Email
              </label>

              <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                placeholder="Enter your username or email"
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div className="loginFormGroup">
              <div className="loginPasswordLabel">
                <label htmlFor="loginPassword">
                  Password
                </label>

                <a href="/forgot-password">
                  Forgot password?
                </a>
              </div>

              <input
                id="loginPassword"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Remember */}
            <div className="rememberMe">
              <input
                id="remember"
                name="remember"
                type="checkbox"
              />

              <label htmlFor="remember">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="loginButton"
            >
              Login
              <span>↗</span>
            </button>
          </form>

          <p className="loginSecureText">
            Your account and credentials are securely handled.
          </p>

        </div>
      </section>
    </main>
  );
};

export default Login;