"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Auto-play attempt on mount or interaction
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.5;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    // Autoplay often blocked or file missing - silent fail
                    setIsPlaying(false);
                }
            }
        };

        // Add usage listener to trigger play on first click if autoplay failed
        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused && !hasError) {
                playAudio();
            }
            window.removeEventListener("click", handleInteraction);
        };

        window.addEventListener("click", handleInteraction);
        return () => window.removeEventListener("click", handleInteraction);
    }, [hasError]);

    const togglePlay = () => {
        if (audioRef.current && !hasError) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => setIsPlaying(false));
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (hasError) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 }}
            className="fixed bottom-6 right-6 z-40"
        >
            <audio
                ref={audioRef}
                loop
                autoPlay
                src="/music/bgm.mp3"
                onError={() => setHasError(true)}
            />
            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur shadow-lg border border-white/40 p-3 rounded-full hover:scale-110 transition-transform duration-300 group"
            >
                <div className={`relative ${isPlaying ? "animate-spin-slow" : ""}`}>
                    {isPlaying ? (
                        <Music className="w-6 h-6 text-rose-400" />
                    ) : (
                        <VolumeX className="w-6 h-6 text-slate-400" />
                    )}
                </div>
            </button>
        </motion.div>
    );
}
