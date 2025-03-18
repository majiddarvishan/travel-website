import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p>© {new Date().getFullYear()} TravelExplorer - Discover the world's beautiful places</p>
        <div className="d-flex justify-content-center">
          <a href="#" className="text-white mx-2">About</a>
          <a href="#" className="text-white mx-2">Contact</a>
          <a href="#" className="text-white mx-2">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;