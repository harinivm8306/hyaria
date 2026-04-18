"use client";

import Section from "@/components/Section";
import { Github, Linkedin, Mail, Twitter, Award, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function TeamPage() {
    const members = [
        {
            name: "Alex Thorne",
            role: "Lead AI Architect",
            college: "Stanford University",
            icon: <Award className="text-primary" />,
        },
        {
            name: "Dr. Elena Vance",
            role: "Biosystems Engineer",
            college: "MIT",
            icon: <GraduationCap className="text-blue-400" />,
        },
        {
            name: "Marcus Chen",
            role: "IoT Core Developer",
            college: "CMU",
            icon: <Award className="text-orange-400" />,
        },
        {
            name: "Sarah Jenkins",
            role: "Product Strategy",
            college: "Harvard Business School",
            icon: <Award className="text-secondary" />,
        },
    ];

    return (
        <main className="pt-20">
            <Section>
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-6">The <span className="text-primary">Visionaries</span></h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        A diverse team of engineers, data scientists, and biologists working to build
                        the future of food security.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {members.map((member, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group p-8 glass rounded-[2.5rem] border border-white/5 text-center relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-32 h-32 rounded-full bg-white/5 mx-auto mb-8 border-4 border-white/5 group-hover:border-primary/20 transition-all overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white/10 uppercase">{member.name[0]}</div>
                                <img src={`https://i.pravatar.cc/300?u=${member.name}`} className="relative z-10 grayscale hover:grayscale-0 transition-all duration-500" alt={member.name} />
                            </div>
                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                            <div className="text-xs font-black uppercase tracking-widest text-primary mb-4">{member.role}</div>
                            <div className="text-text-muted text-xs mb-6 italic">{member.college}</div>

                            <div className="flex justify-center gap-4 text-text-muted">
                                <Github size={18} className="hover:text-white cursor-pointer" />
                                <Linkedin size={18} className="hover:text-blue-400 cursor-pointer" />
                                <Mail size={18} className="hover:text-primary cursor-pointer" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section className="bg-bg-card">
                <div className="flex flex-col lg:row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-6">Our Mentors</h2>
                        <p className="text-text-muted leading-relaxed mb-8">
                            We are grateful to the leading researchers and industry experts who have guided our
                            journey in developing the HY-ARIA ecosystem.
                        </p>
                        <div className="space-y-4">
                            {["Prof. Julian Bay (Agri-Tech)", "Dr. Sam Harris (Deep Learning)", "Linda Gray (Sustainability)"].map((m, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-bg-dark border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="font-medium">{m}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full flex justify-center">
                        <div className="glass p-12 rounded-[3.5rem] border border-white/10 text-center max-w-sm">
                            <h3 className="text-2xl font-bold mb-4">Join Us</h3>
                            <p className="text-text-muted text-sm mb-8">We're always looking for brilliant minds to join the smart growth evolution.</p>
                            <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                VIEW CAREERS
                            </button>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
