// ForgotPassword/ForgotPassword.jsx
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOpen = () => {
    setShow(true);
    setEmail('');
    setError('');
    setSuccess('');
  };

  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Placeholder for API call
    try {
      console.log('Sending password reset email to:', email);
      setSuccess('A password reset link has been sent to your email.');
      setEmail('');
      setTimeout(() => setShow(false), 2000);
    } catch {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <a href="#!" className="form-link" onClick={handleOpen}>
        Forgot password?
      </a>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="resetEmail">Email address</label>
              <input
                type="email"
                id="resetEmail"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}
            <Button type="submit" className="form-button mt-3">
              Send Reset Link
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;