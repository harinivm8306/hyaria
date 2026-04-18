"use client";

import Section from "@/components/Section";
import { Mail, Github, Linkedin, MapPin, Send, Globe, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <main className="pt-20">
            <Section>
                <div className="grid lg:grid-cols-2 gap-20 items-stretch">
                    <div>
                        <h1 className="text-4xl lg:text-7xl font-bold mb-8">Get in <span className="text-primary">Touch</span></h1>
                        <p className="text-xl text-text-muted mb-12 leading-relaxed">
                            Have questions about HY-ARIA? Interested in collaborating or deploying our system?
                            Reach out to us and let's discuss the future of farming.
                        </p>

                        <div className="space-y-8">
                            <ContactInfo icon={<Mail className="text-primary" />} label="Email" value="contact@hyaria.tech" />
                            <ContactInfo icon={<Github className="text-secondary" />} label="Project Repository" value="github.com/hyaria/core" />
                            <ContactInfo icon={<MapPin className="text-accent" />} label="Office" value="Silicon Valley Innovation Hub, CA" />
                            <ContactInfo icon={<Globe className="text-blue-400" />} label="LinkedIn" value="linkedin.com/company/hyaria" />
                        </div>
                    </div>

                    <div className="glass p-12 rounded-[3.5rem] border border-white/10 flex flex-col h-full bg-white/[0.01]">
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <MessageSquare className="text-primary" /> Send a Message
                        </h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-6">
                                <InputGroup label="Full Name" placeholder="John Doe" />
                                <InputGroup label="Email Address" placeholder="john@example.com" />
                            </div>
                            <InputGroup label="Subject" placeholder="Inquiry about Prototype" />
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1">Message</label>
                                <textarea
                                    rows={6}
                                    placeholder="Tell us about your project..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-primary outline-none transition-all placeholder:text-white/20"
                                ></textarea>
                            </div>
                            <button
                                className="w-full py-5 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl shadow-xl shadow-primary/25 transition-all flex items-center justify-center gap-3"
                            >
                                SEND MESSAGE <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </Section>

            <Section className="bg-bg-dark border-t border-white/5 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full translate-y-1/2" />
                <div className="text-center relative z-10 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6">Global Headquarters</h3>
                    <div className="aspect-[21/9] glass rounded-3xl border border-white/10 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1570126618983-37508bb39bb9?q=80&w=1200&auto=format&fit=crop" className="w-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Map" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                    </div>
                </div>
            </Section>
        </main>
    );
}

function ContactInfo({ icon, label, value }: any) {
    return (
        <div className="flex gap-6 items-center group cursor-pointer">
            <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-all group-hover:scale-110">
                {icon}
            </div>
            <div>
                <div className="text-[10px] font-black tracking-widest text-text-muted uppercase mb-1">{label}</div>
                <div className="text-lg font-bold group-hover:text-primary transition-colors">{value}</div>
            </div>
        </div>
    );
}

function InputGroup({ label, placeholder }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-primary outline-none transition-all placeholder:text-white/20"
            />
        </div>
    );
}
