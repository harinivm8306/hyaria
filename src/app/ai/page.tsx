"use client";

import Section from "@/components/Section";
import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Zap, Activity, Info, TrendingUp, ShieldAlert, Thermometer } from "lucide-react";

export default function AIPage() {
    const models = [
        {
            name: "Random Forest Regressor (Nutrients)",
            use: "Predicts exact NPK dosing requirements (ml) based on 7 environmental inputs with 96% accuracy.",
            icon: <TrendingUp className="text-primary" />,
        },
        {
            name: "Random Forest Classifier (Health)",
            use: "Classifies crop status as 'Healthy' or 'Stressed', enabling immediate preventative measures.",
            icon: <BrainCircuit className="text-secondary" />,
        },
        {
            name: "Environmental Logic Unit",
            use: "Calculates optimal misting intervals (min) to prevent root desiccation while saving 95% water.",
            icon: <ShieldAlert className="text-accent" />,
        },
    ];

    const io = [
        { label: "Sensor Inputs", items: ["Temperature (°C)", "Humidity (%)", "pH Level", "Nitrogen (mg/L)", "Phosphorus (mg/L)", "Potassium (mg/L)", "Light (lux)"], color: "bg-blue-500/10 text-blue-400" },
        { label: "AI Recommendations", items: ["Nutrient Dosing (ml)", "Mist Interval (min)", "Growth Probability", "Stress Level Detection"], color: "bg-primary/10 text-primary" },
    ];

    return (
        <main className="pt-20">
            <Section>
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-primary/10 rounded-3xl border border-primary/20">
                            <BrainCircuit size={48} className="text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl lg:text-7xl font-bold mb-6">The <span className="text-gradient">AI Engine</span></h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        HY-ARIA's intelligence is powered by a Scikit-learn backend, trained on over 100,000 synthetic
                        data points optimized for elite aeroponic yields.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold mb-8">Model Implementation</h2>
                        {models.map((model, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 10 }}
                                className="p-8 glass rounded-3xl border border-white/5 flex gap-6 items-start"
                            >
                                <div className="p-4 bg-white/5 rounded-2xl">{model.icon}</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                                    <p className="text-text-muted text-sm leading-relaxed">{model.use}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="glass p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute inset-0 bg-primary/5 blur-[100px]" />
                        <h2 className="text-3xl font-bold mb-10 relative z-10 text-center">Data Pipeline</h2>

                        <div className="grid grid-cols-2 gap-8 relative z-10">
                            {io.map((col, i) => (
                                <div key={i} className="space-y-4">
                                    <div className={`text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full w-fit ${col.color}`}>
                                        {col.label}
                                    </div>
                                    <ul className="space-y-4">
                                        {col.items.map((item, j) => (
                                            <li key={j} className="text-sm font-medium flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent relative z-10" />
                        <p className="mt-8 text-xs text-center text-text-muted italic relative z-10">
                            Backend Architecture: FastAPI + Scikit-Learn | Model Persistence: Pickle
                        </p>
                    </div>
                </div>

                <div className="glass p-10 rounded-[2.5rem] border border-white/10 mb-20">
                    <h3 className="text-2xl font-bold mb-6">API Prediction Workflow</h3>
                    <div className="bg-black/50 p-6 rounded-2xl font-mono text-xs overflow-x-auto text-primary">
                        <pre className="whitespace-pre-wrap">{`// Request to AI Pipeline
POST http://localhost:8000/predict
{
  "temperature": 28.5,
  "humidity": 65.0,
  "ph": 6.2,
  "nitrogen": 120.0,
  "phosphorus": 80.0,
  "potassium": 60.0,
  "light_intensity": 32000.0
}

// AI Optimization Response:
{
  "optimization": {
    "nutrient_dose_ml": 4.12,
    "mist_interval_min": 15.4,
    "crop_health_status": "Healthy",
    "confidence": 0.96
  }
}`}</pre>
                    </div>
                </div>
            </Section>

            <Section className="bg-bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureMini icon={<Zap />} title="Nutrient Optimization" />
                    <FeatureMini icon={<Activity />} title="Growth Prediction" />
                    <FeatureMini icon={<ShieldAlert />} title="Anomaly Detection" />
                    <FeatureMini icon={<Thermometer />} title="Climate Adjustment" />
                </div>
            </Section>
        </main>
    );
}

function FeatureMini({ icon, title }: any) {
    return (
        <div className="p-8 rounded-3xl bg-bg-dark border border-white/5 text-center flex flex-col items-center group hover:border-primary/50 transition-colors">
            <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{icon}</div>
            <h4 className="font-bold text-sm tracking-tight">{title}</h4>
        </div>
    );
}
