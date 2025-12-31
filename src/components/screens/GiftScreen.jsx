import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Gift, Heart, Sparkles, Star, Sun, Ticket } from "lucide-react";
import confetti from "canvas-confetti";
import { giftHeading, giftSubHeading, ticketText } from "@/data";


export default function GiftScreen({ onNext }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showReveal, setShowReveal] = useState(false);

    const fireConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 80,
            startVelocity: 40,
            gravity: 0.8,
            ticks: 250,
            origin: { y: 0.6 },
            colors: [
                "#f472b6", // pink
                "#a855f7", // purple
                "#fb7185", // rose
                "#f9a8d4", // soft pink
                "#818cf8", // indigo
                "#fbbf24", // amber
            ],
        });
        
        // Second burst after a delay for extra celebration
        setTimeout(() => {
            confetti({
                particleCount: 60,
                spread: 100,
                startVelocity: 30,
                origin: { y: 0.7 },
                colors: ["#f472b6", "#a855f7", "#818cf8"],
            });
        }, 200);
    };

    const handleGiftClick = () => {
        fireConfetti();
        setIsOpen(true);
        setTimeout(() => setShowReveal(true), 600);
    };

    // Draggable cards - positive emotions and experiences to embrace
    const items = [
        { id: 1, icon: Heart, bg: "bg-pink-200", x: -20, y: -20, rot: -5, text: "Love" },
        { id: 2, icon: Sparkles, bg: "bg-purple-200", x: 20, y: -40, rot: 10, text: "Joy" },
        { id: 3, icon: Sun, bg: "bg-yellow-200", x: -30, y: 30, rot: -8, text: "Hope" },
        { id: 4, icon: Star, bg: "bg-blue-200", x: 40, y: 40, rot: 5, text: "Dreams" },
    ];

    return (
        <div className="h-full flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">
                {!showReveal ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        key="cards">
                        <motion.div
                            className="text-center mb-8 will-change-transform"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className={`text-2xl md:text-3xl font-medium text-white mb-2`}>{giftHeading}</h2>
                            <p className={`text-white/70 text-sm md:text-base`}>{giftSubHeading}</p>
                        </motion.div>

                        <motion.div 
                            className="relative backdrop-blur-lg rounded-3xl px-10 py-12 md:p-14 overflow-hidden border border-white/15 bg-white/8 w-82 h-82 md:w-100 md:h-100 flex items-center justify-center mx-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        >
                            {/* Gift with enhanced animations */}
                            <motion.button
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleGiftClick}
                                className="z-0 flex flex-col items-center justify-center group relative"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 200 }}
                            >
                                <motion.div
                                    animate={isOpen ? { scale: 1.5, rotate: 360, opacity: 0 } : {
                                        y: [0, -5, 0],
                                    }}
                                    transition={isOpen ? { duration: 0.5 } : {
                                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className={`w-24 h-24 bg-linear-to-br from-rose-400 via-pink-500 to-purple-600 rounded-2xl shadow-[0_0_40px_rgba(244,63,94,0.4)] flex items-center justify-center text-white transition-all duration-500 ${isOpen ? "scale-150 opacity-0" : ""}`}>
                                    <Gift size={40} className="" />
                                </motion.div>
                                
                                {/* Sparkle effect around gift */}
                                <motion.div
                                    className="absolute inset-0 bg-pink-400/20 rounded-2xl blur-xl -z-10"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.button>

                            {/* Draggable cards with enhanced entrance */}
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    drag
                                    dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                                    dragElastic={0.1}
                                    whileDrag={{ scale: 1.1, cursor: "grabbing", rotate: 0, zIndex: 100 }}
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ x: item.x, y: item.y, rotate: item.rot, opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ 
                                        delay: 0.6 + index * 0.1, 
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 150
                                    }}
                                    className={`absolute w-28 h-36 ${item.bg} rounded-xl shadow-xl flex flex-col items-center justify-center cursor-grab z-10 border-4 border-white will-change-transform`}
                                >
                                    <item.icon className="text-slate-500 mb-2" size={32} />
                                    <span className="text-slate-600/85 font-semibold">{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="reveal"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", type: "spring", stiffness: 150 }}
                        className="w-full max-w-md"
                    >
                        <p className="invisible -mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                            animate={{ 
                                scale: 1, 
                                opacity: 1, 
                                rotate: 2,
                            }}
                            transition={{ duration: 0.7, ease: "easeOut", type: "spring", stiffness: 140 }}
                            className="bg-linear-to-br from-amber-100/90 to-amber-300/80 rounded-3xl p-1 shadow-[0_0_50px_rgba(251,191,36,0.3)] ">
                            <div className="bg-slate-900 rounded-3xl p-6 border border-amber-400/40 text-center relative overflow-hidden">
                                {/* Ticket Design */}
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-950 rounded-full" />
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-950 rounded-full" />
                                <div className="absolute top-1/2 left-6 right-6 h-0.5 border-t-2 border-dashed border-white/10" />

                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
                                    animate={{
                                        x: ["-100%", "200%"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear",
                                        repeatDelay: 2
                                    }}
                                />

                                <motion.div 
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    <motion.div 
                                        className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400"
                                        animate={{
                                            rotate: [0, 5, 0, -5, 0],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <Ticket size={32} />
                                    </motion.div>
                                    <h2 className="text-amber-200 text-2xl font-semibold uppercase tracking-widest mb-4">Golden Ticket</h2>
                                    <p className="text-white/50 text-xs uppercase">Valid for every day ahead</p>
                                </motion.div>

                                <motion.div 
                                    className="mt-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    <p className="text-white/90 italic text-lg">"{ticketText}"</p>
                                    <p className="text-white/40 text-xs mt-2">No expiration date</p>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            onClick={onNext}
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="mx-auto mt-12 flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase text-sm tracking-widest"
                        >
                            Claim Ticket <ChevronRight size={14} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};