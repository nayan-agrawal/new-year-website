import { memo, useEffect, useState } from "react"
import { motion } from "framer-motion";

function Background() {
    const [stars, setStars] = useState([])

    useEffect(() => {

        const twinkles = Array.from({ length: 30 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 3,
            duration: Math.random() * 3 + 2,
            size: Math.random() > 0.7 ? 2 : 1,
        }))
        setStars(twinkles)
    }, [])

    return (
        <>
            <div className="fixed inset-0 bg-linear-to-br from-indigo-950/40 via-purple-900/20 to-rose-900/30 pointer-events-none overflow-hidden will-change-transform">

                {/* Grid background with slightly more visibility */}
                <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100px_100px]" />
                
                {/* Ambient glow orbs for warmth */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[100px]" />
            </div>

            {stars.map(({ left, top, delay, duration, size }, i) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    key={`star-${i}`}
                    className={`absolute ${size === 2 ? 'w-1.5 h-1.5' : 'w-1 h-1'} bg-white rounded-full`}
                    style={{ left, top }}
                    animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
                    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
        </>
    )
}

export default memo(Background)