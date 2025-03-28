import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPaperPlane, faTimes, faSquare } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import BrutalistButton from './BrutalistButton.tsx';
import './FooterBar.css';

interface FooterBarProps {
  // Add a prop to control the modal from parent component
  isOpen?: boolean;
  onClose?: () => void;
}

const FooterBar: React.FC<FooterBarProps> = ({ isOpen = false, onClose }) => {
  const [modalVisible, setModalVisible] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Sync with parent's isOpen prop
  useEffect(() => {
    if (isOpen && !modalVisible) {
      setModalVisible(true);
      setIsClosing(false);
    } else if (!isOpen && modalVisible) {
      closeModalWithAnimation();
    }
  }, [isOpen, modalVisible]);

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

  const closeModalWithAnimation = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before hiding modal
    setTimeout(() => {
      setModalVisible(false);
      setIsClosing(false);
      // Call the parent's onClose if provided
      if (onClose) onClose();
    }, 300);
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

  return (
    <>
      {/* Modal overlay - only render when modalVisible is true */}
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
                <FontAwesomeIcon icon={faSquare} />
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="form-container">
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
    </>
  );
};

export default FooterBar;