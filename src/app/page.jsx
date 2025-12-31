"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Background from "@/components/Background";
import Music from "@/components/Music";
import IntroScreen from "@/components/screens/IntroScreen";
import GiftScreen from "@/components/screens/GiftScreen";
import PhotoGalleryScreen from "@/components/screens/PhotoGalleryScreen";
import MessageScreen from "@/components/screens/MessageScreen";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [musicOn, setMusicOn] = useState(false)

  const screens = [
    <IntroScreen key="intro" onNext={() => {
      setMusicOn(true);
      setCurrentScreen(1)
    }} />,
    <GiftScreen key="gift" onNext={() => setCurrentScreen(2)} />,
    <PhotoGalleryScreen key="gallery" onNext={() => setCurrentScreen(3)} />,
    <MessageScreen key="message" />,
  ]

  return (
    <div className="relative min-h-screen  flex items-center justify-center overflow-hidden">

      <Background />

      {/* Pause music on video screen (screen 2) */}
      {musicOn && <Music shouldPlay={musicOn && currentScreen !== 2} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -20 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="px-4 py-6 will-change-transform"
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>

      {/* Watermark */}
      {/* <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
        }}
        className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light">
        @anujbuilds
      </motion.div> */}
    </div>
  );
}