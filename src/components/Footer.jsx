import React from 'react';
import Link from 'next/link';


const Footer = () => (
  <footer className="footer">
    <div>
      <Link href="/about" >
        <a>
          <button className="button button--flat">
            About Us
          </button>
        </a>
      </Link>
      <Link href="/contact">
        <a>
          <button className="button button--flat">
            Contact
          </button>
        </a>
      </Link>
    </div>
  </footer>
  );

export default Footer;
