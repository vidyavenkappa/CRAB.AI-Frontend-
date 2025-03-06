import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import StatCard from "../components/StatCard";
import AnalyticsView from "../components/AnalyticsView";
import { mockPapers } from "../utils/mockData";
import useAnalytics from "../hooks/useAnalytics";
import "./OrganizerDashboard.css"

const OrganizerDashboard = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTimeframe, setActiveTimeframe] = useState("thisYear");
    const [activeView, setActiveView] = useState("overview");
    const [searchQuery, setSearchQuery] = useState("");

    // Analytics hook to process data
    const analytics = useAnalytics(papers);

    // Load mock data
    useEffect(() => {
        setTimeout(() => {
            setPapers(mockPapers);
            setLoading(false);
        }, 1000);
    }, []);

    // Loading and error states
    if (loading) {
        return (
            <div className="home-container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <div className="spinner-border" style={{ color: "#4361ee" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container">
                <div className="container py-5">
                    <div className="alert alert-danger m-5" role="alert">
                        Error loading analytics data: {error}
                    </div>
                </div>
            </div>
        );
    }

    // Search handler
    const handleSearch = (query) => {
        setSearchQuery(query);
        // Implement search logic if needed
    };

    return (
        <div className="home-container">
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="section-title mb-0">Conference Analytics Dashboard</h2>
                    <div className="btn-group me-3">
                        {["thisYear", "lastYear", "allTime"].map(timeframe => (
                            <motion.button
                                key={timeframe}
                                className={`${activeTimeframe === timeframe
                                    ? "primary-button active"
                                    : "secondary-button"}`}
                                onClick={() => setActiveTimeframe(timeframe)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {timeframe === "thisYear" ? "This Year" :
                                    timeframe === "lastYear" ? "Last Year" :
                                        "All Time"}
                            </motion.button>
                        ))}
                    </div>
                    <motion.button
                        className="secondary-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.print()}
                    >
                        <i className="fas fa-download me-2"></i> Export
                    </motion.button>
                </div>

                <div >

                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Search papers, topics, reviewers"
                        className="me-3"
                    />

                </div>

                <div className="row mb-4">
                    {[
                        {
                            title: "Total Papers",
                            value: analytics.totalPapers,
                            description: "Submissions",
                            icon: "fa-file-alt",
                            color: "primary"
                        },
                        {
                            title: "Acceptance Rate",
                            value: `${analytics.acceptRate}%`,
                            description: `${analytics.acceptedPapers} accepted papers`,
                            icon: "fa-check-circle",
                            color: "success"
                        },
                        {
                            title: "Average Score",
                            value: analytics.averageScore,
                            description: "Out of 10",
                            icon: "fa-star",
                            color: "warning"
                        },
                        {
                            title: "Pending Reviews",
                            value: analytics.inReviewPapers,
                            description: "Papers awaiting decision",
                            icon: "fa-hourglass-half",
                            color: "warning"
                        }
                    ].map((stat, index) => (
                        <div key={stat.title} className="col-lg-3 col-md-6 mb-4">
                            <StatCard
                                {...stat}
                                delay={index * 0.1}
                            />
                        </div>
                    ))}
                </div>

                <AnalyticsView
                    activeView={activeView}
                    setActiveView={setActiveView}
                    analytics={analytics}
                />
            </div>
        </div >
    );
};

export default OrganizerDashboard;