import Link from "next/link";
import { Leaf, Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-bg-card border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Leaf className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold tracking-tight">
                                HY-<span className="text-primary">ARIA</span>
                            </span>
                        </Link>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Leading the smart growth evolution with AI-driven automated aeroponics.
                            Sustainable, efficient, and future-ready agriculture.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 transition-colors">
                                <Github size={18} className="text-text-muted hover:text-primary" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 transition-colors">
                                <Linkedin size={18} className="text-text-muted hover:text-primary" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 transition-colors">
                                <Twitter size={18} className="text-text-muted hover:text-primary" />
                            </a>
                            <a href="mailto:contact@hyaria.com" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 transition-colors">
                                <Mail size={18} className="text-text-muted hover:text-primary" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-text-main font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/problem" className="text-text-muted hover:text-primary transition-colors">Problem Statement</Link></li>
                            <li><Link href="/solution" className="text-text-muted hover:text-primary transition-colors">Our Solution</Link></li>
                            <li><Link href="/architecture" className="text-text-muted hover:text-primary transition-colors">System Architecture</Link></li>
                            <li><Link href="/results" className="text-text-muted hover:text-primary transition-colors">Experimental Results</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-text-main font-semibold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/features" className="text-text-muted hover:text-primary transition-colors">Core Features</Link></li>
                            <li><Link href="/ai" className="text-text-muted hover:text-primary transition-colors">AI Intelligence</Link></li>
                            <li><Link href="/dataset" className="text-text-muted hover:text-primary transition-colors">Kaggle Datasets</Link></li>
                            <li><Link href="/research" className="text-text-muted hover:text-primary transition-colors">Research Papers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-text-main font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3 text-text-muted">
                                <Mail size={16} />
                                <span>contact@hyaria.tech</span>
                            </li>
                            <li className="flex items-start gap-3 text-text-muted text-sm leading-tight">
                                <span className="mt-1">📍</span>
                                <span>Smart Agriculture Lab, Innovation Center</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
                    <p className="text-text-muted text-xs">
                        © 2026 HY-ARIA Project. All rights reserved. Built for Smart Growth Evolution.
                    </p>
                    <div className="flex gap-6 text-xs text-text-muted">
                        <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
