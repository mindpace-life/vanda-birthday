"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart } from "lucide-react";

interface GatekeeperProps {
    onUnlock: () => void;
}

export function Gatekeeper({ onUnlock }: GatekeeperProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim().toLowerCase() === "vanda amalia firdaus") {
            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-transparent to-sage-100/50 pointer-events-none" />

            <Card className="relative w-full max-w-md mx-4 overflow-hidden border-white/40 bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage-300 via-rose-300 to-gold-300" />

                <div className="flex flex-col items-center justify-center mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="mb-4"
                    >
                        <Sparkles className="w-10 h-10 text-gold-400" />
                    </motion.div>
                    <h1 className="font-serif text-3xl text-gray-800 text-center">
                        Welcome Home
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 font-sans tracking-wide">
                        A special place for a special person.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 ml-1">
                            The Question
                        </label>
                        <motion.div
                            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <Input
                                type="text"
                                placeholder="Siapa nama lengkap orang tercantik hari ini?"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-white/50 border-white/50 focus:border-rose-300 focus:ring-rose-200 h-12 text-center text-lg placeholder:text-gray-400 font-serif"
                            />
                        </motion.div>
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-rose-500 text-xs text-center mt-2 flex items-center justify-center gap-1"
                                >
                                    <Heart className="w-3 h-3 fill-rose-500" />
                                    Maaf, akses hanya untuk Vanda 🤫
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white h-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium tracking-wide"
                    >
                        Enter
                    </Button>
                </form>
            </Card>
        </motion.div>
    );
}
