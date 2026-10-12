import { BrowserRouter, Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './i18n';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './sections/Hero/Hero';
import { TechStack } from './sections/TechStack/TechStack';
import { About } from './sections/About/About';
import { Experience } from './sections/Experience/Experience';
import { Projects } from './sections/Projects/Projects';
import { Contact } from './sections/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';
import ProjectDetails from './pages/ProjectDetails';

function Layout() {
  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      <Navbar />
      <Outlet />
      <Footer />
      <Analytics />
    </div>
  );
}

function Home() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  // A link like /#projects still reaches the section (the Navbar scrolls to
  // targetId), but the hash is dropped so a reload starts at the top.
  useEffect(() => {
    if (!hash) return;
    navigate('/', { replace: true, state: { targetId: decodeURIComponent(hash.slice(1)) } });
  }, [hash, navigate]);

  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}