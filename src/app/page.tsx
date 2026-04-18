import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { ArrowRight, Brain, Zap, Droplets } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <Section className="bg-bg-dark border-y border-white/5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full translate-x-[-20%]" />
            <img
              src="https://images.unsplash.com/photo-1592419302264-21943015f60c?q=80&w=1000&auto=format&fit=crop"
              className="rounded-3xl shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700 border border-white/10"
              alt="AI Agriculture"
            />
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">Where <span className="text-primary">Intelligence</span> Meets Growth</h2>
            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              Traditional aeroponics is efficient. HY-ARIA aeroponics is intelligent.
              Our system continuously optimizes every variable of the plant's lifecycle,
              ensuring maximum yields and 100% success rates in any climate.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="p-3 bg-primary/10 rounded-xl"><Brain className="text-primary" /></div>
                <div>
                  <h4 className="font-bold">Neural Optimization</h4>
                  <p className="text-sm text-text-muted">Dynamic nutrient dosing based on predictive LSTM modeling.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="p-3 bg-secondary/10 rounded-xl"><Zap className="text-secondary" /></div>
                <div>
                  <h4 className="font-bold">Lightning Fast Results</h4>
                  <p className="text-sm text-text-muted">Accelerated harvest cycles mean higher ROI for vertical farmers.</p>
                </div>
              </div>
            </div>

            <Link
              href="/solution"
              className="mt-12 inline-flex items-center gap-2 text-primary font-bold group px-4 py-2"
            >
              Explore our Solution <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="text-center bg-gradient-to-b from-bg-dark to-bg-card">
        <h2 className="text-4xl font-bold mb-16">Explore the <span className="text-primary">Ecosystem</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
          <Link href="/dashboard" className="p-10 glass rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-all group">
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary">Live Dashboard</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-6">Experience real-time telemetric control and system monitoring from anywhere.</p>
            <span className="text-xs font-bold text-primary flex items-center gap-2">Launch Terminal <ArrowRight size={12} /></span>
          </Link>
          <Link href="/prototype" className="p-10 glass rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-all group">
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary">Hardware Core</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-6">Deep dive into the ESP32 and industrial sensor hardware that powers HY-ARIA.</p>
            <span className="text-xs font-bold text-primary flex items-center gap-2">View Components <ArrowRight size={12} /></span>
          </Link>
          <Link href="/ai" className="p-10 glass rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-all group">
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary">AI Research</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-6">Read about our LSTM and Gradient Boosting models for growth prediction.</p>
            <span className="text-xs font-bold text-primary flex items-center gap-2">Read Tech Specs <ArrowRight size={12} /></span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
