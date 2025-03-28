import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
    onClose();
  };

  const openWhatsApp = () => {
    window.open('https://api.whatsapp.com/send/?phone=14077905891&text=Hello+from+your+portfolio!&type=phone_number&app_absent=0', '_blank');
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/nicholas-loperena-022813185/', '_blank');
  };

  const openGitHub = () => {
    window.open('https://github.com/NLoperena', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Contact Me</h2>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Type your message here..."
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">
            <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '8px' }} />
            Send Message
          </button>
        </form>
        
        {/* Social Media Brutalist Buttons */}
        <div className="social-buttons-container">
          <h3 className="social-title">Or connect with me on:</h3>
          <div className="social-buttons">
            <button 
              className="brutalist-btn whatsapp-btn"
              onClick={openWhatsApp}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>WhatsApp</span>
            </button>
            
            <button 
              className="brutalist-btn linkedin-btn"
              onClick={openLinkedIn}
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span>LinkedIn</span>
            </button>
            
            <button 
              className="brutalist-btn github-btn"
              onClick={openGitHub}
            >
              <FontAwesomeIcon icon={faGithub} />
              <span>GitHub</span>
            </button>
          </div>
        </div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
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
            border-bottom: 2px solid #222;
            padding-bottom: 1rem;
            background-color: hsla(16,85%,68%,1);
            margin: -2rem -2rem 1.5rem -2rem;
            padding: 1rem 2rem;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
          
          .modal-title {
            color: #222;
            font-size: 1.8rem;
            font-weight: 800;
            margin: 0;
            text-shadow: 1px 1px 0px rgba(255,255,255,0.5);
            letter-spacing: 0.5px;
          }
          
          .close-button {
            background: none;
            border: none;
            color: #222;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
            transition: all 0.2s;
          }
          
          .close-button:hover {
            color: #f44336;
            transform: scale(1.2);
          }
          
          .form-group {
            margin-bottom: 1.5rem;
          }
          
          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
            color: #222;
            font-size: 1.1rem;
          }
          
          .form-input,
          .form-textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #222;
            border-radius: 4px;
            font-size: 1rem;
            background-color: #f8f8f8;
            color: #222;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
          }
          
          .form-input:focus,
          .form-textarea:focus {
            outline: none;
            border-color: hsla(16,85%,68%,1);
            box-shadow: 0 0 0 3px rgba(255, 138, 101, 0.25);
          }
          
          .form-textarea {
            min-height: 120px;
            resize: vertical;
          }
          
          .submit-button {
            background-color: hsla(16,85%,68%,1);
            color: white;
            border: 2px solid #222;
            padding: 0.75rem 1.5rem;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 4px 4px 0 #222;
            transition: all 0.2s;
            text-shadow: 1px 1px 0 rgba(0,0,0,0.2);
          }
          
          .submit-button:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 #222;
          }
          
          .submit-button:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 #222;
          }

          ::placeholder {
            color: #999;
            opacity: 0.7;
          }
          
          /* Social Media Buttons Styling */
          .social-buttons-container {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 2px solid #eee;
          }
          
          .social-title {
            font-size: 1.1rem;
            color: #222;
            margin-bottom: 1rem;
            font-weight: bold;
          }
          
          .social-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
          }
          
          .brutalist-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 0.75rem 1.25rem;
            font-weight: bold;
            border: 2px solid #222;
            box-shadow: 4px 4px 0 #222;
            cursor: pointer;
            transition: all 0.2s;
            color: white;
            font-size: 1rem;
          }
          
          .brutalist-btn:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 #222;
          }
          
          .brutalist-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 #222;
          }
          
          .whatsapp-btn {
            background-color: #25D366;
          }
          
          .linkedin-btn {
            background-color: #0077B5;
          }
          
          .github-btn {
            background-color: #333;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactModal;