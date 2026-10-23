import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [enterUsername, setEnterUsername] = useState("");
  const [enterPassword, setEnterPassword] = useState("");
  const [error, setError] = useState("");
  const correctUsername = "abc@gmail.com";
  const correctPassword = "12345";

  function loginBtn(event) {
    event.preventDefault();

    if (
      enterUsername === correctUsername &&
      enterPassword === correctPassword
    ) {
       navigate("/dashboard", {
        state: {
          userName: "Abu Uche",
          userEmail: enterUsername,
       },
     });
    
      return;
    }

    setError("Those details don’t match our records. Please try again.");
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-welcome">
          <div className="login-brand" aria-label="Abu Developer">
            <span className="login-brand-mark" aria-hidden="true">
              A
            </span>
            <span>Abu Developer</span>
          </div>

          <div className="login-welcome-copy">
            <p className="login-eyebrow">WELCOME BACK</p>
            <h1>Make space for what matters.</h1>
            <p>
              Sign in to pick up where you left off and keep your work moving
              forward.
            </p>
          </div>

          <div className="login-note">
            <span aria-hidden="true">✦</span>
            <p>A calmer place to manage your work, all in one view.</p>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-form-heading">
            <p className="login-eyebrow">YOUR WORKSPACE</p>
            <h2 id="login-title">Sign in</h2>
            <p>Enter your details below to access your account.</p>
          </div>

          <form className="login-form" onSubmit={loginBtn}>
            <div className="login-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                value={enterUsername}
                onChange={(event) => {
                  setEnterUsername(event.target.value);
                  setError("");
                }}
                required
              />
            </div>

            <div className="login-field">
              <div className="login-password-label">
                <label htmlFor="login-password">Password</label>
              </div>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={enterPassword}
                onChange={(event) => {
                  setEnterPassword(event.target.value);
                  setError("");
                }}
                required
                aria-describedby={error ? "login-error" : undefined}
                aria-invalid={Boolean(error)}
              />
            </div>

            {error && (
              <p className="login-error" id="login-error" role="alert">
                {error}
              </p>
            )}

            <button className="login-submit" type="submit">
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="login-footer">Secure access to your workspace</p>
        </div>
      </section>
    </main>
  );
}

export default Login;
