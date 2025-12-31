import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { introHeading, introSubHeading } from "@/data";

export default function IntroScreen({ onNext }) {
    const [holding, setHolding] = useState(false);
    const [completed, setCompleted] = useState(false);

    const controls = useAnimation();
    // Progress logic
    useEffect(() => {
        let timer;

        if (holding && !completed) {
            // start / continue progress
            controls.start({
                pathLength: 1,
                transition: { duration: 2, ease: "linear" },
            });

            timer = setTimeout(() => {
                setCompleted(true);
                controls.set({ pathLength: 1 }); // lock at full
                onNext();
            }, 2000);
        }

        if (!holding && !completed) {
            controls.start({
                pathLength: 0,
                transition: { duration: 1, ease: "easeOut" },
            });
        }

        return () => clearTimeout(timer);
    }, [holding, completed, controls, onNext]);

    return (
        <div className="h-full flex flex-col items-center justify-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className=" relative text-center backdrop-blur-xl rounded-3xl px-10 py-12 md:p-14 overflow-hidden border border-white/15 bg-white/8"
            >

                {/* Enhanced glow effects with brighter colors */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-400/25 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400/25 blur-[80px] rounded-full pointer-events-none" />
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-400/10 blur-[100px] rounded-full pointer-events-none"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.h1 
                    className="text-2xl md:text-3xl bg-linear-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent font-medium leading-tight mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {introHeading}
                </motion.h1>

                <motion.p 
                    className="text-white/70 mt-2 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {introSubHeading}
                </motion.p>


                {/* Hold Button with enhanced animations */}
                <motion.div
                    className="relative flex items-center justify-center cursor-pointer w-max mx-auto"
                    onMouseDown={() => !completed && setHolding(true)}
                    onMouseUp={() => setHolding(false)}
                    onTouchStart={() => setHolding(true)}
                    onTouchEnd={() => setHolding(false)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >

                    {/* Ring */}
                    <svg className="w-30 h-30 -rotate-90">
                        <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/15" />
                        <motion.circle
                            cx="60" cy="60" r="58"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="transparent"
                            className="text-pink-300"
                            initial={{ pathLength: 0 }}
                            animate={controls}
                            transition={{ duration: 2, ease: "linear" }}
                        />
                    </svg>

                    <motion.div
                        animate={{
                            scale: holding ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: holding ? Infinity : 0,
                        }}
                    >
                        <Heart size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-300 fill-current drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]" />
                    </motion.div>

                    {/* Enhanced Glow Effect */}
                    <motion.div
                        animate={{ 
                            scale: holding ? 1.3 : 1, 
                            opacity: holding ? 0.6 : 0 
                        }}
                        className="absolute inset-0 bg-pink-400/30 rounded-full blur-2xl -z-10"
                    />
                    
                    {/* Outer pulse ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5],
                            opacity: [0.3, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                        className="absolute inset-0 border-2 border-pink-300/50 rounded-full -z-10"
                    />
                </motion.div>

                <motion.p 
                    className="mt-4 text-white/50 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    Tap and hold
                </motion.p>

            </motion.div>
        </div>

    )
}
