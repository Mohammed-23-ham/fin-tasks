'use client';

import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const errorMessage = error
    ? errorMessages[error] ?? 'We could not complete your request. Please try again.'
    : null;

  return (
    <main className="grid min-h-screen grid-cols-1 bg-white text-[#182b2a] lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative flex min-h-[280px] flex-col overflow-hidden bg-[#f6f8f4] p-6 sm:p-10 lg:min-h-screen lg:p-20" aria-labelledby="intro-title">
        <Link className="flex w-fit items-center gap-2.5 text-[15px] font-bold text-[#182b2a] no-underline" href="/">
          <span className="grid size-[34px] place-items-center rounded-[10px] bg-[#176b55] font-mono text-[17px] text-white" aria-hidden="true">F</span>
          Fin Tasks
        </Link>

        <div className="my-auto max-w-xl py-12 lg:py-20">
          <p className="mb-3 text-xs font-bold text-[#176b55]">A little more focus</p>
          <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl" id="intro-title">Make room for what matters.</h1>
          <p className="mt-5 text-[15px] text-[#72817b]">
            Keep your plans clear, your priorities close, and your day moving.
          </p>
        </div>

        <p className="text-[11px] text-[#72817b]">A calmer way to get things done.</p>
      </section>

      <section className="flex min-h-screen flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24" aria-labelledby="auth-heading">
        <div className="mx-auto w-full max-w-[410px]">
          <p className="mb-3 text-xs font-bold text-[#176b55]">Welcome to Fin Tasks</p>
          <h2 className="text-3xl font-semibold tracking-normal" id="auth-heading">Your tasks, all in one place</h2>
          <p className="mt-2 mb-7 text-[13px] text-[#72817b]">Sign in or create an account to get organized.</p>

          {errorMessage && (
            <p className="mb-4 rounded-md border border-[#f1d1c6] bg-[#fff7f3] px-3.5 py-3 text-xs leading-relaxed text-[#7d3f32]" role="alert">
              {errorMessage}
            </p>
          )}

          {notice === 'confirm' && (
            <p className="mb-4 rounded-md border border-[#b8ddc4] bg-[#eff9f1] px-3.5 py-3 text-xs leading-relaxed text-[#315b3d]" role="status">
              Check your inbox for a confirmation link to finish creating your account.
            </p>
          )}

          {notice === 'account_deleted' && (
            <p className="mb-4 rounded-md border border-[#b8ddc4] bg-[#eff9f1] px-3.5 py-3 text-xs leading-relaxed text-[#315b3d]" role="status">
              Your account has been deleted.
            </p>
          )}

          <div className="mb-6 flex w-fit justify-start rounded-md bg-[#f0f3ef] p-1" role="tablist" aria-label="Choose an authentication option">
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'signin' ? 'bg-white text-[#176b55] shadow-sm' : 'text-[#72817b] hover:text-[#182b2a]'}`}
              id="signin-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === 'signin'}
              aria-controls="auth-panel"
              onClick={() => setActiveTab('signin')}
            >
              Sign in
            </button>
            <button
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'signup' ? 'bg-white text-[#176b55] shadow-sm' : 'text-[#72817b] hover:text-[#182b2a]'}`}
              id="signup-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === 'signup'}
              aria-controls="auth-panel"
              onClick={() => setActiveTab('signup')}
            >
              Create account
            </button>
          </div>

          <form
            action={activeTab === 'signin' ? signIn : signUp}
            className="grid gap-3.5"
            id="auth-panel"
            role="tabpanel"
            aria-labelledby={`${activeTab}-tab`}
          >
            <label className="grid gap-1.5 text-xs font-semibold text-[#34463c]" htmlFor={activeTab === 'signin' ? 'signin-email' : 'signup-email'}>
              Email address
              <input
                className="h-11 rounded-md border border-[#dfe7df] bg-white px-3 text-sm font-normal outline-none transition focus:border-[#176b55] focus:ring-2 focus:ring-[#176b55]/15"
                id={activeTab === 'signin' ? 'signin-email' : 'signup-email'}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-[#34463c]" htmlFor={activeTab === 'signin' ? 'signin-password' : 'signup-password'}>
              Password
              <input
                className="h-11 rounded-md border border-[#dfe7df] bg-white px-3 text-sm font-normal outline-none transition focus:border-[#176b55] focus:ring-2 focus:ring-[#176b55]/15"
                id={activeTab === 'signin' ? 'signin-password' : 'signup-password'}
                name="password"
                type="password"
                autoComplete={activeTab === 'signin' ? 'current-password' : 'new-password'}
                minLength={activeTab === 'signup' ? 8 : undefined}
                required
              />
            </label>

            {activeTab === 'signup' && (
              <label className="grid gap-1.5 text-xs font-semibold text-[#34463c]" htmlFor="confirmPassword">
                Confirm password
                <input
                  className="h-11 rounded-md border border-[#dfe7df] bg-white px-3 text-sm font-normal outline-none transition focus:border-[#176b55] focus:ring-2 focus:ring-[#176b55]/15"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>
            )}

            <div className="mt-2 flex w-full">
              <button className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#176b55] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#105640] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176b55]" type="submit">
                {activeTab === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
