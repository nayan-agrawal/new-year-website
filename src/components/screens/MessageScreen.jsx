"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { messageScreenHeading, specialMessage } from "@/data";

export default function MessageScreen() {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="px-4 md:px-6 text-center">
            <motion.h2
                className="text-2xl md:text-3xl font-medium text-white drop-shadow mb-2 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {messageScreenHeading}
            </motion.h2>
            <motion.p 
                className="text-white/60 text-sm mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                Tap the card to read
            </motion.p>

            <div className="mx-auto relative w-full max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                    className={`card w-70 h-101.25 max-[360px]:w-62.5 max-[360px]:h-92.5 md:w-[320px] md:h-115 mx-auto cursor-pointer flex items-center ${flipped ? "flipped" : ""}`} 
                    onClick={() => setFlipped(!flipped)}
                    whileHover={{ scale: flipped ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="back w-70 h-101.25 max-[360px]:w-62.5 max-[360px]:h-92.5 md:w-[320px] md:h-115 -ml-2.5"></div>
                    <div className="front w-70 h-101.25 max-[360px]:w-62.5 max-[360px]:h-92.5 md:w-[320px] md:h-115 -ml-2.5">
                        <div className="imgset h-full">
                            <img loading="lazy" width="100%" className="h-full object-contain" src="/images/cover.webp" />
                        </div>
                    </div>
                    <motion.div 
                        className="w-[85%] h-[80%] mx-auto text-[#301733]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: flipped ? 1 : 0 }}
                        transition={{ delay: flipped ? 0.5 : 0, duration: 0.6 }}
                    >
                        <p className="overflow-y-auto h-full pr-2 whitespace-pre-wrap text-left">{specialMessage}</p>
                    </motion.div>
                </motion.div>
                
                {/* Ambient glow effect around card */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-3xl -z-10 pointer-events-none"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            
            {/* Celebration message after reading */}
            {flipped && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-8"
                >
                    <motion.p 
                        className="text-white/50 text-sm"
                        animate={{
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ✨ Your journey begins now ✨
                    </motion.p>
                </motion.div>
            )}

        </div>
    )
}