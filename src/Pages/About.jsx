import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-container" style={containerStyle}>
      <h1 style={headingStyle}>About Us</h1>
      <p style={paragraphStyle}>Welcome to MovieInfo, your number one source for trending movie information. We're dedicated to providing you the very best of movie details, with an emphasis on reliability, customer service, and uniqueness.</p>
      <p style={paragraphStyle}>Founded in 2024 by Ahmed Amgad, MovieInfo has come a long way from its beginnings. When Ahmed Amgad first started out, their passion for Movies drove them to start their own business.</p>
      <p style={paragraphStyle}>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
      <p style={paragraphStyle}>Sincerely,</p>
      <p style={signatureStyle}>Ahmed Amgad</p>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
};

const headingStyle = {
  fontSize: '32px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '10px',
};

const signatureStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '30px',
};

export default AboutUs;