import React, { useState, useEffect } from 'react';
import Hero from './components/Hero.tsx';
import FooterBar from './components/FooterBar.tsx';
import Loader from './components/Loader.tsx';
import ContactModal from './components/ContactModal.tsx';
import './components/InputForm.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Wait until all components are rendered and positioned before hiding the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  // Function to open the contact modal - pass this to Hero component
  const openContactModal = () => {
    console.log("Opening contact modal");
    setContactModalOpen(true);
  };

  return (
    <div className="App">
      {loading && <Loader />}
      {!loading && (
        <>
          <Hero openContactModal={openContactModal} />
          <FooterBar />
        </>
      )}

      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
      
      <style jsx>{`
        .App {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export default App;