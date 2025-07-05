// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './Components/Navbar';

// Pages
import Home from './Pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LiveNotes from './Pages/liveNotes';
import Saved from './Pages/SaveNotesPage'; 
import Footer from './Components/Footer'; 


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/saved" element={<Saved />} />
        
        {/* Live Notes Page */}
        <Route path="/live" element={<LiveNotes />} />
        

        
        
        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="text-center text-red-500 mt-10 text-xl">
              ⚠️ 404 - Page Not Found
            </div>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
