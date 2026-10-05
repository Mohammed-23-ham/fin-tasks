'use client';

import { signIn, signUp } from '@/app/actions';
import Link from 'next/link';

type AuthFormProps = {
  error?: string;
  notice?: string;
};

const errorMessages: Record<string, string> = {
  signin: 'The email or password is incorrect. Please try again.',
  password_mismatch: 'Your passwords do not match. Please try again.',
  signup: 'Enter a valid email and a password with at least 8 characters.',
  email_delivery: 'We could not send the confirmation email. Please try again later.',
  email_not_authorized: 'This email address is not authorized to sign up.',
  email_rate_limit: 'Too many confirmation emails were requested. Please try again later.',
};

export default function AuthForm({ error, notice }: AuthFormProps) {
  const errorMessage = error
    ? errorMessages[error] ?? 'We could not complete your request. Please try again.'
    : null;

  return (
    <main className="auth-page">
      <section className="auth-intro" aria-labelledby="intro-title">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark" aria-hidden="true">F</span>
          Fin Tasks
        </Link>

        <div className="intro-copy">
          <p className="eyebrow">A little more focus</p>
          <h1 id="intro-title">Make room for what matters.</h1>
          <p className="intro-description">
            Keep your plans clear, your priorities close, and your day moving.
          </p>
        </div>

        <div className="preview-sheet" aria-hidden="true">
          <div className="preview-heading">
            <span>Today</span>
            <span>3 tasks</span>
          </div>
          <div className="preview-task is-done"><i>✓</i>Plan the week</div>
          <div className="preview-task"><i />Review project notes</div>
          <div className="preview-task"><i />Take a proper break</div>
        </div>

        <p className="intro-foot">A calmer way to get things done.</p>
      </section>

      <section className="auth-panel" aria-labelledby="signup-title">
        <div className="auth-content">
          <p className="eyebrow">Welcome to Fin Tasks</p>
          <h2 id="signup-title">Your tasks, all in one place</h2>
          <p className="form-hint">Sign in or create an account to get organized.</p>

          {errorMessage && (
            <p className="notice error-notice" role="alert">
              {errorMessage}
            </p>
          )}

          {notice === 'confirm' && (
            <p className="notice success-notice" role="status">
              Check your inbox for a confirmation link to finish creating your account.
            </p>
          )}

          <form action={signIn} className="auth-form">
            <h3>Sign in</h3>
            <label htmlFor="signin-email">Email address</label>
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="signin-password">Password</label>
            <input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />

            <button className="button button-primary" type="submit">
              Sign in
            </button>
          </form>

          <div className="form-divider" role="separator" aria-label="or">
            <span>OR</span>
          </div>

          <form action={signUp} className="auth-form signup-form">
            <h3>Create an account</h3>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button className="button button-primary" type="submit">
              Create account
            </button>
          </form>
        </div>

        <footer className="page-footer">Fin Tasks</footer>
      </section>
    </main>
  );
}
