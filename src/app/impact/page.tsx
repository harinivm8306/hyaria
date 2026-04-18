"use client";

import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Globe, Heart, ShoppingBag, Leaf, Users, ShieldCheck } from "lucide-react";

export default function ImpactPage() {
    const sdgs = [
        {
            id: "SDG 2",
            title: "Zero Hunger",
            desc: "Increasing food production density and enabling cultivation in non-arable urban environments.",
            color: "bg-red-500",
            icon: <Heart />,
        },
        {
            id: "SDG 12",
            title: "Responsible Consumption",
            desc: "Drastically reducing water and nutrient waste through closed-loop recycling systems.",
            color: "bg-orange-500",
            icon: <ShoppingBag />,
        },
        {
            id: "SDG 13",
            title: "Climate Action",
            desc: "Lowering the carbon footprint of agriculture by eliminating heavy machinery and long-haul transport.",
            color: "bg-green-600",
            icon: <Leaf />,
        },
    ];

    return (
        <main className="pt-20">
            <Section>
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-6">Global <span className="text-primary">Impact</span></h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        HY-ARIA is more than just a farm; it's a commitment to a sustainable future.
                        We align our technology with the United Nations Sustainable Development Goals.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {sdgs.map((sdg, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="relative overflow-hidden group rounded-[2.5rem] glass border border-white/10 p-10 h-full flex flex-col"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${sdg.color} opacity-10 blur-[60px] group-hover:opacity-30 transition-opacity`} />

                            <div className={`w-14 h-14 rounded-2xl ${sdg.color} flex items-center justify-center text-white mb-8 shadow-lg`}>
                                {sdg.icon}
                            </div>

                            <div className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-text-muted">{sdg.id}</div>
                            <h3 className="text-2xl font-bold mb-4">{sdg.title}</h3>
                            <p className="text-text-muted leading-relaxed flex-grow">{sdg.desc}</p>

                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                                <ShieldCheck className="text-primary" size={18} />
                                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Project Goal Verified</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section className="bg-bg-card text-center">
                <div className="max-w-3xl mx-auto">
                    <Globe className="mx-auto text-primary mb-8 w-16 h-16 animate-pulse" />
                    <h2 className="text-3xl font-bold mb-6">Feeding the 10 Billion</h2>
                    <p className="text-text-muted text-lg leading-relaxed mb-10">
                        By 2050, the world will need to produce 70% more food. HY-ARIA offers a scalable, decentralized solution
                        that can be deployed in deserts, urban basements, and space stations alike.
                    </p>
                    <div className="inline-flex gap-12 items-center">
                        <div className="text-center">
                            <div className="text-4xl font-black text-white mb-1">10k+</div>
                            <div className="text-[10px] uppercase font-bold text-text-muted tracking-tighter">Liters of Water Saved</div>
                        </div>
                        <div className="w-[1px] h-12 bg-white/10" />
                        <div className="text-center">
                            <div className="text-4xl font-black text-white mb-1">30%</div>
                            <div className="text-[10px] uppercase font-bold text-text-muted tracking-tighter">Faster to Harvest</div>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
