import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import toastService from '../../utils/toasterUtils';
import { authService } from '../../services';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, BrainCircuit, User } from 'lucide-react';
import utils from '../../utils/utils';

export default function RegisterPage() {
  const { loading, setLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState('email');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const isValid = validateRegistrationData();

      // if not valid, stop execution.
      if (!isValid) return;

      setLoading(true);

      const response = await authService.register({
        email,
        password,
        username,
      });

      if (response?.success) {
        // const { user, accessToken } = response.data;

        // loginHandler({ accessToken, userData: user });

        navigate('/login');

        toastService.success(
          response?.message ?? 'Registration successful! You can now log in.'
        );
        return;
      }

      toastService.error('An error occurred during registration.');
    } catch (error) {
      toastService.error(
        error?.message ?? 'An error occurred during registration.'
      );
    } finally {
      setLoading(false);
    }
  }

  function validateRegistrationData() {
    let valid = true;

    if (!email) {
      toastService.warning('Please enter your email address.');
      valid = false;
    }

    if (!password) {
      toastService.warning('Please enter your password.');
      valid = false;
    }

    if (!username) {
      toastService.warning('Please enter a username.');
      valid = false;
    }

    if (email && !utils.isValidEmail(email)) {
      toastService.warning('Please enter a valid email address.');
      valid = false;
    }

    if (password && !utils.isStrongPassword(password)) {
      toastService.warning(
        'Password is too weak. It must be at least 8 characters long and include uppercase, lowercase, number, and symbol.'
      );
      valid = false;
    }

    return valid;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-100 to-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]" />

      <div className="relative w-full max-w-md px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-100">
              <BrainCircuit className="w-7 h-7 text-white" strokeWidth={2} />
            </div>

            <h1 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">
              Create An Account
            </h1>

            <p className="text-slate-500 text-sm">
              Now you can start your awesome learning journey
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* User Name */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                User Name
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === 'username'
                    ? 'text-violet-500'
                    : 'text-slate-400'
                    }`}
                >
                  <User className="h-5 w-5" strokeWidth={2} />
                </div>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Ahmed-ali"
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-violet-500 focus:bg-white focus:shadow-lg focus:shadow-violet-500/10"
                />
              </div>
            </div>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Email
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === 'email'
                    ? 'text-violet-500'
                    : 'text-slate-400'
                    }`}
                >
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-violet-500 focus:bg-white focus:shadow-lg focus:shadow-violet-500/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Password
              </label>

              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${focusedField === 'password'
                    ? 'text-violet-500'
                    : 'text-slate-400'
                    }`}
                >
                  <Lock className="h-5 w-5" strokeWidth={2} />
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-violet-500 focus:bg-white focus:shadow-lg focus:shadow-violet-500/10"
                />
              </div>
            </div>

            {/* Error Message */}
            {/* {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-xs text-red-600 font-medium text-center">
                {error}
              </p>
            </div>
          )} */}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group relative w-full h-12 bg-linear-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-violet-500/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight
                      className="w-4 h-4 group:hover:translate-x-1 transition-transform duration-200"
                      strokeWidth={2.5}
                    />
                  </>
                )}
              </span>

              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200/60">
            <p className="text-center text-sm text-slate-600">
              Already Have An Account?
              <Link
                to="/login"
                className="font-semibold text-violet-600 hover:text-violet-700 transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Subtle footer text */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
