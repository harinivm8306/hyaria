"use client";

import { useEffect, useState } from "react";
import Section from "@/components/Section";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, ComposedChart
} from "recharts";
import {
    Thermometer, Droplets, Activity, Zap, ShieldCheck, AlertTriangle,
    RefreshCw, Waves, Brain, Clock, Sprout, Timer, Sun, Moon, Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Provided ThinkSpeak Credentials
const CHANNEL_ID = "2899533";
const READ_KEY = "DDZAY6CB184NH6FH";

// Exact Colors from Provided Code
const COLORS = {
    air_temp: "#3498db",
    water_temp: "#2ecc71",
    humidity: "#9b59b6",
    pump: "#e74c3c",
};

export default function Dashboard() {
    const [data, setData] = useState<any[]>([]);
    const [latest, setLatest] = useState<any>(null);
    const [aiResult, setAiResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }
    };

    const fetchData = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const res = await fetch(`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_KEY}&results=40`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const json = await res.json();

            if (!res.ok || !json.feeds) throw new Error("API Limit reached");

            const feeds = json.feeds.map((f: any) => ({
                time: new Date(f.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                temp: parseFloat(f.field2) || 0,
                hum: parseFloat(f.field1) || 0,
                waterTemp: parseFloat(f.field3) || 0,
                pump: parseInt(f.field4) || 0,
            }));

            setData(feeds);
            if (feeds.length > 0) {
                const last = feeds[feeds.length - 1];
                setLatest(last);
                getAIRecommendation(last);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const getAIRecommendation = async (sensorData: any) => {
        try {
            const res = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    temperature: sensorData.temp,
                    humidity: sensorData.hum,
                    ph: 6.2,
                    nitrogen: 120,
                    phosphorus: 80,
                    potassium: 60,
                    light_intensity: 35000,
                    days_planted: 15
                })
            });
            setAiResult(await res.json());
        } catch (err) { }
    };

    useEffect(() => {
        fetchData();
        const dataInterval = setInterval(fetchData, 15000);
        const timeInterval = setInterval(() => setCurrentTime(new Date().toLocaleString()), 1000);
        document.documentElement.classList.add("dark");
        return () => {
            clearInterval(dataInterval);
            clearInterval(timeInterval);
        };
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-bg-dark">
            <RefreshCw className="animate-spin text-primary" size={64} />
        </div>
    );

    return (
        <main className="pt-24 pb-12 min-h-screen transition-all duration-700 bg-background text-foreground">
            <Section>
                {/* Minimal Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Live IoT Link Active</span>
                        </div>
                        <h1 className="text-7xl font-black tracking-tight leading-none uppercase italic">
                            HY-ARIA <span className="text-primary not-italic">Dashboard</span>
                        </h1>
                        <p className="text-sm font-semibold text-text-muted flex items-center gap-4">
                            <span className="flex items-center gap-1.5"><Database size={14} /> ThinkSpeak Channel {CHANNEL_ID}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {currentTime}</span>
                        </p>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-6 glass rounded-[2.5rem] hover:scale-105 transition-all shadow-xl group"
                    >
                        {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
                    </button>
                </div>

                {/* Simplified Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <SimpleMetric icon={<Droplets />} label="Humidity" value={`${latest?.hum?.toFixed(1)}%`} color={COLORS.humidity} />
                    <SimpleMetric icon={<Thermometer />} label="Air Temp" value={`${latest?.temp?.toFixed(1)}°C`} color={COLORS.air_temp} />
                    <SimpleMetric icon={<Waves />} label="Water Temp" value={`${latest?.waterTemp?.toFixed(1)}°C`} color={COLORS.water_temp} />
                    <PumpIndicator active={latest?.pump === 1} />
                </div>

                {/* Main Content Layout */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* The One Simple Professional Chart */}
                        <div className="glass p-10 rounded-[3rem] border border-white/5 h-[500px]">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-black uppercase tracking-widest text-foreground">Atmospheric Trends</h3>
                                <div className="flex gap-4 text-[10px] font-bold text-text-muted">
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: COLORS.humidity }} /> Humidity</div>
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: COLORS.air_temp }} /> Air</div>
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: COLORS.water_temp }} /> Water</div>
                                </div>
                            </div>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="5 5" stroke="var(--grid-color)" vertical={false} opacity={0.3} />
                                        <XAxis dataKey="time" hide />
                                        <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--glass-border)', borderRadius: '1.5rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' }}
                                            labelStyle={{ display: 'none' }}
                                        />
                                        <Line name="Humidity" type="monotone" dataKey="hum" stroke={COLORS.humidity} strokeWidth={3} dot={false} animationDuration={1000} />
                                        <Line name="Air Temp" type="monotone" dataKey="temp" stroke={COLORS.air_temp} strokeWidth={3} dot={false} animationDuration={1000} />
                                        <Line name="Water Temp" type="monotone" dataKey="waterTemp" stroke={COLORS.water_temp} strokeWidth={3} dot={false} animationDuration={1000} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Hardware Pulse Log (Simple) */}
                        <div className="glass p-8 rounded-[2.5rem] border border-white/5 h-[200px]">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 opacity-40">Hardware Actuators</h3>
                            <div className="h-20">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <Area type="stepAfter" dataKey="pump" stroke={COLORS.pump} fill={COLORS.pump} fillOpacity={0.1} strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* AI Insights (Neat Sidebar) */}
                    <div className="space-y-6">
                        <div className="glass p-10 rounded-[3rem] border border-primary/20 bg-primary/5 min-h-[400px] flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-foreground">
                                    <Brain className="text-primary" /> AI Advice
                                </h3>
                                <div className="space-y-4">
                                    <InsightRow icon={<Sprout className="text-emerald-400" />} label="Stage" value={aiResult?.optimization?.current_stage || "---"} />
                                    <InsightRow icon={<ShieldCheck className="text-primary" />} label="Health" value={aiResult?.optimization?.crop_health_status || "---"} />
                                    <InsightRow icon={<Zap className="text-yellow-400" />} label="Dose" value={`${aiResult?.optimization?.nutrient_dose_ml || "--"} ml`} />
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/5">
                                <p className="text-sm font-medium leading-relaxed italic text-text-muted">
                                    "{aiResult?.recommendation || "Analyzing current telemetrics for optimization..."}"
                                </p>
                            </div>
                        </div>

                        <div className="glass p-10 rounded-[3rem] border border-white/5">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40 mb-4">Integrations</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold">ThinkSpeak SSL</span>
                                <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase rounded">Secure</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}

