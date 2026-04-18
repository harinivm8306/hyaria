"use client";

import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Thermometer, Droplets, FlaskConical, Wifi, LayoutDashboard, Cpu } from "lucide-react";

export default function SolutionPage() {
    const solutions = [
        {
            title: "AI Climate Control",
            desc: "Deep learning models adjust temperature and humidity in real-time for optimal plant physiology.",
            icon: <Thermometer className="text-primary" />,
        },
        {
            title: "Automated Nutrient Dosing",
            desc: "Precise NPK and pH balancing through automated pump manifolds, eliminating human error.",
            icon: <FlaskConical className="text-secondary" />,
        },
        {
            title: "Smart Misting System",
            desc: "High-pressure atomizers create a nutrient-rich fog (5-20 microns) for maximum root oxygenation.",
            icon: <Droplets className="text-blue-400" />,
        },
        {
            title: "IoT Sensor Monitoring",
            desc: "Wide-spectrum sensor array tracks light, root health, and nutrient concentrations 24/7.",
            icon: <Wifi className="text-accent" />,
        },
        {
            title: "Real-time Dashboard",
            desc: "Cloud-synchronized interface for global monitoring and remote manual override capabilities.",
            icon: <LayoutDashboard className="text-emerald-400" />,
        },
        {
            title: "Edge AI Processing",
            desc: "On-device inference using ESP32 for immediate response to environmental anomalies.",
            icon: <Cpu className="text-purple-400" />,
        },
    ];

    return (
        <main className="pt-20">
            <Section>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="text-primary font-bold uppercase tracking-widest text-sm mb-4">The Solution</div>
                        <h1 className="text-4xl lg:text-6xl font-bold mb-8">AI-Powered <span className="text-gradient">Aeroponics</span></h1>
                        <p className="text-xl text-text-muted leading-relaxed mb-8">
                            HY-ARIA integrates advanced AI with aeroponic engineering to create the most efficient
                            growth environment possible. By suspending roots in air and misting them with
                            micro-nutrients, we unlock the plant's full genetic potential.
                        </p>
                        <div className="space-y-4">
                            {["95% Less Water Usage", "300% Faster Growth", "100% Soil-Free"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#10b981]" />
                                    </div>
                                    <span className="font-semibold">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                        <div className="glass aspect-square rounded-[3rem] border border-white/10 flex items-center justify-center relative z-10 p-12 overflow-hidden group">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-10"
                            >
                                <div className="border-[1px] border-dashed border-white rounded-full w-full h-full" />
                                <div className="border-[1px] border-dashed border-white rounded-full w-[80%] h-[80%] absolute top-[10%] left-[10%]" />
                            </motion.div>
                            <img
                                src="https://images.unsplash.com/photo-1582234371523-2882786cc846?q=80&w=1000&auto=format&fit=crop"
                                alt="Aeroponics"
                                className="rounded-2xl shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-bg-card">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold mb-4">Core Technology Pillars</h2>
                    <p className="text-text-muted">A multi-layered ecosystem designed for precision agriculture.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] transition-colors"
                        >
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </main>
    );
}
