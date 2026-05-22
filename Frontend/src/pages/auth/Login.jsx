import { useState } from "react";
import useAuth from './../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');


  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Figtree', sans-serif; }

  .page {
    min-height: 100vh;
    background: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
  }

  .card {
    width: 100%;
    max-width: 420px;
    padding: 40px 36px;
    border: 1.5px solid #e5e7eb;
    border-radius: 20px;
    background: #fff;
  }

  @media (max-width: 480px) {
    .card {
      padding: 32px 20px;
      border-radius: 16px;
    }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay: 0.06s; }
  .d2 { animation-delay: 0.12s; }
  .d3 { animation-delay: 0.18s; }
  .d4 { animation-delay: 0.24s; }
  .d5 { animation-delay: 0.30s; }
  .d6 { animation-delay: 0.36s; }

  .field-input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 11px;
    font-size: 14px;
    font-family: 'Figtree', sans-serif;
    color: #111827;
    background: #fafafa;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
  }
  .field-input::placeholder { color: #b0b7c3; }
  .field-input:focus {
    border-color: #6366f1;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
  }

  .btn-submit {
    width: 100%;
    padding: 13px;
    border-radius: 11px;
    background: #111827;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Figtree', sans-serif;
    border: none;
    cursor: pointer;
    transition: background 0.18s, transform 0.12s;
  }
  .btn-submit:hover { background: #1f2937; transform: translateY(-1px); }
  .btn-submit:active { transform: translateY(0); }
  .btn-submit:disabled { background: #9ca3af; cursor: not-allowed; transform: none; }

  .btn-google {
    width: 100%;
    padding: 12px;
    border-radius: 11px;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    color: #374151;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Figtree', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    transition: background 0.15s, border-color 0.15s;
  }
  .btn-google:hover { background: #f9fafb; border-color: #d1d5db; }

  .custom-check {
    width: 16px; height: 16px;
    border-radius: 5px;
    border: 1.5px solid #d1d5db;
    appearance: none;
    cursor: pointer;
    background: #fff;
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s;
  }
  .custom-check:checked {
    background: #6366f1;
    border-color: #6366f1;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4L3.8 7L9 1' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

    const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    try {
        setError("");
        setLoading(true);
        await login(email, password);
        navigate("/dashboard");
    } catch (err) {
        setError(err.response?.data?.message || "Invalid email or password");
    } finally {
        setLoading(false);
    }
    };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="card">

          {/* Logo + heading */}
          <div className="fade-up" style={{ marginBottom: 32, textAlign: "center" }}>
            <div style={{
              width: 46, height: 46, borderRadius: 13,
              background: "#6366f1",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                <circle cx="9" cy="7" r="4" stroke="#fff" strokeWidth="2.2"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 style={{ fontSize: 23, fontWeight: 800, color: "#111827", letterSpacing: "-0.025em", marginBottom: 5 }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: "#9ca3af" }}>Sign in to your ClientFlow workspace</p>
          </div>

          {/* Google */}
          <div className="fade-up d1" style={{ marginBottom: 18 }}>
            <button className="btn-google">
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="fade-up d1" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
            <span style={{ fontSize: 12, color: "#d1d5db", fontWeight: 500 }}>or with email</span>
            <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#fef2f2", border: "1.5px solid #fecaca",
              borderRadius: 10, padding: "10px 14px",
              color: "#ef4444", fontSize: 13, marginBottom: 16,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Email */}
          <div className="fade-up d2" style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Email address
            </label>
            <input
              className="field-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </div>

          {/* Password */}
          <div className="fade-up d3" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Password</label>
              <button style={{ fontSize: 13, color: "#6366f1", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="field-input"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingRight: 44 }}
              />
              <button onClick={() => setShowPw(!showPw)} style={{
                position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                color: "#9ca3af", display: "flex", alignItems: "center", padding: 0,
              }}>
                {showPw ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="fade-up d4" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <input type="checkbox" className="custom-check" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} />
            <label htmlFor="remember" style={{ fontSize: 13, color: "#6b7280", cursor: "pointer", userSelect: "none" }}>
              Keep me signed in for 30 days
            </label>
          </div>

          {/* Submit */}
          <div className="fade-up d5">
            <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg style={{ animation: "spin 0.75s linear infinite" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Signing in…
                </span>
              ) : "Sign in →"}
            </button>
          </div>

          <p className="fade-up d6" style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#9ca3af" }}>
            No account?{" "}
            <button style={{ color: "#6366f1", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 13 }}>
              Request access
            </button>
          </p>

        </div>
      </div>
    </>
  );
}