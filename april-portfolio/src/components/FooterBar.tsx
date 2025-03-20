import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import BrutalistButton from './BrutalistButton.tsx';
import './InputForm.css'; // Import the InputForm styles

const FooterBar: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Check for landscape orientation
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    // Check on mount
    checkOrientation();
    
    // Add listener for resize/orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

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

  const toggleModal = () => {
    if (modalVisible) {
      closeModalWithAnimation();
    } else {
      setModalVisible(true);
    }
  };

  const closeModalWithAnimation = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before hiding modal
    setTimeout(() => {
      setModalVisible(false);
      setIsClosing(false);
    }, 300); // Match this with the CSS animation duration
  };

  // Open social links with updated URLs
  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/nicholas-loperena-022813185/', '_blank');
  };
  
  const openGitHub = () => {
    window.open('https://github.com/Nloperena', '_blank');
  };
  
  const openWhatsApp = () => {
    window.open('https://wa.me/14077905891?text=Hello%20from%20your%20portfolio!', '_blank');
  };

  // Social buttons component using BrutalistButton
  const SocialButtons = () => (
    <div className="social-buttons-container">
      <div className="button-wrapper">
        <BrutalistButton
          label="Connect on"
          subLabel="LinkedIn"
          icon={faLinkedin}
          btnColor="#0077B5"
          iconColor="#fff"
          onClick={openLinkedIn}
        />
      </div>
      
      <div className="button-wrapper">
        <BrutalistButton
          label="Check my"
          subLabel="GitHub"
          icon={faGithub}
          btnColor="#333"
          iconColor="#fff"
          onClick={openGitHub}
        />
      </div>
      
      <div className="button-wrapper">
        <BrutalistButton
          label="Message via"
          subLabel="WhatsApp"
          icon={faWhatsapp}
          btnColor="#25D366"
          iconColor="#fff"
          onClick={openWhatsApp}
        />
      </div>
    </div>
  );

  // In landscape mode, only render the button and modal
  if (isLandscape) {
    return (
      <>
        {/* Floating contact button */}
        <button 
          className={`contact-float-button ${modalVisible ? 'active' : ''}`}
          onClick={toggleModal}
          aria-label="Contact form"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
        
        {/* Modal overlay */}
        {modalVisible && (
          <div 
            className={`modal-overlay ${isClosing ? 'closing' : ''}`} 
            onClick={closeModalWithAnimation}
          >
            {/* Modal content - stop propagation to prevent closing when clicking inside */}
            <div 
              ref={modalRef}
              className={`modal-content ${isClosing ? 'closing' : ''}`} 
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Contact Me</h2>
                <button className="close-button" onClick={closeModalWithAnimation}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="form-container landscape">
                  <p className="form-subheading">
                    Connect with me or send a direct message.
                  </p>
                  
                  {/* Social Buttons using BrutalistButton */}
                  <SocialButtons />
                  
                  <div className="form-divider">
                    <span>or send a direct message</span>
                  </div>
                  
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
        )}
        
        <style jsx>{`
          .contact-float-button {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--persian-green, hsla(175, 75%, 36%, 1));
            color: white;
            border: none;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            cursor: pointer;
            z-index: 1000;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          
          .contact-float-button:hover {
            background-color: hsla(175, 80%, 30%, 1);
          }
          
          .contact-float-button.active {
            background-color: var(--jet, #222);
            transform: scale(1.1);
          }
          
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            padding: 15px;
            animation: fadeIn 0.3s ease-out forwards;
          }
          
          .modal-overlay.closing {
            animation: fadeOut 0.3s ease-in forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          
          .modal-content {
            background-color: #222;
            border-radius: 8px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            animation: slideIn 0.3s ease-out forwards;
          }
          
          .modal-content.closing {
            animation: slideOut 0.3s ease-in forwards;
          }
          
          @keyframes slideIn {
            from { 
              transform: translateY(30px);
              opacity: 0;
            }
            to { 
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes slideOut {
            from { 
              transform: translateY(0);
              opacity: 1;
            }
            to { 
              transform: translateY(30px);
              opacity: 0;
            }
          }
          
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .modal-header h2 {
            margin: 0;
            color: white;
            font-size: 1.25rem;
          }
          
          .close-button {
            background: transparent;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 5px;
            transition: transform 0.2s ease;
          }
          
          .close-button:hover {
            transform: scale(1.1);
            color: var(--persian-green, hsla(175, 75%, 36%, 1));
          }
          
          .modal-body {
            padding: 20px;
            flex: 1;
          }
          
          .social-buttons-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
          }
          
          .button-wrapper {
            flex: 1;
            min-width: 170px;
          }
          
          .form-divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 20px 0;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
          }
          
          .form-divider::before,
          .form-divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .form-divider::before {
            margin-right: 10px;
          }
          
          .form-divider::after {
            margin-left: 10px;
          }
          
          /* Make form more compact in landscape */
          .form-container.landscape {
            padding: 0;
            background-color: transparent;
            border: none;
            box-shadow: none;
          }
          
          .form-container.landscape .form-subheading {
            margin-bottom: 15px;
          }
          
          .form-container.landscape .form-field {
            margin-bottom: 12px;
          }
          
          .form-container.landscape .form-textarea {
            min-height: 80px;
          }
          
          /* Adjust for very small heights */
          @media (max-height: 500px) {
            .modal-content {
              max-height: 95vh;
            }
            
            .modal-header {
              padding: 10px 15px;
            }
            
            .modal-body {
              padding: 10px 15px;
            }
            
            .form-container.landscape .form-field {
              margin-bottom: 8px;
            }
            
            .form-container.landscape .form-subheading {
              margin-bottom: 10px;
              font-size: 0.85rem;
            }
            
            .form-container.landscape .form-textarea {
              min-height: 60px;
            }
            
            .button-wrapper {
              min-width: 140px;
            }
          }
        `}</style>
      </>
    );
  }

  // Regular footer for portrait orientation
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">Get in Touch</h3>
          
          {/* Contact Form */}
          <div className="form-container">
            <h2 className="form-heading">Contact Me</h2>
            <p className="form-subheading">
              Got a question or proposal, or just want to say hello? Feel free to reach out.
            </p>
            
            {/* Social Buttons using BrutalistButton */}
            <SocialButtons />
            
            <div className="form-divider">
              <span>or send a direct message</span>
            </div>
            
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
        
        {/* Additional footer sections */}
        <div className="footer-section">
          <h3 className="footer-heading">Connect</h3>
          <div className="social-links">
            {/* Social media links */}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nicholas Loperena. All rights reserved.</p>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: var(--jet, #222);
          color: white;
          padding: 40px 0 20px;
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .footer-section {
          flex: 1;
          min-width: 300px;
          margin-bottom: 30px;
          padding: 0 15px;
        }
        
        .footer-heading {
          font-size: 1.2rem;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 3px;
          background-color: var(--persian-green, hsla(175, 75%, 36%, 1));
        }
        
        .social-buttons-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .button-wrapper {
          flex: 1;
          min-width: 170px;
        }
        
        .form-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 20px 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }
        
        .form-divider::before,
        .form-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .form-divider::before {
          margin-right: 10px;
        }
        
        .form-divider::after {
          margin-left: 10px;
        }
        
        .social-links {
          display: flex;
          gap: 15px;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 20px;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
          }
          
          .footer-section {
            margin-bottom: 30px;
          }
          
          .button-wrapper {
            min-width: 140px;
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterBar;