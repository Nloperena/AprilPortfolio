import React from 'react';

// Data interface (for TS, remove if using pure JS)
// export interface ProjectCard {
//     image: string;
//     title: string;
//     description: string;
// }

export const projects = [
    {
        image: 'https://via.placeholder.com/300x200.png?text=Project+1',
        title: 'Project One',
        description: 'This is a brief description for Project One. It showcases an innovative solution.'
    },
    {
        image: 'https://via.placeholder.com/300x200.png?text=Project+2',
        title: 'Project Two',
        description: 'This is a brief description for Project Two. It focuses on creative design.'
    },
    {
        image: 'https://via.placeholder.com/300x200.png?text=Project+3',
        title: 'Project Three',
        description: 'This is a brief description for Project Three, highlighting advanced functionality.'
    },
    {
        image: 'https://via.placeholder.com/300x200.png?text=Project+4',
        title: 'Project Four',
        description: 'This card represents Project Four with its unique features and concepts.'
    },
    {
        image: 'https://via.placeholder.com/300x200.png?text=Project+5',
        title: 'Project Five',
        description: 'This project combines aesthetics with technology to deliver a modern solution.'
    }
];

// Component for individual project card
const ProjectCardComponent = ({ image, title, description }) => {
    return (
        <div className="border rounded shadow p-4 m-4 w-72">
            <img src={image} alt={title} className="w-full h-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p>{description}</p>
        </div>
    );
};

// Container component that maps through the projects array
const ProjectCards = () => {
    return (
        <div className="flex flex-wrap justify-center">
            {projects.map((project, index) => (
                <ProjectCardComponent key={index} {...project} />
            ))}
        </div>
    );
};

export default ProjectCards;