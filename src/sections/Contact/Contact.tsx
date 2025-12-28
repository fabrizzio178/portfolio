import { useState } from 'react';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { Button } from '../../components/UI/Button';
import { Mail, Linkedin, Github, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../i18n';

export function Contact() {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const ACCESS_KEY = import.meta.env.VITE_FORM_ACCESS_KEY;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || form.message.length < 5) {
            return;
        }

        if (!ACCESS_KEY) {
            console.error('Missing VITE_FORM_ACCESS_KEY');
            setStatus('error');
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    subject: `New contact from ${form.name} (Portfolio)`,
                    from_name: 'Portfolio Web',
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Network error:', error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
            <div className="section-container">
                <SectionTitle
                    eyebrow={t.contact.eyebrow}
                    title={t.contact.title}
                    subtitle={t.contact.subtitle}
                />

                <div className="mt-12 grid gap-12 lg:grid-cols-2">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-300">
                                    {t.contact.form.name}
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-300">
                                    {t.contact.form.email}
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </label>
                        </div>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-300">
                                {t.contact.form.message}
                            </span>
                            <textarea
                                rows={5}
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                            />
                        </label>

                        <Button
                            type="submit"
                            className="gap-2"
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {t.contact.form.sending}
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    {t.contact.form.send}
                                </>
                            )}
                        </Button>

                        {status === 'success' && (
                            <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                                <CheckCircle2 className="h-5 w-5 shrink-0" />
                                {t.contact.form.success}
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex items-center gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                {t.contact.form.error}
                            </div>
                        )}
                    </form>

                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                {t.contact.direct.title}
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href="mailto:fabrizziosana10@gmail.com"
                                    className="flex items-center gap-4 text-slate-300 hover:text-slate-100 transition-colors"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <span>fabrizziosana10@gmail.com</span>
                                </a>
                                <a
                                    href="https://linkedin.com/in/fabrizzio-sana-54511630b"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-slate-300 hover:text-slate-100 transition-colors"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800">
                                        <Linkedin className="h-5 w-5" />
                                    </div>
                                    <span>LinkedIn</span>
                                </a>
                                <a
                                    href="https://github.com/fabrizzio178"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-slate-300 hover:text-slate-100 transition-colors"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800">
                                        <Github className="h-5 w-5" />
                                    </div>
                                    <span>@fabrizzio178</span>
                                </a>
                            </div>
                        </div>

                        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="text-sm font-medium">{t.contact.availability}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}