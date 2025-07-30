import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Mail, ArrowRight, Clock } from 'lucide-react';

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('loading'); // loading, success, error, expired, invalid
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [token, setToken] = useState('');

// Extract token from URL parameters
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get('token');
  
  if (tokenFromUrl) {
    setToken(tokenFromUrl);
    verifyEmail(tokenFromUrl);
  } else {
    
    console.error('No verification token found in URL');
    
    setError('Invalid verification link. Please check your email for the correct link.');
  }
    }, []);

  // Verify email with backend
  const verifyEmail = async (verificationToken) => {
    try {
      setVerificationStatus('loading');
      
      const response = await fetch(`/api/verify-email/${verificationToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationStatus('success');
        setMessage(data.message || 'Your email has been successfully verified!');
        setUserEmail(data.email || '');
      } else {
        // Handle different error types
        if (response.status === 400 && data.error === 'expired') {
          setVerificationStatus('expired');
          setMessage('This verification link has expired. Please request a new one.');
          setUserEmail(data.email || '');
        } else if (response.status === 400 && data.error === 'invalid') {
          setVerificationStatus('invalid');
          setMessage('This verification link is invalid or has already been used.');
        } else {
          setVerificationStatus('error');
          setMessage(data.message || 'Verification failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  // Resend verification email
  const handleResendEmail = async () => {
    if (!userEmail) {
      alert('No email address found. Please try registering again.');
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch('/api/resend-verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        alert('Verification email sent successfully! Please check your inbox.');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to send verification email. Please try again.');
      }
    } catch (error) {
      console.error('Resend email error:', error);
      alert('Network error. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  // Extract token from URL parameters
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get('token');
  
  if (tokenFromUrl) {
    setToken(tokenFromUrl);
    verifyEmail(tokenFromUrl);
  } else {
    
    console.error('No verification token found in URL');
    
    setError('Invalid verification link. Please check your email for the correct link.');
  }
}, []);

const handleLoginClick = () => {
  window.location.href = '/login';
};

const handleDashboardClick = () => {
  window.location.href = '/dashboard';
  };

const handleBackToHome = () => {
  window.location.href = '/';
  };
  // Loading State
  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-2xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Verifying your email...</h2>
          <p className="text-gray-400">Please wait while we verify your account</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-blue-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8">
          
          {/* Success State */}
          {verificationStatus === 'success' && (
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-green-700/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Email Verified Successfully!</h2>
              <p className="text-slate-300 mb-6">{message}</p>
              
              {userEmail && (
                <div className="bg-slate-700/30 rounded-lg p-3 mb-6">
                  <p className="text-sm text-slate-400 mb-1">Verified Email:</p>
                  <p className="text-blue-400 font-medium">{userEmail}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleLoginClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium flex items-center justify-center"
                >
                  Continue to Login
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
                <button
                  onClick={handleDashboardClick}
                  className="w-full bg-slate-700 text-slate-200 py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors font-medium border border-slate-600"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {verificationStatus === 'error' && (
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-red-700/20 rounded-full flex items-center justify-center mb-6">
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Verification Failed</h2>
              <p className="text-slate-300 mb-6">{message}</p>

              <div className="space-y-3">
                <button
                  onClick={() => verifyEmail(token)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium flex items-center justify-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
                <button
                  onClick={handleBackToHome}
                  className="w-full bg-slate-700 text-slate-200 py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors font-medium border border-slate-600"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* Expired Token State */}
          {verificationStatus === 'expired' && (
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-yellow-700/20 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Link Expired</h2>
              <p className="text-slate-300 mb-6">{message}</p>

              {userEmail && (
                <div className="bg-slate-700/30 rounded-lg p-3 mb-6">
                  <p className="text-sm text-slate-400 mb-1">Email Address:</p>
                  <p className="text-blue-400 font-medium">{userEmail}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send New Verification Email
                    </>
                  )}
                </button>
                <button
                  onClick={handleBackToHome}
                  className="w-full bg-slate-700 text-slate-200 py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors font-medium border border-slate-600"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* Invalid Token State */}
          {verificationStatus === 'invalid' && (
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-red-700/20 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Invalid Link</h2>
              <p className="text-slate-300 mb-6">{message}</p>

              <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-yellow-300 font-medium mb-1">Possible reasons:</p>
                    <ul className="text-sm text-yellow-200 space-y-1">
                      <li>• Link has already been used</li>
                      <li>• Link was corrupted in email</li>
                      <li>• Account was already verified</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleLoginClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
                >
                  Try Logging In
                </button>
                <button
                  onClick={handleBackToHome}
                  className="w-full bg-slate-700 text-slate-200 py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors font-medium border border-slate-600"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 mt-8">
          Need help? <button className="text-blue-400 hover:text-blue-300 underline">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;