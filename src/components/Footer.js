import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer className="footer">
    <div>
      <Link>
        <a href="/about">
          <button className="button button__flat">
            About Us
          </button>
        </a>
      </Link>
      <Link>
        <a href="/contact">
          <button className="button button__flat">
            Contact
          </button>
        </a>
      </Link>
    </div>
  </footer>
  );

export default Footer;
