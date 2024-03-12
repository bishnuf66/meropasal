import React from 'react'
import footerlogo from "../images/footerlogo.png"

const Footer = () => {
  return (
      <footer>
        <div className="footer-left">
          <img src={footerlogo} alt="" />
          <p>Mero Pasal is an ecommerce website created using React and Django</p>
        </div>
        <div className="footer-mid">
          <strong>Quick Links</strong>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms and Condition</a>
          <hr />
          <a href="#">Contact Us</a>
          <a href="#">Work with us</a>
        </div>
        <div className="footer-right">
          <p className='-mt-12'><strong>Subscribe to our newsletters...</strong></p>
          <form>
            <input type="email" placeholder='Your email address' />
            <button className='rounded emailsub bg-cyan-400'>Submit</button>
          </form>
        </div>
      </footer>
  )
}

export default Footer