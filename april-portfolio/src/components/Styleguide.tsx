// filepath: src/components/StyleGuide.tsx
import React from 'react';

/* ============================================================
   Typography Section
   ============================================================ */
const TypographySection: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Typography</h2>
      <div className="space-y-4">
        <div>
          <h1>Heading 1</h1>
          <p>
            This is a paragraph under Heading 1. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        <div>
          <h2>Heading 2</h2>
          <p>
            This is a paragraph under Heading 2. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        <div>
          <h3>Heading 3</h3>
          <p>
            This is a paragraph under Heading 3. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        <div>
          <h4>Heading 4</h4>
          <p>
            This is a paragraph under Heading 4. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        <div>
          <h5>Heading 5</h5>
          <p>
            This is a paragraph under Heading 5. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        <div>
          <h6>Heading 6</h6>
          <p>
            This is a paragraph under Heading 6. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Color Palette Section
   ============================================================ */
const ColorPalette: React.FC = () => {
  const colors = [
    { name: 'Burnt Sienna', value: 'hsla(12, 83%, 62%, 1)' },
    { name: 'Coral', value: 'hsla(16, 85%, 68%, 1)' },
    { name: 'Rebecca Purple', value: 'hsla(274, 53%, 37%, 1)' },
    { name: 'Persian Green', value: 'hsla(175, 75%, 36%, 1)' },
    { name: 'Jet', value: 'hsla(36, 5%, 19%, 1)' },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Color Palette</h2>
      <div className="flex space-x-4">
        {colors.map((color) => (
          <div key={color.name} className="flex flex-col items-center">
            <div
              style={{
                backgroundColor: color.value,
                width: "100px",
                height: "100px",
                border: "2px solid #000",
              }}
            ></div>
            <span className="mt-2 text-sm">{color.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   Card Component (Reusable)
   ============================================================ */
interface CardProps {
  title: string;
  content: string;
  buttonText: string;
}
const Card: React.FC<CardProps> = ({ title, content, buttonText }) => {
  return (
    <div className="card">
      <div className="head">{title}</div>
      <div className="content">{content}</div>
      <button className="button">{buttonText}</button>
    </div>
  );
};

const CardSection: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Card Components</h2>
      <div className="flex space-x-8">
        <Card
          title="Card Heading"
          content="This is some card content. Cards are useful for grouping related information."
          buttonText="Click Me"
        />
        <Card
          title="Another Card"
          content="More content here. Cards can have various layouts and styles."
          buttonText="Learn More"
        />
      </div>
    </section>
  );
};

/* ============================================================
   Brutalist Button Component (Reusable)
   ============================================================ */
interface BrutalistButtonProps {
  label: string;
  subLabel?: string;
}
const BrutalistButton: React.FC<BrutalistButtonProps> = ({ label, subLabel }) => {
  return (
    <a href="#" className="brutalist-button">
      <div className="ms-logo">
        <div className="ms-logo-square"></div>
        <div className="ms-logo-square"></div>
        <div className="ms-logo-square"></div>
        <div className="ms-logo-square"></div>
      </div>
      <div className="button-text">
        <span>{label}</span>
        {subLabel && <span>{subLabel}</span>}
      </div>
    </a>
  );
};

const ButtonSection: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Brutalist Buttons</h2>
      <div className="flex items-center space-x-4">
        <BrutalistButton label="Click" subLabel="Here" />
        <BrutalistButton label="Submit" />
      </div>
    </section>
  );
};

/* ============================================================
   Input Container & Search Component
   ============================================================ */
const InputExample: React.FC = () => {
  return (
    <div className="input__container">
      <input type="text" className="input__search" placeholder="Search..." />
      <div className="input__button__shadow">
        <svg viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 110-8 4 4 0 010 8z" />
        </svg>
      </div>
    </div>
  );
};

const InputSection: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Input Containers</h2>
      <div className="flex flex-col gap-8">
        <InputExample />
      </div>
    </section>
  );
};

/* ============================================================
   Brutal Subscribe Form Component
   ============================================================ */
const SubscribeForm: React.FC = () => {
  return (
    <div className="brutal-subscribe__container">
      <div className="brutal-subscribe__header">
        <span className="brutal-subscribe__title">Subscribe Now</span>
        <span className="brutal-subscribe__subtitle">
          Stay updated with our news
        </span>
      </div>
      <div className="brutal-subscribe__form">
        <input
          type="email"
          className="brutal-subscribe__input"
          placeholder="Enter your email"
        />
        <button className="brutal-subscribe__button">Subscribe</button>
      </div>
      <div className="brutal-subscribe__decor">New</div>
    </div>
  );
};

const SubscribeSection: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Subscribe Form</h2>
      <SubscribeForm />
    </section>
  );
};

/* ============================================================
   Miscellaneous Containers Section
   ============================================================ */
const ContainerSection: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Miscellaneous Containers</h2>
      <div className="flex flex-col gap-8">
        <div className="p-6 bg-gray-200 border-4 border-black">
          <h3>Generic Container</h3>
          <p>
            This container demonstrates padding, border, and background styling.
          </p>
        </div>
        <div className="p-4 bg-white border border-gray-400 shadow-lg">
          <h4>Simple Box</h4>
          <p>
            This is a simple box with a drop shadow. It can be used for layout grouping.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Main Style Guide Component
   ============================================================ */
const StyleGuide: React.FC = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Style Reference</h1>
        <p className="text-lg">
          This page serves as a comprehensive visual guide for all components and elements used in the project.
        </p>
      </header>

      {/* Sections */}
      <TypographySection />
      <ColorPalette />
      <CardSection />
      <ButtonSection />
      <InputSection />
      <SubscribeSection />
      <ContainerSection />

      {/* Footer */}
      <footer className="mt-16 border-t pt-4">
        <p className="text-sm">© 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StyleGuide;
