"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Assuming Dialog can be used for lightbox
import { X } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// Generate array of 31 photos
const photos = Array.from({ length: 31 }, (_, i) => ({
    id: i + 1,
    src: `/gallery/${i + 1}.jpeg`,
    alt: `Memory ${i + 1}`,
}));

export function Gallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    return (
        <section className="py-20 px-4 md:px-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-serif text-slate-800 mb-4">
                        Memory Lane
                    </h2>
                    <p className="text-gray-500 font-sans max-w-xl mx-auto">
                        Each picture tells a story, a moment frozen in time. Here are some of
                        the beautiful moments collected just for you.
                    </p>
                </motion.div>

                {/* Masonry Layout using CSS columns */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                            onClick={() => setSelectedPhoto(photo.src)}
                        >
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 duration-300" />
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <p className="text-white text-sm font-medium drop-shadow-md">
                                    Moment #{photo.id}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Dialog */}
            <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
                <DialogContent className="max-w-screen-lg w-full bg-transparent border-none shadow-none p-0 flex items-center justify-center">
                    <VisuallyHidden.Root>
                        <DialogTitle>Photo View</DialogTitle>
                    </VisuallyHidden.Root>
                    <div className="relative w-full max-h-[90vh] flex flex-col items-center">
                        {/* Close Button styling tweak */}
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute -top-10 right-0 text-white hover:text-rose-300 transition-colors p-2 bg-black/50 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {selectedPhoto && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full h-auto max-h-[85vh] overflow-hidden rounded-lg shadow-2xl"
                            >
                                <img
                                    src={selectedPhoto}
                                    alt="Full view"
                                    className="w-full h-full object-contain max-h-[85vh] rounded-lg"
                                />
                            </motion.div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
