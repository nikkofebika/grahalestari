import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Building2, Check, CheckCircle, MessageSquare, Moon, Rocket, Star, Sun, Users, Wallet } from "lucide-react";
import { useState } from "react";

// Landing page single-file version with small internal subcomponents to keep things grouped.
// Save this file as: resources/js/Pages/Landing/Index.jsx

function Feature({ icon: Icon, label }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1 text-primary/90 dark:text-primary-400">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="font-medium text-slate-800 dark:text-slate-100">{label}</p>
            </div>
        </div>
    );
}

function PricingCard({ plan, primary = false }) {
    return (
        <Card className={`border ${primary ? "border-primary bg-gradient-to-b from-white/80 to-primary/5" : ""}`}>
            <CardHeader className="text-center">
                <plan.icon className="h-10 w-10 mx-auto text-primary" />
                <CardTitle className="text-2xl font-bold mt-2">{plan.name}</CardTitle>
                <p className="text-xl mt-2 font-semibold">{plan.price}</p>
                {plan.trial && <p className="text-sm text-green-600 font-medium mt-1">Termasuk Uji Coba 14 Hari</p>}
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 mb-6">
                    {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <Check className="h-4 w-4 text-green-600" /> {f}
                        </li>
                    ))}
                </ul>
                <Link href={`/register?plan=${plan.name.toLowerCase()}`}>
                    <Button className="w-full" variant={primary ? "default" : "outline"}>
                        Pilih Paket
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

