"use client";

import Section from "@/components/Section";
import { AlertCircle, Droplets, UserX, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProblemPage() {
    const problems = [
        {
            title: "Manual Monitoring",
            description: "Traditional farming relies on human observation, which is prone to error and lacks 24/7 precision.",
            icon: <UserX className="text-red-400" />,
        },
        {
            title: "Nutrient Imbalance",
            description: "Incorrect PH or nutrient levels often go unnoticed, leading to stunted growth or crop death.",
            icon: <AlertCircle className="text-orange-400" />,
        },
        {
            title: "High Labour Cost",
            description: "Agricultural labour requirements are increasing, making traditional methods economically unsustainable.",
            icon: <BarChart3 className="text-yellow-400" />,
        },
        {
            title: "Water Wastage",
            description: "Soil-based farming wastes over 70% of water due to evaporation and inefficient delivery.",
            icon: <Droplets className="text-blue-400" />,
        },
    ];

    const stats = [
        { label: "Labour Cost Increase", value: "40%", icon: <TrendingUp className="text-red-400" /> },
        { label: "Potential Yield Loss", value: "30-50%", icon: <AlertTriangle className="text-orange-400" /> },
        { label: "Global Food Demand", value: "+70%", icon: <BarChart3 className="text-primary" /> },
    ];

    return (
        <main className="pt-20">
            <Section className="bg-gradient-to-b from-bg-dark to-bg-card">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">The Agricultural <span className="text-red-400">Crisis</span></h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        Conventional farming is reaching its breaking point. With a growing global population and
                        dwindling resources, the old ways are no longer enough to sustain our future.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {problems.map((problem, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-red-400/30 transition-all flex gap-6"
                        >
                            <div className="p-4 bg-white/5 rounded-2xl h-fit">
                                {problem.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                                <p className="text-text-muted leading-relaxed">{problem.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section className="bg-bg-card">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Critical Statistics</h2>
                    <p className="text-text-muted">Data highlighting the urgency for automated agricultural solutions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-3xl bg-bg-dark border border-white/10"
                        >
                            <div className="flex justify-center mb-6">{stat.icon}</div>
                            <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
                            <div className="text-sm uppercase tracking-widest text-text-muted">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section className="text-center">
                <div className="glass p-12 rounded-[3rem] border border-white/10 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 italic">"A transition to smart farming is no longer an option—it is a necessity."</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>
            </Section>
        </main>
    );
}
