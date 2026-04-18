"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Github, Droplets, Zap, Bot, Globe } from "lucide-react";
import Link from "next/link";

const metrics = [
    { icon: <Droplets className="text-blue-400" />, label: "95% less water usage", sub: "Compared to traditional farming" },
    { icon: <Zap className="text-yellow-400" />, label: "Faster plant growth", sub: "Accelerated nutrient absorption" },
    { icon: <Bot className="text-primary" />, label: "Fully AI automated", sub: "24/7 intelligent crop monitoring" },
    { icon: <Globe className="text-emerald-400" />, label: "Sustainable farming", sub: "Zero soil erosion & low carbon" },
];

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] animate-pulse" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            The Future of Agriculture
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                            HY-<span className="text-primary">ARIA</span>: <br />
                            <span className="text-gradient">Smart Growth</span> Evolution
                        </h1>

                        <p className="text-xl text-text-muted mb-10 leading-relaxed max-w-xl">
                            Next-generation AI-Driven Automated Aeroponic Farming System.
                            Revolutionizing crop yields while minimizing resource consumption through
                            real-time IoT intelligence and advanced predictive modeling.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/dashboard"
                                className="group px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-primary/25"
                            >
                                View Dashboard
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/demo"
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                Interactive Demo
                            </Link>

                            <Link
                                href="/research"
                                className="px-8 py-4 text-text-muted hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Github className="w-5 h-5" />
                                Research Paper
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 glass rounded-3xl p-4 border border-white/10 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                            <img
                                src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop"
                                alt="Smart Farming"
                                className="rounded-2xl w-full object-cover aspect-video shadow-2xl relative z-10"
                            />

                            {/* Floating UI elements for 'Sensor visualization' flavor */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-10 right-10 z-20 glass p-4 rounded-xl border border-white/20 shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <p className="text-[10px] text-text-muted uppercase">Root Zone PH</p>
                                        <p className="text-lg font-bold text-primary">6.2</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="text-primary text-xs font-bold">OK</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute bottom-10 -left-6 z-20 glass p-4 rounded-xl border border-white/20 shadow-lg"
                            >
                                <div className="space-y-2">
                                    <p className="text-[10px] text-text-muted uppercase tracking-widest">NPK Balance</p>
                                    <div className="flex gap-1">
                                        {[30, 70, 45].map((val, i) => (
                                            <div key={i} className="w-2 h-8 bg-white/10 rounded-full flex items-end">
                                                <div className="w-full bg-primary rounded-full transition-all" style={{ height: `${val}%` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Key Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
                    {metrics.map((metric, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all hover:translate-y-[-5px] group"
                        >
                            <div className="mb-4 p-3 bg-white/5 rounded-xl inline-block group-hover:bg-primary/10 transition-colors">
                                {metric.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-1">{metric.label}</h3>
                            <p className="text-sm text-text-muted">{metric.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
