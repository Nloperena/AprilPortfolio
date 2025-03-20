import React, { useState, useEffect } from 'react';
import Hero from './components/Hero.tsx';
import FooterBar from './components/FooterBar.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './components/InputForm.css'; // Import the form styles

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Check if we're on a mobile device for styling differences only
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkIsMobile();
    
    // Check on resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Toggle footer visibility
  const toggleFooter = () => {
    setFooterVisible(prev => !prev);
  };

  // Form handling functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulating API call delay
      setFormStatus(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success!
      setFormStatus('success');
      setStatusMessage('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus('error');
      setStatusMessage('Failed to send message. Please try again later.');
    }
  };

  // Open external links
  const openWhatsApp = () => {
    window.open('https://wa.me/yourphonenumber?text=Hello%20from%20your%20portfolio!', '_blank');
  };
  
  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/your-profile', '_blank');
  };
  
  const openGitHub = () => {
    window.open('https://github.com/your-username', '_blank');
  };

  return (
    <div className="App">
      <Hero />
      
      {/* Always render the footer toggle and drawer, regardless of device */}
      <div className="contact-overlay-wrapper">
        {/* Trigger button */}
        <button 
          className={`footer-toggle email-toggle ${footerVisible ? 'active' : ''}`}
          onClick={toggleFooter}
          aria-label="Contact me form"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
        
        {/* Drawer content */}
        <div className={`footer-drawer ${footerVisible ? 'visible' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
          <div className="drawer-header">
            <h2>Contact Me</h2>
            <button 
              className="close-drawer" 
              onClick={toggleFooter}
              aria-label="Close contact form"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="contact-options">
            <button 
              className="contact-button email-button"
              onClick={() => {/* Handle email action */}}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Email</span>
            </button>
            
            <button 
              className="contact-button whatsapp-button"
              onClick={openWhatsApp}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>WhatsApp</span>
            </button>
            
            <button 
              className="contact-button linkedin-button"
              onClick={openLinkedIn}
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span>LinkedIn</span>
            </button>
            
            <button 
              className="contact-button github-button"
              onClick={openGitHub}
            >
              <FontAwesomeIcon icon={faGithub} />
              <span>GitHub</span>
            </button>
          </div>
          
          <div className="drawer-content">
            {/* Contact Form */}
            <div className="form-container">
              <h2 className="form-heading">Send a Message</h2>
              <p className="form-subheading">
                I'd love to hear from you!
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="form-button">
                  <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '8px' }} />
                  Send Message
                </button>
                
                {formStatus && (
                  <div className={`form-message ${formStatus}`}>
                    {statusMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        
        {/* Overlay when drawer is open */}
        {footerVisible && (
          <div className="drawer-overlay" onClick={toggleFooter}></div>
        )}
      </div>
      
      {/* Regular footer shown on desktop when drawer is closed */}
      {!footerVisible && <FooterBar />}
      
      <style jsx>{`
        .App {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .contact-overlay-wrapper {
          position: fixed;
          z-index: 1000;
        }
        
        .footer-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 1001;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          background: var(--persian-green, hsla(175, 75%, 36%, 1));
        }
        
        .footer-toggle:hover {
          background-color: hsla(175, 80%, 30%, 1);
        }
        
        .footer-toggle.active {
          transform: scale(1.1);
          background-color: var(--jet, #222);
        }
        
        .footer-toggle svg {
          font-size: 1.25rem;
        }
        
        .footer-drawer {
          position: fixed;
          z-index: 1000;
          background-color: #222;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          overflow-y: auto;
          max-height: 90vh;
        }
        
        /* Mobile drawer (bottom slide-up) */
        .footer-drawer.mobile {
          bottom: 0;
          left: 0;
          width: 100%;
          transform: translateY(100%);
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }
        
        .footer-drawer.mobile.visible {
          transform: translateY(5%);
        }
        
        /* Desktop drawer (side slide-in) */
        .footer-drawer.desktop {
          top: 0;
          right: 0;
          width: 400px; /* Adjust width as needed */
          height: 100vh;
          transform: translateX(100%);
        }
        
        .footer-drawer.desktop.visible {
          transform: translateX(0);
        }
        
        /* Landscape orientation adjustments */
        @media (orientation: landscape) {
          .footer-drawer {
            max-height: 85vh;
            overflow-y: auto;
          }
          
          .footer-drawer.mobile {
            width: 100%;
            height: 85vh;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
          }
          
          .footer-toggle {
            bottom: 15px;
            left: 15px;
          }
          
          /* Make form more compact in landscape */
          .form-field {
            margin-bottom: 10px;
          }
          
          .form-textarea {
            min-height: 80px;
          }
        }
        
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 20px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .drawer-header h2 {
          color: white;
          margin: 0;
          font-size: 1.25rem;
        }
        
        .close-drawer {
          background: transparent;
          border: none;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 5px;
        }
        
        .contact-options {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 15px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .contact-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 15px;
          border-radius: 5px;
          border: none;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
          flex: 1;
          min-width: 120px;
        }
        
        .email-button {
          background-color: var(--persian-green, hsla(175, 75%, 36%, 1));
        }
        
        .email-button:hover {
          background-color: hsla(175, 80%, 30%, 1);
        }
        
        .whatsapp-button {
          background-color: #25D366;
        }
        
        .whatsapp-button:hover {
          background-color: #128C7E;
        }
        
        .linkedin-button {
          background-color: #0077B5;
        }
        
        .linkedin-button:hover {
          background-color: #005582;
        }
        
        .github-button {
          background-color: #333;
        }
        
        .github-button:hover {
          background-color: #555;
        }
        
        .drawer-content {
          padding: 20px;
        }
        
        /* Semi-transparent overlay behind the drawer */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        
        /* Make drawer content scrollable on smaller screens */
        @media only screen and (max-height: 700px) {
          .drawer-content {
            max-height: calc(85vh - 140px);
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default App;