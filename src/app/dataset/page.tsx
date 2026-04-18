"use client";

import Section from "@/components/Section";
import { Database, Download, ExternalLink, Table as TableIcon, FileJson, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";

const sampleData = [
    { temp: 28.2, hum: 65, ph: 6.1, n: 120, p: 80, k: 60, res: "Optimal" },
    { temp: 27.8, hum: 68, ph: 5.9, n: 115, p: 75, k: 62, res: "Optimal" },
    { temp: 29.5, hum: 60, ph: 6.5, n: 100, p: 90, k: 55, res: "High PH" },
    { temp: 26.5, hum: 72, ph: 6.0, n: 130, p: 70, k: 65, res: "Low Temp" },
    { temp: 28.0, hum: 66, ph: 6.1, n: 122, p: 82, k: 58, res: "Optimal" },
];

export default function DatasetPage() {
    return (
        <main className="pt-20">
            <Section>
                <div className="flex flex-col lg:row justify-between items-start gap-12 mb-20">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl lg:text-7xl font-bold mb-6">Data <span className="text-primary">Foundations</span></h1>
                        <p className="text-xl text-text-muted leading-relaxed">
                            Our models are trained on high-fidelity agricultural datasets combining
                            real-time local sensor telemetry with global climate information.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 glass rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 text-sm font-bold">
                            <Download size={16} /> Raw Dataset
                        </button>
                        <button className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-lg shadow-primary/20">
                            <ExternalLink size={16} /> Kaggle Source
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    <SourceCard
                        title="Kaggle Agriculture"
                        desc="Historical crop growth data and nutrient requirements for 50+ species."
                        icon={<FileSpreadsheet className="text-green-400" />}
                    />
                    <SourceCard
                        title="NASA Climate Data"
                        desc="Historical atmospheric conditions and sunlight intensity patterns."
                        icon={<Database className="text-blue-400" />}
                    />
                    <SourceCard
                        title="Local Sensor Stream"
                        desc="Real-time telemetry from our proprietary ESP32-based hardware."
                        icon={<TableIcon className="text-purple-400" />}
                    />
                </div>

                <div className="glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <TableIcon className="text-primary" /> Dataset Preview
                        </h3>
                        <span className="text-xs text-text-muted font-mono uppercase tracking-widest">Showing last 5 entries</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-bg-card/50 text-text-muted text-[10px] uppercase font-black tracking-widest">
                                    <th className="p-6">Temp (°C)</th>
                                    <th className="p-6">Hum (%)</th>
                                    <th className="p-6">pH</th>
                                    <th className="p-6">N (mg/L)</th>
                                    <th className="p-6">P (mg/L)</th>
                                    <th className="p-6">K (mg/L)</th>
                                    <th className="p-6">Classification</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {sampleData.map((row, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6 font-mono font-bold text-white">{row.temp}</td>
                                        <td className="p-6 font-mono text-text-muted">{row.hum}</td>
                                        <td className="p-6 font-mono text-text-muted">{row.ph}</td>
                                        <td className="p-6 font-mono text-text-muted">{row.n}</td>
                                        <td className="p-6 font-mono text-text-muted">{row.p}</td>
                                        <td className="p-6 font-mono text-text-muted">{row.k}</td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.res === 'Optimal' ? 'bg-primary/20 text-primary' : 'bg-orange-500/20 text-orange-400'}`}>
                                                {row.res}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
        </main>
    );
}

function SourceCard({ title, desc, icon }: any) {
    return (
        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
            <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">{icon}</div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
