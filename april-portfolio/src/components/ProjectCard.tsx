import ReactDOM from 'react-dom';
import React from 'react';

export const renderToCanvas = (component: JSX.Element, width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const container = document.createElement('div');
  ReactDOM.render(component, container);

  const svg = new XMLSerializer().serializeToString(container.firstChild as Node);
  const img = new Image();
  img.onload = () => {
    ctx?.drawImage(img, 0, 0, width, height);
  };
  img.src = `data:image/svg+xml;base64,${btoa(svg)}`;

  return canvas;
};