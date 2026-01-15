"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Unlock, Gift, MapPin, Clock } from "lucide-react";
import confetti from "canvas-confetti";

export function Riddle() {
    const [step, setStep] = useState(0);
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [showHiddenGift, setShowHiddenGift] = useState(false);

    // Riddles configuration
    const riddles = [
        {
            title: "The First Clue",
            question:
                "Aku selalu ada di depan mata, tapi tak terlihat. Aku bertambah setiap tahun, tapi tak membuatmu tua di hatiku. Angka berapakah aku jika hari ini adalah 14 Januari?",
            hint: "Usiamu :) (Input angka)",
            check: (ans: string) => ans.includes("2") || ans.includes("20") || ans.includes("21") || ans.includes("22") || ans.includes("23") || ans.includes("24") || ans.includes("25"), // Broad check as I don't know the exact age! Let's assume user knows.
            // Actually let's make it simpler: "Tanggal berapa ulang tahunmu?" -> "14"
            // Let's stick to the plan: "Math Puzzle"
        },
        {
            title: "The Final Coordinate",
            question: "Jika cinta kita adalah sebuah jam, dan kita bertemu saat matahari terbenam. Jam berapakah itu? (Format: 00.00)",
            hint: "Hint: 19.00",
            check: (ans: string) => ans.includes("19.00") || ans.includes("19:00"),
        },
    ];

    // Override first riddle to be simpler as per plan logic "Math"
    // Plan: "Aku punya angka, jika kamu membaginya dengan jumlah bulan dalam setahun..."
    // Let's implement that text.
    const steps = [
        {
            id: 1,
            title: "The QA Tester's Code",
            text: `Seorang QA Engineer sedang menjalani sprint yang cukup melelahkan karena banyak tiket yang bolak-balik Reopen.

Hari ini ia hanya mampu mengerjakan setengah dari Y tiket, karena sebagian besar waktu habis untuk retest bug lama.

Dari tiket yang dikerjakan:
4 tiket berhasil lolos verifikasi dan berstatus Closed
Sisanya kembali ke board sebagai Reopen (X)

Saat daily stand-up, ia menyadari:
Jika jumlah tiket Reopen (X) ditambah 4, hasilnya adalah setengah dari target harian (Y).
Dan jika X ditambah Y, hasilnya adalah angka spesial ini.

Tentukan nilai X + Y.`,
            answer: "26",
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentStep = steps[step];

        // Flexible checking
        if (answer.trim() === currentStep.answer) {
            if (step < steps.length - 1) {
                setStep(step + 1);
                setAnswer("");
            } else {
                setUnlocked(true);
                fireConfetti();
            }
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    const fireConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    return (
        <section className="py-20 bg-sage/10 min-h-[80vh] flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-serif text-slate-800 mb-2">The Quest</h2>
                    <p className="text-slate-600">Solve the mystery to reveal your gift.</p>
                </motion.div>

                {!unlocked ? (
                    <Card className="p-8 bg-white/80 backdrop-blur shadow-xl border-white/50 relative overflow-hidden">
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 h-2 bg-sage-200 w-full">
                            <motion.div
                                className="h-full bg-rose-400"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 mt-4"
                            >
                                <div className="flex items-center gap-3 text-rose-500 mb-4">
                                    <Unlock className="w-6 h-6" />
                                    <span className="font-bold tracking-wider uppercase text-xs">{steps[step].title}</span>
                                </div>

                                <div className="text-lg text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                                    {steps[step].text}
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 flex gap-2 items-start">
                                    <span className="text-lg">⚠️</span>
                                    <p>
                                        <span className="font-semibold">Rules:</span> Dilarang pakai ChatGPT dulu ya! 🤫
                                        <br />
                                        Kalau sampai jam 15.00 belum ketemu jawabannya, baru boleh tanya AI.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <motion.div
                                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Input
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            placeholder="Type your answer..."
                                            className={`text-center text-lg h-12 transition-all ${error ? "border-rose-500 bg-rose-50" : "border-slate-200 focus:border-sage-400"}`}
                                        />
                                    </motion.div>
                                    <Button type="submit" className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-medium tracking-wide">
                                        {step === steps.length - 1 ? "Unlock Gift" : "Next Clue"}
                                    </Button>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </Card>
                ) : (
                    <>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-8 rounded-2xl shadow-2xl text-center border-4 border-gold/30"
                        >
                            <div className="mb-6 flex justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="cursor-pointer"
                                    onClick={() => setShowHiddenGift(true)}
                                >
                                    <Gift className="w-20 h-20 text-rose-400 animate-bounce" />
                                </motion.div>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-4">
                                Happy Birthday, Vanda!
                            </h3>
                            <div className="text-slate-600 mb-8 space-y-4 px-4 leading-relaxed italic font-serif">
                                <p>
                                    "Hadiah sesungguhnya adalah waktu yang akan kita habiskan bersama."
                                </p>
                                <p>
                                    Nanti malam, aku akan menjemputmu di rumah untuk makan malam spesial.
                                    Aku berangkat dari kantor pukul 19.00 dan akan tiba sekitar pukul 20.00.
                                </p>
                                <p className="font-semibold text-rose-500">
                                    Bersiaplah, cantik. Sampai jumpa nanti! ❤️
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-sage-50 p-6 rounded-xl border border-sage-100">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm text-sage-600">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">Pickup Time</p>
                                        <p className="font-semibold text-slate-700">15 Jan 2026, 20:00 WIB</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm text-rose-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">Plan</p>
                                        <p className="font-semibold text-slate-700">Dinner</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] text-slate-300 mt-6 hover:text-slate-400 transition-colors cursor-help">
                                Psst... cari tombol tersembunyi untuk membuka kado lainnya
                            </p>
                        </motion.div>

                        {/* Hidden Gift Dialog */}
                        <Dialog open={showHiddenGift} onOpenChange={setShowHiddenGift}>
                            <DialogContent className="max-w-md w-full bg-white p-0 border-none rounded-2xl overflow-hidden shadow-2xl">
                                <div className="relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage-300 to-rose-300" />
                                    <div className="p-6 text-center">
                                        <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Surprise! 🎁</h3>
                                        <p className="text-slate-500 mb-6">Just a little something extra for you.</p>
                                        <div className="rounded-xl overflow-hidden border-4 border-slate-100 shadow-inner">
                                            <img
                                                src="/gift.png"
                                                alt="Special Gift"
                                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <p className="mt-4 text-sm font-semibold text-rose-500">New Balance Rebel v4</p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>
        </section>
    );
}
