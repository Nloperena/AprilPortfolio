// filepath: c:\Users\nimro\Downloads\BusinessProjects\AprilPortfolio\april-portfolio\src\App.tsx
import React from 'react';
import HeroSection from './components/Hero.tsx';
import './index.css'
import StyleGuide from './components/Styleguide.tsx';

const App: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <StyleGuide
      />
      {/* ...other components */}
    </div>
  );
};

export default App;   