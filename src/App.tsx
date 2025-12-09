import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { Projects } from './sections/Projects/Projects';
import { Contact } from './sections/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import ProjectDetails from './pages/ProjectDetails';

function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-28 pt-16 sm:gap-28 sm:px-6 lg:px-8">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}