export default function LandingIndex() {
    const [dark, setDark] = useState(false);

    const features = [
        { icon: Users, label: "Manajemen Data Warga (RT/RW)" },
        { icon: Wallet, label: "Iuran Warga & Pembayaran Online" },
        { icon: MessageSquare, label: "Aduan Masyarakat" },
        { icon: Building2, label: "Pengumuman & Broadcast" },
        { icon: Rocket, label: "Fitur Akuntansi Kas RT/RW" },
        { icon: Star, label: "Multi-tenant SAAS — Workspace per RT/RW" },
    ];

    const plans = [
        {
            name: "Basic",
            price: "Rp49.000/bulan",
            trial: true,
            icon: Star,
            features: ["Manajemen Warga", "Pengumuman", "Aduan Warga", "Iuran Warga"],
        },
        {
            name: "Pro",
            price: "Rp99.000/bulan",
            trial: false,
            icon: Rocket,
            features: ["Semua fitur Basic", "Akuntansi Kas RT/RW", "Export Laporan", "Notifikasi WhatsApp"],
        },
        {
            name: "Enterprise",
            price: "Rp199.000/bulan",
            trial: false,
            icon: CheckCircle,
            features: ["Semua fitur Pro", "Custom Domain", "Support Prioritas", "Integrasi Pihak Ketiga"],
        },
    ];

    const faq = [
        {
            q: "Apakah aplikasi ini bisa untuk banyak RT dan RW?",
            a: "Ya. Setiap RT dan RW akan mendapatkan workspace terpisah dalam sistem multi-tenant kami.",
        },
        {
            q: "Apakah tersedia uji coba gratis?",
            a: "Ya. Paket Basic memiliki uji coba 14 hari untuk mencoba semua fitur dasarnya.",
        },
        {
            q: "Apakah bisa upgrade kapan saja?",
            a: "Tentu. Upgrade dapat dilakukan kapan saja tanpa mengganggu data yang sudah ada.",
        },
    ];

    return (
        <>
            <Head>
                <title>WargaSuite — Manajemen Warga RT & RW</title>
                <meta name="description" content="WargaSuite — aplikasi SAAS untuk manajemen RT & RW: administrasi, iuran, aduan, akuntansi, dan pengumuman dalam satu platform." />
                <meta name="keywords" content="RT, RW, manajemen warga, aplikasi iuran, SAAS, iuran warga, aduan masyarakat" />
                <meta property="og:title" content="WargaSuite — Manajemen Warga RT & RW" />
                <meta property="og:description" content="Aplikasi SAAS lengkap untuk RT & RW: data warga, iuran, aduan, akuntansi, dan pengumuman." />
            </Head>

            <div className={`${dark ? "dark" : ""}`}>
                <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
                    {/* top nav */}
                    <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="rounded-full bg-primary/10 p-2 dark:bg-primary/20">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div className="font-bold text-lg text-slate-800 dark:text-slate-100">WargaSuite</div>
                        </Link>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setDark((s) => !s)}
                                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                                aria-label="toggle dark mode"
                            >
                                {dark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
                            </button>
                            <Link href="/login">
                                <Button variant="ghost">Masuk</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Daftar</Button>
                            </Link>
                        </div>
                    </nav>

                    {/* HERO */}
                    <section className="w-full py-24">
                        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight"
                                >
                                    Platform Modern untuk Manajemen Warga RT & RW
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl"
                                >
                                    Kelola administrasi, iuran, aduan, dan keuangan RT/RW secara terpusat dan mudah
                                    — cocok untuk RT kecil hingga jaringan wilayah yang besar.
                                </motion.p>

                                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                    <Link href="/register?plan=basic">
                                        <Button size="lg" className="px-8">Mulai Uji Coba 14 Hari</Button>
                                    </Link>
                                    <Link href="/#pricing">
                                        <Button variant="outline" size="lg" className="px-8">Lihat Paket</Button>
                                    </Link>
                                </div>

                                <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                                    <strong>Trial 14 hari</strong> — Tidak perlu kartu kredit. Batalkan kapan saja.
                                </div>
                            </div>

                            {/* Illustration area (simple SVG / placeholder) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="flex justify-center"
                            >
                                <div className="w-full max-w-md bg-gradient-to-b from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg">
                                    {/* Simple illustration using Tailwind shapes */}
                                    <div className="h-56 flex items-center justify-center">
                                        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0" y="0" width="220" height="140" rx="12" fill="url(#g)" />
                                            <defs>
                                                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                                                    <stop offset="0%" stopColor="#EEF2FF" />
                                                    <stop offset="100%" stopColor="#FFFFFF" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
                                        Dashboard ringkas — data warga, iuran, dan notifikasi dalam satu tampilan.
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* FEATURES */}
                    <section className="py-16 border-t border-b border-slate-100 dark:border-slate-800">
                        <div className="max-w-6xl mx-auto px-6">
                            <h3 className="text-2xl font-semibold text-center mb-8 text-slate-900 dark:text-slate-100">Kenapa pilih WargaSuite?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {features.map((f, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                                        <Card className="p-6">
                                            <div className="flex items-center gap-4">
                                                <f.icon className="h-10 w-10 text-primary" />
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{f.label}</p>
                                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Fitur yang intuitif dan mudah dipakai untuk pengurus RT/RW.</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* PRICING */}
                    <section id="pricing" className="py-16">
                        <div className="max-w-6xl mx-auto px-6">
                            <h3 className="text-2xl font-semibold text-center mb-8 text-slate-900 dark:text-slate-100">Pilih Paket Berlangganan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {plans.map((p, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                        <PricingCard plan={p} primary={p.name === "Pro"} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* TESTIMONIALS */}
                    <section className="py-16 bg-slate-50 dark:bg-slate-800">
                        <div className="max-w-6xl mx-auto px-6 text-center">
                            <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Apa Kata Pengguna</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.08 }} className="p-6 border rounded-xl bg-white dark:bg-slate-900 shadow">
                                        <p className="text-slate-700 dark:text-slate-300 italic">“Aplikasi ini sangat membantu RT kami. Administrasi jadi jauh lebih rapi.”</p>
                                        <p className="mt-3 font-semibold text-slate-900 dark:text-slate-100">Ketua RT 0{i}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="py-16">
                        <div className="max-w-4xl mx-auto px-6">
                            <h3 className="text-2xl font-semibold text-center mb-6 text-slate-900 dark:text-slate-100">Pertanyaan yang Sering Diajukan</h3>
                            <Accordion type="single" collapsible>
                                {faq.map((f, i) => (
                                    <AccordionItem key={i} value={`item-${i}`}>
                                        <AccordionTrigger>{f.q}</AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-slate-700 dark:text-slate-300">{f.a}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-12 bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-slate-900">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-slate-100">Siap mulai mengelola RT/RW Anda?</h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-6">Daftar sekarang dan dapatkan uji coba 14 hari pada paket Basic.</p>
                            <Link href="/register?plan=basic">
                                <Button size="lg">Mulai Uji Coba 14 Hari Gratis</Button>
                            </Link>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="py-6 text-center text-slate-500 dark:text-slate-400">
                        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Users className="h-6 w-6 text-primary" />
                                <div className="font-semibold">WargaSuite</div>
                            </div>
                            <div className="text-sm">© {new Date().getFullYear()} WargaSuite — All rights reserved.</div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
