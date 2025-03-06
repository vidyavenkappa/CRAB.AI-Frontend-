import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.css"; // We'll create this CSS file separately

export default function Home() {
    useEffect(() => {
        document.title = "CRAB.AI - AI-Powered Academic Paper Review";
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delayChildren: 0.3, staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    // Features section content
    const features = [
        {
            icon: "🔍",
            title: "Multi-Model Analysis",
            description: "Leveraging 5 distinct LLMs (Gemini, Claude, ChatGPT, DeepSeek, and Perplexity AI) for comprehensive paper evaluation."
        },
        {
            icon: "⏱️",
            title: "Rapid Turnaround",
            description: "Reduces review time from 3-4 months to just 1-2 weeks with automated, objective assessments."
        },
        {
            icon: "🎯",
            title: "Customizable Reviews",
            description: "Select the number of AI reviews and tailor evaluation criteria to match specific conference standards."
        },
        {
            icon: "📊",
            title: "Structured Feedback",
            description: "Detailed insights on technical soundness, novelty, clarity, and reproducibility to boost acceptance chances."
        }
    ];

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                {/* Background decoration */}
                <div className="bg-decoration">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center-mobile"
                            >
                                <motion.h1
                                    className="main-heading"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    CRAB.AI
                                </motion.h1>
                                <motion.p
                                    className="sub-heading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    AI-Powered Academic Paper Reviews
                                </motion.p>
                                <motion.p
                                    className="description"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    Streamline your academic paper submissions with our advanced AI-driven review system. Get expert feedback in days, not months.
                                </motion.p>
                                <motion.div
                                    className="button-group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="primary-button"
                                    >
                                        Get Started
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="secondary-button"
                                    >
                                        Watch Demo
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </div>

                        <div className="hero-image-container">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="image-wrapper"
                            >
                                {/* Main illustration */}
                                <div className="main-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=2070"
                                        alt="Academic research papers"
                                    />
                                    <div className="image-overlay"></div>
                                </div>

                                {/* Floating elements */}
                                <motion.div
                                    className="float-card float-card-1"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                >
                                    <div className="emoji">📝</div>
                                    <div className="float-card-content">
                                        <div className="float-card-title">4.8/5</div>
                                        <div className="float-card-subtitle">Average Score</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="float-card float-card-2"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                >
                                    <div className="emoji">⚡</div>
                                    <div className="float-card-content">
                                        <div className="float-card-title">1-2 Weeks</div>
                                        <div className="float-card-subtitle">Fast Turnaround</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="stat-item"
                        >
                            <div className="stat-number">5</div>
                            <div className="stat-label">AI Models</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="stat-item"
                        >
                            <div className="stat-number">2x</div>
                            <div className="stat-label">Faster Feedback</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="stat-item"
                        >
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Objective Analysis</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="stat-item"
                        >
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Availability</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="section-title">Streamline Your Academic Reviews</h2>
                        <p className="section-description">
                            Our AI-driven system automates structured paper assessments using multiple LLMs for comprehensive, expert-like feedback.
                        </p>
                    </motion.div>

                    <motion.div
                        className="features-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-card"
                                variants={itemVariants}
                                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="section-title">How CRAB.AI Works</h2>
                        <p className="section-description">
                            A simple three-step process to get comprehensive AI-powered reviews for your academic papers.
                        </p>
                    </motion.div>

                    <div className="steps-grid">
                        <motion.div
                            className="step-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="step-number">1</div>
                            <h3 className="step-title">Upload Your Paper</h3>
                            <p className="step-description">Submit your research paper through our secure platform. Select specific conferences or journals if desired.</p>
                        </motion.div>

                        <motion.div
                            className="step-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="step-number">2</div>
                            <h3 className="step-title">AI-Powered Analysis</h3>
                            <p className="step-description">Our system processes your paper through five distinct LLMs, generating comprehensive feedback and evaluations.</p>
                        </motion.div>

                        <motion.div
                            className="step-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="step-number">3</div>
                            <h3 className="step-title">Receive Detailed Feedback</h3>
                            <p className="step-description">Get structured insights on technical soundness, novelty, clarity, and reproducibility to improve your submission.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* User Groups Section */}
            <section className="user-groups-section">
                <div className="container">
                    <div className="user-groups-grid">
                        <div className="user-groups-content">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="section-title">Built for Scholars and Reviewers</h2>
                                <p className="section-description">
                                    Our platform offers specialized features for both paper authors and conference reviewers, with a user-friendly interface designed for each role.
                                </p>

                                <div className="user-features">
                                    <div className="user-feature">
                                        <div className="check-icon">
                                            <svg viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="user-feature-content">
                                            <h3 className="user-feature-title">For Authors</h3>
                                            <p className="user-feature-description">Submit up to five research papers, receive AI-generated feedback, and submit to specific conferences.</p>
                                        </div>
                                    </div>

                                    <div className="user-feature">
                                        <div className="check-icon">
                                            <svg viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="user-feature-content">
                                            <h3 className="user-feature-title">For Reviewers</h3>
                                            <p className="user-feature-description">Define reviewing guidelines, view paper summaries, analyze AI-generated reviews, and make acceptance decisions.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="user-image-container"
                        >
                            <div className="user-image">
                                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070" alt="Team collaboration" />
                                <div className="image-overlay"></div>
                            </div>

                            {/* Stats card overlay */}
                            <motion.div
                                className="stats-card"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                                <h3 className="stats-card-title">Time Saved</h3>
                                <div className="progress-container">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: "75%" }}></div>
                                    </div>
                                    <span className="progress-value">75%</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <motion.h2
                            className="cta-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Ready to Streamline Your Paper Review Process?
                        </motion.h2>
                        <motion.p
                            className="cta-description"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Join scholars and conference organizers who are already saving time and improving paper quality with our AI-powered review system.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cta-button"
                            >
                                Get Started Today
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}