import React from "react";
import { motion } from "framer-motion";
import { FaMicrophoneAlt, FaSave, FaDownload, FaRobot } from "react-icons/fa";

// ✅ Feature data
const features = [
  {
    icon: <FaMicrophoneAlt className="text-3xl text-green-400 mb-4" />,
    title: "Voice to Text",
    desc: "Speak freely, and let the app convert your speech into clean, editable text in real time."
  },
  {
    icon: <FaSave className="text-3xl text-blue-400 mb-4" />,
    title: "Save Notes",
    desc: "Securely store your notes in your browser. They’re saved even after you refresh or close."
  },
  {
    icon: <FaDownload className="text-3xl text-purple-400 mb-4" />,
    title: "Export Options",
    desc: "Download notes as `.txt` or `.pdf` files anytime, or export everything in one click."
  },
  {
    icon: <FaRobot className="text-3xl text-yellow-400 mb-4" />,
    title: "Text-to-Speech",
    desc: "Let the AI read your saved notes aloud using natural-sounding text-to-speech technology."
  }
];

// ✅ Animation variant for each card
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const About = () => {
  return (
    <section
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-16 px-6 font-sans"
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-cyan-400 mb-6 drop-shadow">
          About Voice Notes AI 🧠
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          Voice Notes AI is your personal speech-to-text assistant. Speak naturally and
          let AI capture your ideas instantly. Save, organize, and download your thoughts
          — effortlessly.
        </p>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="bg-white/10 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 text-sm text-gray-400 text-center"
      >
        Built with ❤️ using React, Tailwind CSS, and Web Speech API.
      </motion.div>
    </section>
  );
};

export default About;
