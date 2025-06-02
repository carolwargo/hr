import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import './AuthForm.css';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import CustomSocialIcons from '../CustomSocialIcons/CustomSocialIcons';

export default function AuthForm() {
  const [isSignup, setIsSignup] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setError('');
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstname, lastname, email, password, confirmPassword } = formData;

    if (!email || !password || (isSignup && (!confirmPassword || !firstname || !lastname))) {
      setError('Please fill out all required fields.');
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login';
      const payload = isSignup
        ? { firstname, lastname, email, password }
        : { email, password };
      const response = await api.post(endpoint, payload);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/hr');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="form-title">{isSignup ? 'Welcome!' : 'Welcome back!'}</h1>
          <p className="form-subtitle">
            {isSignup ? 'Set up your account to get started.' : 'Please login to view your albums.'}
          </p>

          {isSignup && (
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="firstname" className="hide-on-small">First Name</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="form-input"
                    placeholder="Jane"
                    autoComplete="given-name"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="lastname" className="hide-on-small">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="form-input"
                    placeholder="Doe"
                    autoComplete="family-name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="hide-on-small">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="hide-on-small">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="hide-on-small">Re-enter password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-row">
            <div className="form-col left">
              <label className="form-checkbox mb-4">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
            </div>
            {!isSignup && (
              <div className="form-col right">
                <ForgotPassword />
              </div>
            )}
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="form-button">
            {isSignup ? 'Register Now' : 'Login'}
          </button>

          <div className="form-footer">
            <p>
              {isSignup ? 'Already have an account?' : 'Not a member?'}{' '}
              <a href="#!" className="form-link" onClick={toggleMode}>
                {isSignup ? 'Login' : 'Register'}
              </a>
            </p>
            <p>or sign up with:</p>
            <CustomSocialIcons />
          </div>
        </form>
      </div>
    </div>
  );
}