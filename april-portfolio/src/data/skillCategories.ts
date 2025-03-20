// Import necessary icons from React Icons
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiAdobeaftereffects, SiBlender } from 'react-icons/si';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Import icons from FontAwesome
import {
    faPalette,
    faPenRuler,
    faLaptopCode,
    faShieldAlt,
    faNetworkWired,
    faLock,
    faServer,
    faDatabase,
    faCloud,
    faCube,
    faFilm,
    faWandMagicSparkles,
    faCircleNodes,
    faCode, // for development in general
    faBlender,
} from '@fortawesome/free-solid-svg-icons';
  
import {
    faFigma,
    faHtml5,
    faCss3Alt,
    faJsSquare,
    faReact,
    faNodeJs,
    faPython,
    faWordpress,
    faShopify,
    faWix,
    faWebflow, // correct for Framer to Webflow
} from '@fortawesome/free-brands-svg-icons';

// Define type interfaces for our data structure
interface Skill {
    name: string;
    icon: IconDefinition;
    description: string;
    wikiPage: string;
    wikiTitle: string;
}

interface SkillCategory {
    category: string;
    icon: IconDefinition;
    description: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
      category: 'Design',
      icon: faPalette,
      description:
        'Tools and skills related to graphic design, UI/UX design, and multimedia content creation.',
      skills: [
        {
          name: 'Figma',
          icon: faFigma,
          description:
            'A collaborative interface design tool used for UI/UX design and prototyping.',
          wikiPage: 'https://en.wikipedia.org/wiki/Figma_(software)',
          wikiTitle: 'Figma (software)',
        },
        {
          name: 'Adobe Photoshop',
          icon: faPenRuler,
          description:
            'Software for image editing and photo retouching for various image formats.',
          wikiPage: 'https://en.wikipedia.org/wiki/Adobe_Photoshop',
          wikiTitle: 'Adobe Photoshop',
        },
        {
          name: 'Adobe Illustrator',
          icon: faPenRuler,
          description:
            'A vector graphics editor used for creating logos, icons, and illustrations.',
          wikiPage: 'https://en.wikipedia.org/wiki/Adobe_Illustrator',
          wikiTitle: 'Adobe Illustrator',
        },
        {
          name: 'Blender',
          icon: faBlender,
          description:
            'An open-source 3D creation suite supporting modeling, animation, and rendering.',
          wikiPage: 'https://en.wikipedia.org/wiki/Blender_(software)',
          wikiTitle: 'Blender (software)',
        },
        {
          name: 'Adobe Premiere Pro',
          icon: faFilm,
          description:
            'A timeline-based video editing software application developed by Adobe.',
          wikiPage: 'https://en.wikipedia.org/wiki/Adobe_Premiere_Pro',
          wikiTitle: 'Adobe Premiere Pro',
        },
        {
          name: 'Adobe After Effects',
          icon: faWandMagicSparkles,
          description:
            'A digital visual effects and motion graphics application for compositing and animation.',
          wikiPage: 'https://en.wikipedia.org/wiki/Adobe_After_Effects',
          wikiTitle: 'Adobe After Effects',
        },
        {
          name: 'UI/UX Design',
          icon: faPenRuler,
          description:
            'The process of designing user interfaces and experiences for software and applications.',
          wikiPage: 'https://en.wikipedia.org/wiki/User_interface_design',
          wikiTitle: 'User interface design',
        },
      ],
    },
    {
      category: 'Development',
      icon: faLaptopCode,
      description:
        'Programming languages, frameworks, and tools used in software and web development.',
      skills: [
        {
          name: 'HTML5',
          icon: faHtml5,
          description:
            'The standard markup language for creating web pages and web applications.',
          wikiPage: 'https://en.wikipedia.org/wiki/HTML5',
          wikiTitle: 'HTML5',
        },
        {
          name: 'CSS3',
          icon: faCss3Alt,
          description:
            'A style sheet language used for describing the look and formatting of a document written in HTML.',
          wikiPage: 'https://en.wikipedia.org/wiki/Cascading_Style_Sheets',
          wikiTitle: 'Cascading Style Sheets',
        },
        {
          name: 'JavaScript',
          icon: faJsSquare,
          description:
            'A high-level, interpreted programming language used to create interactive effects within web browsers.',
          wikiPage: 'https://en.wikipedia.org/wiki/JavaScript',
          wikiTitle: 'JavaScript',
        },
        {
          name: 'React',
          icon: faReact,
          description:
            'A JavaScript library for building user interfaces, maintained by Facebook and a community of individual developers.',
          wikiPage: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
          wikiTitle: 'React (JavaScript library)',
        },
        {
          name: 'Node.js',
          icon: faNodeJs,
          description:
            'An open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser.',
          wikiPage: 'https://en.wikipedia.org/wiki/Node.js',
          wikiTitle: 'Node.js',
        },
        {
          name: 'Python',
          icon: faPython,
          description:
            'A high-level, interpreted programming language known for its readability and versatility.',
          wikiPage: 'https://en.wikipedia.org/wiki/Python_(programming_language)',
          wikiTitle: 'Python (programming language)',
        },
        {
          name: 'TailwindCSS',
          icon: faCss3Alt,
          description:
            'A utility-first CSS framework for rapidly building custom user interfaces.',
          wikiPage: 'https://en.wikipedia.org/wiki/Tailwind_CSS',
          wikiTitle: 'Tailwind CSS',
        },
        {
          name: 'Webflow',
          icon: faWebflow, // Correct icon for Webflow
          description:
            'A web design tool, CMS, and hosting platform in one, allowing for responsive web design.',
          wikiPage: 'https://en.wikipedia.org/wiki/Webflow',
          wikiTitle: 'Webflow',
        },
        {
          name: 'WordPress',
          icon: faWordpress,
          description:
            'An open-source content management system used to build and maintain websites.',
          wikiPage: 'https://en.wikipedia.org/wiki/WordPress',
          wikiTitle: 'WordPress',
        },
        {
          name: 'Shopify',
          icon: faShopify,
          description:
            'A commerce platform that allows anyone to set up an online store and sell their products.',
          wikiPage: 'https://en.wikipedia.org/wiki/Shopify',
          wikiTitle: 'Shopify',
        },
        {
          name: 'Wix',
          icon: faWix,
          description:
            'A cloud-based web development platform that allows users to create HTML5 websites through drag-and-drop tools.',
          wikiPage: 'https://en.wikipedia.org/wiki/Wix.com',
          wikiTitle: 'Wix.com',
        },
      ],
    },
    {
      category: 'IT',
      icon: faShieldAlt,
      description:
        'Skills related to information technology, including networking, security, and cloud services.',
      skills: [
        {
          name: 'Networking',
          icon: faNetworkWired,
          description:
            'The practice of interfacing two or more computing devices for the purpose of sharing data.',
          wikiPage: 'https://en.wikipedia.org/wiki/Computer_network',
          wikiTitle: 'Computer network',
        },
        {
          name: 'Cybersecurity',
          icon: faLock,
          description:
            'The practice of protecting systems, networks, and programs from digital attacks.',
          wikiPage: 'https://en.wikipedia.org/wiki/Computer_security',
          wikiTitle: 'Computer security',
        },
        {
          name: 'Server Management',
          icon: faServer,
          description:
            'The process of monitoring and maintaining servers to operate at peak performance.',
          wikiPage: 'https://en.wikipedia.org/wiki/Server_(computing)',
          wikiTitle: 'Server (computing)',
        },
        {
          name: 'Cloud Computing',
          icon: faCloud,
          description:
            'Delivery of computing services over the internet to offer faster innovation and flexible resources.',
          wikiPage: 'https://en.wikipedia.org/wiki/Cloud_computing',
          wikiTitle: 'Cloud computing',
        },
        {
          name: 'Database Management',
          icon: faDatabase,
          description:
            'The use of software to store and organize data in a structured way for easy access and management.',
          wikiPage: 'https://en.wikipedia.org/wiki/Database',
          wikiTitle: 'Database',
        },
        {
          name: 'IT Support',
          icon: faShieldAlt,
          description:
            'Assistance with technology-related issues including hardware, software, and network problems.',
          wikiPage: 'https://en.wikipedia.org/wiki/Technical_support',
          wikiTitle: 'Technical support',
        },
        {
          name: 'Virtualization',
          icon: faCircleNodes,
          description:
            'The creation of a virtual version of something, such as operating systems or network resources.',
          wikiPage: 'https://en.wikipedia.org/wiki/Virtualization',
          wikiTitle: 'Virtualization',
        },
        {
          name: 'Cloud Platforms (AWS, Azure)',
          icon: faCloud,
          description:
            'Cloud services offered by Amazon Web Services and Microsoft Azure for computing, storage, and networking.',
          wikiPage: 'https://en.wikipedia.org/wiki/Cloud_computing',
          wikiTitle: 'Cloud computing',
        },
      ],
    },
  ];
  