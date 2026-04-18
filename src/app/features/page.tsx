"use client";

import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Thermometer, FlaskConical, Droplet, BrainCircuit, Smartphone, Wind, Gauge, BellRing } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            title: "Environmental Monitoring",
            items: ["Real-time Temp/Humidity", "Light Intensity Analysis", "CO2 Level Tracking"],
            icon: <Thermometer className="text-orange-400" />,
            color: "border-orange-500/20",
            bg: "bg-orange-500/5",
        },
        {
            title: "Nutrient Management",
            items: ["NPK Auto-Stabilizer", "Dynamic pH Balancing", "Automated Nutrient Dosing"],
            icon: <FlaskConical className="text-blue-400" />,
            color: "border-blue-500/20",
            bg: "bg-blue-500/5",
        },
        {
            title: "Smart Misting System",
            items: ["Sub-micron Atomization", "Automatic Mist Intervals", "Root Zone Oxygenation"],
            icon: <Wind className="text-emerald-400" />,
            color: "border-emerald-500/20",
            bg: "bg-emerald-500/5",
        },
        {
            title: "AI Crop Prediction",
            items: ["Growth Rate Estimation", "Deficiency Detection", "Harvest Time Forecast"],
            icon: <BrainCircuit className="text-purple-400" />,
            color: "border-purple-500/20",
            bg: "bg-purple-500/5",
        },
        {
            title: "Remote Dashboard",
            items: ["Cloud-Synced Live Data", "Manual System Override", "Multi-device Support"],
            icon: <Smartphone className="text-primary" />,
            color: "border-primary/20",
            bg: "bg-primary/5",
        },
        {
            title: "Intelligent Alerts",
            items: ["Critical Limit SMS/Web", "System Health Diagnosis", "Maintenance Reminders"],
            icon: <BellRing className="text-accent" />,
            color: "border-accent/20",
            bg: "bg-accent/5",
        },
    ];

    return (
        <main className="pt-20">
            <Section>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-6">Core <span className="text-gradient">Features</span></h1>
                    <p className="text-xl text-text-muted">
                        The HY-ARIA system is packed with cutting-edge capabilities designed to maximize crop yield
                        and minimize operational overhead.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`p-10 rounded-[2.5rem] border ${feature.color} ${feature.bg} flex flex-col gap-6 group transition-all`}
                        >
                            <div className="p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <ul className="space-y-3">
                                    {feature.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-2 text-text-muted text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section className="bg-bg-dark border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Built for <span className="text-primary">Reliability</span></h2>
                        <p className="text-text-muted leading-relaxed mb-6">
                            Our system architecture ensures high uptime and data integrity. Every feature is
                            rigorously tested against industrial standards to guarantee the health of your crops.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5">
                                <div className="text-primary font-bold text-2xl mb-1">99.9%</div>
                                <div className="text-xs text-text-muted uppercase tracking-widest">Uptime</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5">
                                <div className="text-primary font-bold text-2xl mb-1">&lt; 50ms</div>
                                <div className="text-xs text-text-muted uppercase tracking-widest">Latency</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="glass p-8 rounded-3xl border border-white/10 relative z-10">
                            <div className="space-y-6">
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "85%" }}
                                        transition={{ duration: 2 }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">System Stability</span>
                                    <span className="text-primary font-bold">Stable</span>
                                </div>
                                <div className="h-32 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-center italic text-text-muted text-sm p-6 text-center">
                                    "AI inference active: Environmental parameters are within optimal ranges for Lactuca sativa."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
