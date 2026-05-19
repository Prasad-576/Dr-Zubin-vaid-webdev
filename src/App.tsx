import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceCounters from './components/ExperienceCounters';
import Expertise from './components/Expertise';
import Affiliations from './components/Affiliations';
import WhyChoose from './components/WhyChoose';
import Contact from './components/Contact';
import AboutPage from './components/AboutPage';

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const isAboutPage = path === '/about';

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background">
        <Navbar />
        {isAboutPage ? (
          <AboutPage />
        ) : (
          <>
            <Hero />
            <ExperienceCounters />
            <Expertise />
            <Affiliations />
            <Contact />
          </>
        )}
      </div>
    </SmoothScroll>
  );
}

export default App;
