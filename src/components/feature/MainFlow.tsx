"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gatekeeper } from "@/components/feature/Gatekeeper";
import { Hero } from "@/components/feature/Hero";
import { Gallery } from "@/components/feature/Gallery";
import { Riddle } from "@/components/feature/Riddle";
import { MusicPlayer } from "@/components/feature/MusicPlayer";

import { Heart } from "lucide-react";

export function MainFlow() {
    const [isUnlocked, setIsUnlocked] = useState(false);

    return (
        <main className="min-h-screen relative overflow-x-hidden">
            <AnimatePresence mode="wait">
                {!isUnlocked && (
                    <Gatekeeper key="gatekeeper" onUnlock={() => setIsUnlocked(true)} />
                )}
            </AnimatePresence>

            {isUnlocked && (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <MusicPlayer />
                    <Hero />
                    <Gallery />
                    <Riddle />

                    <footer className="py-8 text-center text-slate-400 text-sm font-sans bg-white border-t border-slate-100 flex items-center justify-center gap-2">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                    </footer>
                </motion.div>
            )}
        </main>
    );
}
