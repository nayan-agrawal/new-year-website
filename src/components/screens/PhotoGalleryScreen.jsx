import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videoPath, photoScreenHeading } from "@/data";

export default function PhotoGalleryScreen({ onNext }) {
    const [hasEnded, setHasEnded] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const videoRef = useRef(null);

    const handleVideoEnd = () => {
        setHasEnded(true);
    };

    const handlePlay = () => {
        setShowPlayer(true);
    };

    const handleContinue = () => {
        onNext();
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <motion.h2 
                className="text-2xl md:text-3xl font-medium text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {photoScreenHeading}
            </motion.h2>

            <motion.div
                className="relative w-full max-w-3xl mb-10"
                initial={{ scale: 0.85, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-black border border-white/10">
                    {/* Ambient glow effect */}
                    <motion.div 
                        className="absolute -inset-1 bg-linear-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-xl -z-10"
                        animate={{
                            opacity: showPlayer ? [0.3, 0.5, 0.3] : 0.3,
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    {/* Video Player with Full Controls */}
                    <video
                        ref={videoRef}
                        src={videoPath}
                        className="w-full h-auto max-h-[70vh] object-contain bg-black"
                        onEnded={handleVideoEnd}
                        onPlay={handlePlay}
                        controls
                        controlsList="nodownload"
                        playsInline
                        preload="metadata"
                    />
                    
                    {/* End Screen Overlay */}
                    <AnimatePresence>
                        {hasEnded && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="text-center px-8"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                                >
                                    <motion.div
                                        className="text-white text-4xl font-medium mb-4"
                                        animate={{
                                            y: [0, -5, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        ✨
                                    </motion.div>
                                    <p className="text-white text-lg mb-6">Ready to continue your journey?</p>
                                    <motion.button
                                        onClick={handleContinue}
                                        className="px-8 py-3 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Continue →
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <motion.div 
                className="h-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                {!hasEnded && (
                    <p className="text-white/50 text-sm">
                        Use player controls to play, pause, adjust volume, and go fullscreen
                    </p>
                )}
            </motion.div>
        </div>
    );
}