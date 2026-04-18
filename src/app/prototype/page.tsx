"use client";

import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Cpu, Zap, Settings, Layers, Box, PenTool } from "lucide-react";

export default function PrototypePage() {
    const hardware = [
        { name: "ESP32 (Core)", role: "Dual-Core IoT Brain", icon: <Cpu /> },
        { name: "NPK 7-in-1 Probe", role: "Ion-Reflectometry (mg/L)", icon: <Settings /> },
        { name: "RS485 Modbus", role: "Industrial Communication", icon: <Zap /> },
        { name: "Ultrasonic Disk", role: "1-5 Micron Atomization", icon: <Layers /> },
    ];

    return (
        <main className="pt-20">
            <Section>
                <div className="text-center mb-20">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-6">Hardware <span className="text-primary">Prototype</span></h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        From blueprint to reality. Explore the physical components that power HY-ARIA.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Box className="text-primary" /> The Aeroponic Chamber
                            </h2>
                            <p className="text-text-muted leading-relaxed">
                                The core of the system is a 50-liter light-isolated chamber where roots hang
                                suspended in a dark, humid environment. This design promotes maximum gas
                                exchange and prevents algae growth.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {hardware.map((item, i) => (
                                <div key={i} className="p-6 glass rounded-2xl border border-white/5">
                                    <div className="text-primary mb-3">{item.icon}</div>
                                    <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                                    <p className="text-[10px] text-text-muted uppercase tracking-widest">{item.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img
                            src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1000&auto=format&fit=crop"
                            alt="System Prototype"
                            className="rounded-3xl shadow-2xl relative z-10 border border-white/10"
                        />
                        <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border border-white/10 z-20 shadow-2xl">
                            <p className="text-xs font-bold italic">"v2.1 Experimental Model"</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-bg-card">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="aspect-video glass rounded-2xl border border-white/10 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-text-muted font-bold uppercase tracking-widest text-[10px]">Wiring Diagram</div>
                            <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop" className="opacity-30 grayscale hover:opacity-100 transition-all duration-700" alt="Wiring" />
                        </div>
                        <h4 className="font-bold">Electronics Hub</h4>
                        <p className="text-xs text-text-muted">Opto-isolated relays and centralized power distribution management.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="aspect-video glass rounded-2xl border border-white/10 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-text-muted font-bold uppercase tracking-widest text-[10px]">Chamber Internals</div>
                            <img src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop" className="opacity-30 grayscale hover:opacity-100 transition-all duration-700" alt="Chamber" />
                        </div>
                        <h4 className="font-bold">Atomization Array</h4>
                        <p className="text-xs text-text-muted">High-pressure nozzles strategically placed for 360° root coverage.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="aspect-video glass rounded-2xl border border-white/10 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-text-muted font-bold uppercase tracking-widest text-[10px]">CAD Model</div>
                            <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop" className="opacity-30 grayscale hover:opacity-100 transition-all duration-700" alt="CAD" />
                        </div>
                        <h4 className="font-bold">Digital Twin</h4>
                        <p className="text-xs text-text-muted">3D modeled structure for optimal structural integrity and airflow.</p>
                    </div>
                </div>
            </Section>
        </main>
    );
}
