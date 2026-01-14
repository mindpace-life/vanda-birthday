"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).tagName === "A" || (e.target as HTMLElement).closest(".cursor-pointer")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-rose-400/80 pointer-events-none z-[9999] mix-blend-multiply hidden md:block"
                animate={{
                    x: position.x - 8,
                    y: position.y - 8,
                    scale: isHovering ? 2.5 : 1,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-sage-400/50 pointer-events-none z-[9999] hidden md:block"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ type: "spring", damping: 40, stiffness: 150, mass: 0.8, delay: 0.05 }}
            />
        </>
    );
}
