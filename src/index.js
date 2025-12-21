import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 entry point
import App from './App'; // Main application component
import './index.css'; // Global styles

// Initialize the React application by targeting the root element in the HTML
const rootElement = document.getElementById('root');

// Render the App component within React's strict mode for better error handling and warnings
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
