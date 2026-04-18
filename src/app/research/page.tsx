"use client";

import Section from "@/components/Section";
import { FileText, Database, BookOpen, ExternalLink, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ResearchPage() {
    const papers = [
        {
            title: "Optimizing Aeroponic Nutrient Delivery using LSTM Networks",
            journal: "Journal of Smart Agriculture (2025)",
            id: "HYA-2025-01",
        },
        {
            title: "Real-time PH Stabilization in Closed-Loop Hydroponic Systems",
            journal: "DeepMind Open Research (2026)",
            id: "HYA-2026-04",
        },
        {
            title: "Comparative Analysis of Root Oxygenation in High-Pressure Misting",
            journal: "Plant Physiology Review",
            id: "HYA-2024-09",
        },
    ];

    return (
        <main className="pt-20">
            <Section>
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-6">Scientific <span className="text-primary">Research</span></h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        The foundation of HY-ARIA is built on rigorous academic study and peer-reviewed
                        methodologies in plant science and machine learning.
                    </p>
                </div>

                <div className="space-y-6">
                    {papers.map((paper, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 lg:p-12 glass rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all flex flex-col md:row items-start md:items-center justify-between gap-8 group"
                        >
                            <div className="flex gap-8 items-center">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <FileText size={32} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black tracking-widest text-text-muted uppercase mb-2">{paper.id}</div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-2">{paper.title}</h3>
                                    <div className="text-sm text-primary font-medium">{paper.journal}</div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-text-muted">
                                    <Download size={20} />
                                </button>
                                <button className="px-6 py-4 bg-white/5 rounded-2xl hover:bg-primary transition-all font-bold flex items-center gap-2 group-hover:text-white">
                                    Read Paper <ExternalLink size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section className="bg-bg-card">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="p-12 glass rounded-[3rem] border border-white/10">
                        <Database className="text-primary mb-6 w-12 h-12" />
                        <h3 className="text-2xl font-bold mb-4">Open Access Datasets</h3>
                        <p className="text-text-muted mb-8 leading-relaxed">
                            We believe in open science. Our anonymized growth datasets are available on Kaggle
                            for the community to build upon and improve agriculture globally.
                        </p>
                        <button className="px-8 py-4 border border-primary/50 text-primary hover:bg-primary hover:text-white rounded-xl transition-all font-bold uppercase tracking-widest text-xs">
                            BROWSE KAGGLE DATASETS
                        </button>
                    </div>

                    <div className="p-12 glass rounded-[3rem] border border-white/10">
                        <BookOpen className="text-primary mb-6 w-12 h-12" />
                        <h3 className="text-2xl font-bold mb-4">Reference Library</h3>
                        <p className="text-text-muted mb-8 leading-relaxed">
                            Access the curated list of 500+ research papers we used as the basis for
                            our aeroponic mist interval and nitrogen tracking models.
                        </p>
                        <button className="px-8 py-4 border border-primary/50 text-primary hover:bg-primary hover:text-white rounded-xl transition-all font-bold uppercase tracking-widest text-xs">
                            VIEW REFERENCES
                        </button>
                    </div>
                </div>
            </Section>
        </main>
    );
}
