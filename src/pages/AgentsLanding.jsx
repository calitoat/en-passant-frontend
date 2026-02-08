import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Bot, Shield, Code, Key, Cpu, Terminal } from 'lucide-react';
import EnlistForm from '../components/EnlistForm';
import RookIcon from '../components/icons/RookIcon';

export default function AgentsLanding() {
    const [searchParams] = useSearchParams();
    const source = searchParams.get('source') || 'organic';
    const [stats, setStats] = useState({ total: 2500, byVertical: { agents: 400 } });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${apiUrl}/api/waitlist/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.log('Stats fetch failed, using defaults'));
    }, []);

    const features = [
        {
            icon: Key,
            title: "Agent Rank Guards",
            description: "Deploy cryptographically signed credentials that prove your AI agent is operating on behalf of a verified human."
        },
        {
            icon: Shield,
            title: "Human-Backed Authority",
            description: "Your EP Score transfers to your agents. Platforms know exactly who's responsible for the AI's actions."
        },
        {
            icon: Code,
            title: "Simple Integration",
            description: "Add agent authorization to Claude, GPT, or custom agents with a few lines of code."
        }
    ];

    const useCases = [
        {
            title: "Automated Outreach",
            description: "Let your AI send emails and messages without getting flagged as spam or blocked."
        },
        {
            title: "API Access",
            description: "Give your agents verified credentials to access APIs that require human authorization."
        },
        {
            title: "Form Submissions",
            description: "Authorize agents to fill out applications, bookings, and requests on your behalf."
        }
    ];

    const codeExample = `// Authorize your AI agent with En Passant
import { EnPassant } from '@enpassant/sdk';

const ep = new EnPassant({ apiKey: 'ep_...' });

// Deploy an Agent Rank Guard
const rankGuard = await ep.deployRankGuard({
  agent: 'claude-3',
  scope: ['email', 'calendar'],
  expiresIn: '24h'
});

// Attach to agent requests
agent.setCredentials(rankGuard.token);`;

    return (
        <div className="min-h-screen bg-chess-black">
            {/* Grid pattern overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #d4af37 1px, transparent 1px),
                        linear-gradient(to bottom, #d4af37 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary-500/20 bg-chess-black/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                            <RookIcon className="w-6 h-6 text-chess-black" />
                        </div>
                        <span className="text-xl font-bold text-cream-300">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <a href="#waitlist" className="px-4 py-2 bg-primary-500 text-chess-black rounded-lg font-medium hover:bg-primary-400 transition-colors">
                            Join Waitlist
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-28 pb-16 px-4 md:px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6"
                    >
                        <Bot className="w-4 h-4 text-primary-400" />
                        <span className="text-sm font-semibold text-primary-300">AGENT AUTHORIZATION</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-cream-300 mb-6"
                    >
                        These Are The Droids{' '}
                        <span className="text-primary-400">You're Looking For</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-cream-500 mb-10 max-w-2xl mx-auto"
                    >
                        Your AI agents need credentials too. En Passant lets you authorize Claude, GPT,
                        and custom agents to act on your behalf with cryptographically verified identity.
                    </motion.p>

                    {/* Enlist Form */}
                    <motion.div
                        id="waitlist"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-lg mx-auto scroll-mt-24"
                    >
                        <EnlistForm
                            vertical="agents"
                            source={source}
                            ctaText="GET AGENT API ACCESS"
                            subtitle="Early access to Rank Guard SDK for developers"
                            theme="dark"
                            showPreVerification={false}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4 md:px-6 bg-chess-dark">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-cream-300 text-center mb-4">
                        Authorize Your AI Fleet
                    </h2>
                    <p className="text-cream-500 text-center mb-12 text-lg">Your move, automated</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-chess-black/50 border border-primary-500/20 rounded-2xl p-6 hover:border-primary-500/40 transition-all"
                            >
                                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold text-cream-300 mb-2">{feature.title}</h3>
                                <p className="text-cream-500">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Code Example */}
            <section className="py-20 px-4 md:px-6 bg-chess-black">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Terminal className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-cream-300 mb-4">
                            Simple SDK Integration
                        </h2>
                        <p className="text-cream-500">Add agent authorization in minutes</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-chess-dark border border-primary-500/30 rounded-2xl overflow-hidden"
                    >
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-primary-500/20 bg-chess-black/50">
                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                            <span className="ml-2 text-sm text-cream-600">agent-setup.js</span>
                        </div>
                        <pre className="p-6 overflow-x-auto">
                            <code className="text-sm text-cream-400 font-mono">
                                {codeExample}
                            </code>
                        </pre>
                    </motion.div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 px-4 md:px-6 bg-chess-dark">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-cream-300 text-center mb-4">
                        What Agents Can Do With En Passant
                    </h2>
                    <p className="text-cream-500 text-center mb-12">Legitimate automation, verified</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-chess-black">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-cream-300 mb-2">{useCase.title}</h3>
                                <p className="text-cream-500">{useCase.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-6 bg-chess-black border-t border-primary-500/20">
                <div className="max-w-2xl mx-auto text-center">
                    <Cpu className="w-12 h-12 text-primary-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-cream-300 mb-4">
                        Join {stats.byVertical?.agents?.toLocaleString() || '400'} Developers
                    </h2>
                    <p className="text-xl text-cream-500 mb-8">
                        Building the future of authorized AI
                    </p>
                    <EnlistForm
                        vertical="agents"
                        source={`${source}-footer`}
                        ctaText="GET SDK ACCESS"
                        subtitle="Launch day priority for developers"
                        theme="dark"
                        showPreVerification={false}
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 md:px-6 bg-chess-black border-t border-primary-500/10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-cream-700 text-sm">
                        Powered by <Link to="/" className="text-primary-400 hover:text-primary-300 font-semibold">En Passant</Link>
                    </p>
                    <div className="flex items-center gap-6 text-sm text-cream-600">
                        <Link to="/privacy" className="hover:text-cream-300">Privacy</Link>
                        <Link to="/terms" className="hover:text-cream-300">Terms</Link>
                        <a href="#" className="hover:text-cream-300">API Docs</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
