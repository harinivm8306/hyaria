"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

export default function Section({ children, id, className = "", delay = 0 }: SectionProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={`relative py-20 lg:py-32 px-6 ${className}`}
        >
            <div className="container mx-auto max-w-7xl">
                {children}
            </div>
        </motion.section>
    );
}
