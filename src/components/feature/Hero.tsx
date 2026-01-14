"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { ArrowDown } from "lucide-react";

export function Hero() {
    const [animationData, setAnimationData] = useState<any>(null);

    // Fetch a nice flower/celebration lottie animation
    useEffect(() => {
        fetch("https://assets5.lottiefiles.com/packages/lf20_jbrw3hcz.json") // Flower/Nature theme
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("Failed to load lottie");
            })
            .then((data) => setAnimationData(data))
            .catch(() => {
                // Fallback or retry
                console.log("Using fallback animation");
            });
    }, []);

    const typewriterText = [
        "Happy Birthday,",
        "Vanda Amalia Firdaus",
        "May your day be as beautiful as you are.",
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sage/20 via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose/20 via-transparent to-transparent opacity-50" />

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl">
                {animationData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="w-48 h-48 md:w-64 md:h-64 mb-6"
                    >
                        <Lottie animationData={animationData} loop={true} />
                    </motion.div>
                )}

                <div className="space-y-4 md:space-y-6">
                    {/* Line 1: Happy Birthday */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-2xl md:text-3xl font-sans text-gray-500 tracking-widest uppercase"
                    >
                        {typewriterText[0]}
                    </motion.h2>

                    {/* Line 2: Name */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-slate-800 font-bold leading-tight">
                        {typewriterText[1].split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 1.5 + index * 0.1,
                                    duration: 0.1,
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Line 3: Wish */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.5, duration: 1 }}
                        className="text-lg md:text-xl font-sans text-gray-600 italic mt-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        "Di hari spesialmu, aku berdoa agar semesta selalu memelukmu dengan bahagia. Terima kasih telah lahir dan menjadi bagian terindah dari duniaku."
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5.5, duration: 1 }} // slightly later delay
                    className="mt-4"
                >
                    <p className="text-gray-500 font-serif italic text-sm md:text-base">
                        — Moh Rizki Kurniawan
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{
                    delay: 5,
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: "smooth",
                    });
                }}
            >
                <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors">
                    <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                    <ArrowDown className="w-6 h-6" />
                </div>
            </motion.div>
        </div>
    );
}
