"use client";

import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Cpu, Database, Cloud, LayoutDashboard, Settings, ArrowRight, Zap, Eye, BrainCircuit } from "lucide-react";

const components = {
    sensors: ["pH Sensor", "Temperature Sensor", "Humidity Sensor", "EC Sensor", "Light Sensor"],
    controller: "ESP32 (Micro-controller)",
    ai: "Random Forest & LSTM Model",
    cloud: "Cloud / Server Backend",
    dashboard: "Real-time Monitoring Web App",
    automation: "Smart Misting & Dosing Pumps"
};

export default function ArchitecturePage() {
    return (
        <main className="pt-20">
            <Section>
                <div className="text-center mb-20">
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6">System <span className="text-primary">Architecture</span></h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        A seamless integration of edge computing, cloud infrastructure, and intelligent automation.
                    </p>
                </div>

                {/* Dynamic Architecture Diagram */}
                <div className="relative py-20 px-4 max-w-5xl mx-auto">
                    {/* Connector Line Background */}
                    <div className="absolute top-[50%] left-10 right-10 h-[2px] bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 hidden lg:block" />

                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 relative z-10">
                        {/* Step 1: Sensors */}
                        <ArchNode
                            icon={<Eye className="text-blue-400" />}
                            label="Sensors"
                            sub="Data Collection"
                            items={components.sensors}
                        />

                        <Connector />

                        {/* Step 2: Controller */}
                        <ArchNode
                            icon={<Cpu className="text-purple-400" />}
                            label="ESP32"
                            sub="Edge Controller"
                        />

                        <Connector />

                        {/* Step 3: AI Layer */}
                        <ArchNode
                            icon={<BrainCircuit className="text-primary" />}
                            label="AI Model"
                            sub="Inference Engine"
                        />

                        <Connector />

                        {/* Step 4: Cloud */}
                        <ArchNode
                            icon={<Cloud className="text-secondary" />}
                            label="Cloud"
                            sub="Data Storage"
                        />

                        <Connector />

                        {/* Step 5: Dashboard */}
                        <ArchNode
                            icon={<LayoutDashboard className="text-accent" />}
                            label="Dashboard"
                            sub="User Interface"
                        />

                        <Connector />

                        {/* Step 6: Automation */}
                        <ArchNode
                            icon={<Settings className="text-emerald-400" />}
                            label="Automation"
                            sub="System Feedback"
                        />
                    </div>
                </div>
            </Section>

            <Section className="bg-bg-card">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="p-8 glass rounded-3xl border border-white/5">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Eye className="text-primary" /> Perception Layer
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Industrial-grade sensors capture environmental variables with 99.9% precision.
                            The ESP32 samples data every 5 seconds to ensure real-time responsiveness.
                        </p>
                    </div>
                    <div className="p-8 glass rounded-3xl border border-white/5">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <BrainCircuit className="text-primary" /> Logic Layer
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Our AI models analyze historical data against current sensor inputs to predict
                            growth patterns and identify potential nutrient deficiencies before they manifest.
                        </p>
                    </div>
                    <div className="p-8 glass rounded-3xl border border-white/5">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Zap className="text-primary" /> Actuation Layer
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Based on AI decisions, the system triggers high-pressure pumps and LED arrays
                            to maintain the perfect growth climate automatically.
                        </p>
                    </div>
                </div>
            </Section>
        </main>
    );
}

function ArchNode({ icon, label, sub, items }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center group"
        >
            <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors shadow-xl">
                {icon}
            </div>
            <div className="font-bold text-sm whitespace-nowrap">{label}</div>
            <div className="text-[10px] text-text-muted uppercase tracking-tighter mb-4">{sub}</div>
            {items && (
                <div className="hidden lg:block absolute top-full mt-4 w-40 p-3 glass rounded-xl border border-white/5 text-[10px] text-left space-y-1">
                    {items.map((item: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function Connector() {
    return (
        <div className="hidden lg:flex items-center justify-center">
            <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowRight className="text-white/20 w-4 h-4" />
            </motion.div>
        </div>
    );
}
