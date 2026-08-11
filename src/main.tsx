import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {ThemeProvider} from 'next-themes';
import App from './App.tsx';
import Resume from './pages/Resume.tsx';
import Blogs from './pages/Blogs.tsx';
import BlogPost from './pages/BlogPost.tsx';
import ProjectPage from './pages/ProjectPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>,
);
