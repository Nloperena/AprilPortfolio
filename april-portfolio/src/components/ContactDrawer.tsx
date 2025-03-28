import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import BrutalistButton from './BrutalistButton.tsx';
import './ContactDrawer.css';

const ContactDrawer: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Listen for the custom event to open the modal
  useEffect(() => {
    console.log("Setting up event listener for openContactModal");
    
    const handleOpenModal = () => {
      console.log("openContactModal event received!");
      setDrawerVisible(true);
    };
    
    window.addEventListener('openContactModal', handleOpenModal);
    
    return () => {
      window.removeEventListener('openContactModal', handleOpenModal);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
    alert("Message sent: " + formData.message);
    setDrawerVisible(false);
  };

  return (
    <>
      {/* The drawer/modal */}
      {drawerVisible && (
        <div className="modal-overlay" onClick={() => setDrawerVisible(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Contact Me</h2>
              <button className="close-button" onClick={() => setDrawerVisible(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '8px' }} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* CSS for the modal */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }
        
        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          border: 3px solid #222;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #222;
          border-radius: 4px;
          font-size: 1rem;
          background-color: #f8f8f8;
        }
        
        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }
        
        .submit-button {
          background-color: hsla(16,85%,68%,1);
          color: white;
          border: 2px solid #222;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 4px 4px 0 #222;
          transition: all 0.2s;
        }
        
        .submit-button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #222;
        }
        
        .submit-button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #222;
        }
      `}</style>
    </>
  );
};

export default ContactDrawer;