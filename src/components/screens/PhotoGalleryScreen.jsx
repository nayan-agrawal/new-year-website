import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import { videoPath, photoScreenHeading } from "@/data";

export default function PhotoGalleryScreen({ onNext }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const handleVideoClick = () => {
        if (!isPlaying) {
            videoRef.current?.play();
            setIsPlaying(true);
        } else if (hasEnded) {
            onNext();
        }
    };

    const handleVideoEnd = () => {
        setHasEnded(true);
    };

    const handleVideoPlay = () => {
        setIsPlaying(true);
    };

    const toggleFullscreen = async (e) => {
        e.stopPropagation(); // Prevent video click handler
        
        if (!document.fullscreenElement) {
            try {
                await containerRef.current?.requestFullscreen();
                setIsFullscreen(true);
            } catch (err) {
                console.log("Fullscreen error:", err);
            }
        } else {
            try {
                await document.exitFullscreen();
                setIsFullscreen(false);
            } catch (err) {
                console.log("Exit fullscreen error:", err);
            }
        }
    };

    // Listen for fullscreen changes
    useState(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

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
                ref={containerRef}
                className="relative w-full max-w-2xl mb-10"
                initial={{ scale: 0.85, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-black/30 backdrop-blur-sm border border-white/10">
                    {/* Ambient glow effect */}
                    <motion.div 
                        className="absolute -inset-1 bg-linear-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-xl -z-10"
                        animate={{
                            opacity: isPlaying ? [0.3, 0.5, 0.3] : 0.3,
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    <video
                        ref={videoRef}
                        src={videoPath}
                        className="w-full h-auto max-h-[70vh] object-contain cursor-pointer"
                        onClick={handleVideoClick}
                        onEnded={handleVideoEnd}
                        onPlay={handleVideoPlay}
                        playsInline
                        preload="metadata"
                    />
                    
                    {/* Fullscreen button */}
                    {isPlaying && !hasEnded && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleFullscreen}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/90 hover:bg-black/80 hover:text-white transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        >
                            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                        </motion.button>
                    )}
                    
                    {!isPlaying && !hasEnded && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30"
                            onClick={handleVideoClick}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-lg"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    scale: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                <svg
                                    className="w-10 h-10 text-gray-800 ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </motion.div>
                            
                            {/* Play button pulse ring */}
                            <motion.div
                                className="absolute w-20 h-20 rounded-full border-2 border-white/50"
                                animate={{
                                    scale: [1, 1.5, 1.5],
                                    opacity: [0.5, 0, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                            />
                        </motion.div>
                    )}
                    
                    {hasEnded && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/50 backdrop-blur-sm"
                            onClick={handleVideoClick}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="text-center px-8"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                            >
                                <motion.div
                                    className="text-white text-lg font-medium mb-2"
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
                                <p className="text-white/90 text-sm">Ready to continue your journey?</p>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <motion.div 
                className="h-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                {!isPlaying && !hasEnded && (
                    <p className="text-white/50 text-sm">
                        Tap to play and reflect
                    </p>
                )}
                {isPlaying && !hasEnded && (
                    <motion.p 
                        className="text-white/50 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Remembering the journey...
                    </motion.p>
                )}
                {hasEnded && (
                    <motion.p 
                        className="text-white/60 text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Tap anywhere to continue
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}