function SimpleMetric({ icon, label, value, color }: any) {
    return (
        <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
            <div className="p-4 bg-white/5 rounded-2xl" style={{ color }}>{icon}</div>
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{label}</h4>
                <div className="text-3xl font-black text-foreground">{value}</div>
            </div>
        </div>
    );
}

function PumpIndicator({ active }: any) {
    return (
        <div className={`p-8 rounded-[2.5rem] border flex items-center gap-6 transition-all ${active ? 'bg-primary/10 border-primary/20' : 'glass'}`}>
            <div className={`p-4 rounded-2xl ${active ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted'}`}><Zap /></div>
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Pump</h4>
                <div className={`text-3xl font-black ${active ? 'text-primary' : 'text-foreground'}`}>{active ? "Running" : "Idle"}</div>
            </div>
        </div>
    );
}



function PumpCard({ active }: { active: boolean }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-8 rounded-[2.5rem] border transition-all ${active ? 'bg-primary/5 border-primary/20' : 'bg-white/[0.02] border-white/5'}`}
        >
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3.5 rounded-2xl ${active ? 'bg-primary/20' : 'bg-white/5'}`}>
                    <Zap className={active ? 'text-primary' : 'text-text-muted'} />
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${active ? 'bg-primary animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-white/20'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Pulse</span>
                </div>
            </div>
            <h4 className="text-xs font-bold text-text-muted mb-1 uppercase tracking-widest">Actuator Status</h4>
            <div className={`text-4xl font-black mb-2 tracking-tight ${active ? 'text-primary' : 'text-white'}`}>
                {active ? "Misting" : "Standby"}
            </div>
            <p className="text-[10px] font-bold text-text-muted/60">Pump logic: AI-Gated PWM</p>
        </motion.div>
    );
}

function HealthStatusCard({ status, confidence }: any) {
    const isOptimal = status === "Optimal" || status === "Healthy";
    return (
        <div className={`p-8 rounded-[2.5rem] border flex items-center justify-between ${isOptimal ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-primary/10 border-primary/20'}`}>
            <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">Crop Vigor</h4>
                <div className={`text-2xl font-black ${isOptimal ? 'text-emerald-400' : 'text-primary'}`}>{status}</div>
                <p className="text-[10px] font-bold text-text-muted mt-1">{(confidence * 100).toFixed(1)}% AI Integrity</p>
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isOptimal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary/20 text-primary'}`}>
                {isOptimal ? <ShieldCheck size={28} /> : <AlertTriangle size={28} />}
            </div>
        </div>
    );
}

function InsightRow({ icon, label, value }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl border border-white/5 transition-colors">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
                <span className="text-xs font-bold text-text-muted">{label}</span>
            </div>
            <span className="text-sm font-black text-white">{value}</span>
        </div>
    );
}

function MetadataItem({ label, value }: any) {
    return (
        <div className="flex justify-between items-center text-[10px]">
            <span className="text-text-muted font-bold">{label}</span>
            <span className="text-white/60 font-mono">{value}</span>
        </div>
    );
}
