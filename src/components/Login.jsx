import { useState } from "react";

// TODO: hardcoded creds for now — swap for real auth later
const VALID_EMAIL = "admin@prep.dev";
const VALID_PASSWORD = "prep1234";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
      setError("");
      onLogin();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-brand">
          <span className="login-brand-dot" />
          .NET Lead
        </div>
        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">Interview Prep Tracker</p>

        <label className="login-label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          className="login-input"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label className="login-label" htmlFor="login-password">
          Password
        </label>
        <div className="login-pw-wrap">
          <input
            id="login-password"
            className="login-input"
            type={showPw ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="login-pw-toggle"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button type="submit" className="login-submit">
          Sign in
        </button>

        <div className="login-hint">
          Demo credentials: <code>{VALID_EMAIL}</code> / <code>{VALID_PASSWORD}</code>
        </div>
      </form>
    </div>
  );
}
