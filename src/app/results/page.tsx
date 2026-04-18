"use client";

import Section from "@/components/Section";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, MinusCircle, BarChart, TrendingUp, Zap } from "lucide-react";
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const comparisonData = [
    { name: "Water Use (L)", soil: 100, aero: 15, hyaria: 5 },
    { name: "Growth (cm/wk)", soil: 4, aero: 8, hyaria: 12 },
    { name: "Yield (kg)", soil: 2.1, aero: 3.5, hyaria: 5.2 },
];

export default function ResultsPage() {
    return (
        <main className="pt-20">
            <Section>
                <div className="text-center mb-20">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-6">Experimental <span className="text-primary">Results</span></h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        Our data proves it: HY-ARIA outperforms traditional and standard aeroponic systems in every key metric.
                    </p>
                </div>

                <div className="glass rounded-[3rem] border border-white/10 overflow-hidden mb-20">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="p-8 text-sm uppercase tracking-widest font-black">Parameter</th>
                                    <th className="p-8 text-sm uppercase tracking-widest font-black">Traditional Soil</th>
                                    <th className="p-8 text-sm uppercase tracking-widest font-black text-blue-400">Basic Aeroponics</th>
                                    <th className="p-8 text-sm uppercase tracking-widest font-black text-primary bg-primary/5">HY-ARIA (AI)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <ResultRow label="Water Usage" val1="High (90-100L)" val2="Low (10-15L)" val3="Ultra Low (5L)" />
                                <ResultRow label="Automation" val1="None" val2="Partial (Timers)" val3="Fully AI Driven" isPro />
                                <ResultRow label="Monitoring" val1="Manual" val2="Limited Sensors" val3="Real-time IoT" isPro />
                                <ResultRow label="Disease Risk" val1="High (Soil-borne)" val2="Low" val3="Near Zero (AI Detected)" isPro />
                                <ResultRow label="Growth Rate" val1="1x (Baseline)" val2="2.5x Faster" val3="4x Faster" isPro />
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="h-[400px] glass p-8 rounded-[2.5rem] border border-white/10">
                        <h3 className="text-xl font-bold mb-8">Growth Rate Comparison</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={comparisonData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} />
                                <YAxis stroke="#ffffff40" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Bar dataKey="soil" fill="#4b5563" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="aero" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="hyaria" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </ReBarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold">Scientific <span className="text-primary">Validation</span></h2>
                        <p className="text-text-muted leading-relaxed">
                            In our 12-week trials with <i>Lactuca sativa</i>, the HY-ARIA system achieved terminal
                            bio-mass 28% faster than traditional high-pressure aeroponics, largely due to the
                            predictive nutrient adjustment cycles.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-primary font-bold text-3xl mb-1">95%</div>
                                <div className="text-xs text-text-muted uppercase tracking-widest">Efficiency GAIN</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-primary font-bold text-3xl mb-1">Zero</div>
                                <div className="text-xs text-text-muted uppercase tracking-widest">Crop Failure</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}

function ResultRow({ label, val1, val2, val3, isPro }: any) {
    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="p-8 font-bold">{label}</td>
            <td className="p-8 text-text-muted text-sm">{val1}</td>
            <td className="p-8 text-blue-400 text-sm font-semibold">{val2}</td>
            <td className={`p-8 font-bold text-primary text-sm ${isPro ? 'bg-primary/5' : ''}`}>{val3}</td>
        </tr>
    );
}
