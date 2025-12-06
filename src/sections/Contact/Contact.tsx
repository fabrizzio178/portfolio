import { useState } from 'react'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { Button } from '../../components/UI/Button'
import { Mail, Linkedin, Github, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

export function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    // IMPORTANTE: En Vite, las variables de entorno deben empezar con VITE_
    // Asegurate de que en tu archivo .env diga: VITE_FORM_ACCESS_KEY=tu-clave-aca
    const ACCESS_KEY = import.meta.env.VITE_FORM_ACCESS_KEY;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.name || !form.email || form.message.length < 5) {
            alert("Por favor completá todos los campos.");
            return;
        }

        if (!ACCESS_KEY) {
            console.error("Falta la VITE_FORM_ACCESS_KEY en el archivo .env");
            setStatus('error');
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    subject: `Nuevo contacto de ${form.name} (Portfolio)`,
                    from_name: "Portfolio Web"
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error("Error Web3Forms:", result);
                setStatus('error');
            }
        } catch (error) {
            console.error("Error de red:", error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="scroll-mt-20 relative pt-4 pb-20 sm:pt-16 sm:pb-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 sm:mb-12">
                    <SectionTitle eyebrow="Contacto" title="Construyamos algo juntos" subtitle="Contame sobre tu propuesta y cómo puedo ayudarte." />
                </div>

                <div className="mt-8 grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-sm lg:grid-cols-2 lg:gap-12 shadow-xl">
                    
                    {/* FORMULARIO */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                                Nombre
                                <input type="text" name="name" value={form.name} onChange={handleChange} required className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="Ej: Juan Pérez" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                                Email
                                <input type="email" name="email" value={form.email} onChange={handleChange} required className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="juan@empresa.com" />
                            </label>
                        </div>

                        <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                            Mensaje
                            <textarea rows={4} name="message" value={form.message} onChange={handleChange} required className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-all resize-none" placeholder="Detalles del proyecto..."></textarea>
                        </label>

                        <div className="pt-2">
                            <Button type="submit" className="w-full sm:w-auto gap-2 cursor-pointer shadow-none active:scale-95 transition-transform" disabled={status === 'submitting'}>
                                {status === 'submitting' ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : <><Send className="w-4 h-4" /> Enviar mensaje</>}
                            </Button>
                        </div>

                        {status === 'success' && (
                            <div className="flex items-start gap-3 text-sm text-emerald-300 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2">
                                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                <div><p className="font-semibold">¡Mensaje enviado!</p><p className="text-emerald-400/80">Gracias por escribirme.</p></div>
                            </div>
                        )}
                        
                        {status === 'error' && (
                             <div className="flex items-start gap-3 text-sm text-rose-300 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 animate-in fade-in slide-in-from-bottom-2">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div><p className="font-semibold">Error al enviar</p><p className="text-rose-400/80">Verificá tu conexión o escribime directo al mail.</p></div>
                            </div>
                        )}
                    </form>

                    {/* INFO CONTACTO (Igual que antes) */}
                    <div className="flex flex-col justify-between space-y-8 border-t border-slate-800 pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Canales Directos</h3>
                                <div className="space-y-5">
                                    <a href="mailto:fabrizziosana10@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-white transition-all group">
                                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all"><Mail className="w-5 h-5" /></div>
                                        <span className="font-medium">fabrizziosana10@gmail.com</span>
                                    </a>
                                    <a href="https://linkedin.com/in/fabrizzio-sana-54511630b" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white transition-all group">
                                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all"><Linkedin className="w-5 h-5" /></div>
                                        <span className="font-medium">LinkedIn Profile</span>
                                    </a>
                                    <a href="https://github.com/fabrizzio178" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white transition-all group">
                                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-slate-500/50 group-hover:bg-white/5 group-hover:text-white transition-all"><Github className="w-5 h-5" /></div>
                                        <span className="font-medium">@fabrizzio178</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700/50">
                            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Disponibilidad</p>
                            <p className="text-sm text-slate-300 leading-relaxed">Respondo dentro de las <strong>48 horas</strong>.<br />Listo para coordinar una entrevista.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}