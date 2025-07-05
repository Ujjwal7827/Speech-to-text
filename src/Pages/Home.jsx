import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiMicrophoneOn  } from "react-icons/ci";
import { HiOutlineSpeakerWave } from "react-icons/hi2";


const Home = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen py-12 px-4 sm:px-10">
      {/* 🎯 Hero Section */}
      <section className="text-center mb-16">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-cyan-400 drop-shadow mb-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CiMicrophoneOn size={40} />
          Speak Freely, Save Instantly
        </motion.h1>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Convert your speech into digital notes, save them forever, and even listen to them read aloud.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
          <Link to="/live">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 justify-center transition-all">
              <CiMicrophoneOn size={22} />
              Start Speaking
            </button>
          </Link>
          <Link to="/saved">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full border border-gray-600 flex items-center gap-2 justify-center transition-all">
              💾 View Saved Notes
            </button>
          </Link>
        </div>
      </section>

      {/* 🚀 Features */}
      <section className="text-center mb-16">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-6">✨ Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <CiMicrophoneOn size={30} />,
              title: "Live Notes",
              desc: "Speak and see your words appear in real-time.",
            },
            {
              icon: "💾",
              title: "Saved Notes",
              desc: "Your notes are stored safely in your browser.",
            },
            {
              icon: <HiOutlineSpeakerWave size ={30} />,
              title: "Read Aloud",
              desc: "Let the app read your saved notes out loud.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 80,
              }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-cyan-500/30 transition-all"
            >
              <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center text-3xl bg-gray-700 rounded-full shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan-300">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📘 How It Works */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-6">🛠️ How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: "1", text: "Click on 'Start Speaking' to begin recording." },
            { step: "2", text: "Speak clearly, and your words will appear live." },
            { step: "3", text: "Save your notes, or listen to them anytime." }
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">Step {item.step}</div>
              <p className="text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🧠 Final CTA */}
      <section className="text-center">
        <p className="text-gray-400 mb-4">Built using React, Tailwind, and the Web Speech API.</p>
        <Link to="/live">
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full">
            Get Started 🎤
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
