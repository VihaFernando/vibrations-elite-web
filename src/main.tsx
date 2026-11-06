import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@fontsource-variable/inter';
import './styles.css';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages are prerendered, so they hydrate. The dev server starts empty.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
