import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { mockPapers } from "../utils/mockData";
import './Home.css';
import SearchBar from '../components/SearchBar'; // Make sure the path is correct
import './CustomTabStyles.css';
import axios from "axios";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ReviewerDashboard() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [viewMode, setViewMode] = useState("list"); // "list" or "detail"
    const [activeTab, setActiveTab] = useState("needReview"); // "needReview", "accepted", "rejected"
    const [reviewerNote, setReviewerNote] = useState("");
    const [reviewGuidelines, setReviewGuidelines] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openReview, setOpenReview] = useState('gemini');
    const [openSummary, setOpenSummary] = useState('')
    const [filters, setFilters] = useState({
        topic: "all",
        university: "all",
        region: "all"
    });
    const [openAccordionNumerical, setOpenAccordionNumerical] = useState(true);
    const [openAccordionStructural, setOpenAccordionStructural] = useState(false);
    const [openAccordionFeedback, setOpenAccordionFeedback] = useState(false);
    const [reviewScores, setReviewScores] = useState([])


    const [activeTabGuidelines, setActiveTabGuidelines] = useState("text");

    const handleTabGuidelinesChange = (tab) => {
        setActiveTabGuidelines(tab);
    };

    // Load mock data
    useEffect(() => {
        fetchPapers();
    }, []);
    const calculateScores = (paper) => {
        // console.log("p", paper['reviews']['review'])
        for (let r of paper['reviews']) {
            let ratings = r['review']['reviews'][0]['numerical_ratings']
            let scores = Object.values(ratings).map(rating => rating.score);
            let final_score = scores.reduce((acc, score) => acc + (score * 2), 0) / scores.length
            // console.log(final_score)
            let score_list = reviewScores
            score_list.push(final_score)
            setReviewScores(score_list)
            // console.log(reviewScores)
        }
    }

    const handleViewPaper = (paper) => {
        console.log(paper)
        setSelectedPaper(paper);
        calculateScores(paper);

        // let scores = Object.values(ratings.numerical_ratings).map(rating => rating.score);
        // setReviewScores(scores.reduce((acc, score) => acc + score, 0) / scores.length)



        setViewMode("detail");
        setReviewerNote("");
    };

    const handleBackToList = () => {
        setViewMode("list");
        setReviewScores([])
        setSelectedPaper(null);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleReviewNoteChange = (e) => {
        setReviewerNote(e.target.value);
    };
    const fetchPapers = async () => {
        try {
            const userId = localStorage.getItem("user_id");
            const conferenceId = localStorage.getItem("conference_id");
            const response = await fetch(`${process.env.REACT_APP_API_URL}/reviewer/paper/conference/${conferenceId}/user/${userId}`);
            const data = await response.json();

            setPapers(Array.isArray(data) ? data : []);
            setLoading(false); // ✅ Ensure loading state is updated
        } catch (error) {
            console.error("Failed to load papers", error);
            setPapers([]);
            setLoading(false); // ✅ Prevent infinite loading
        }
    };




    // const handleDecision = (decision) => {
    //     // In a real app, you'd make an API call to update the paper status
    //     const updatedPapers = papers.map(paper => {
    //         if (paper.id === selectedPaper.id) {
    //             return {
    //                 ...paper,
    //                 status: decision === "accept" ? "Accepted" : "Rejected",
    //                 finalDecision: {
    //                     decision: decision === "accept" ? "Accept" : "Reject",
    //                     reviewer: "Dr. Johnson", // This would come from your auth context
    //                     comments: reviewerNote,
    //                     date: new Date().toISOString().split("T")[0]
    //                 }
    //             };
    //         }
    //         return paper;
    //     });

    //     setPapers(updatedPapers);
    //     setSuccessMessage(`Paper "${selectedPaper.title}" has been ${decision === "accept" ? "accepted" : "rejected"}.`);
    //     setShowSuccessAlert(true);
    //     setTimeout(() => {
    //         setShowSuccessAlert(false);
    //         handleBackToList();
    //     }, 3000);
    // };

    const handleDecision = async (decision) => {
        setIsSubmitting(true);

        const payload = {
            paper_id: selectedPaper.id,
            review_text: reviewerNote,
            status: decision === "accept" ? "Accepted" : "Rejected",
        };

        try {
            // await axios.post(`${process.env.REACT_APP_API_URL}/reviewer/review_paper`, payload, {
            //     headers: { "Content-Type": "application/json" },
            // });
            const response = await fetch(`${process.env.REACT_APP_API_URL}/reviewer/paper/conference/${parseInt(localStorage.getItem("conference_id"))}/user/${parseInt(localStorage.getItem("user_id"))}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)

            });
            const data = await response.json();
            console.log("post call", data)
            setPapers(Array.isArray(data) ? data : []);


            setSuccessMessage(`Paper "${selectedPaper.title}" has been ${decision === "accept" ? "accepted" : "rejected"}.`);
            setShowSuccessAlert(true);

            // Refresh the list of papers
            // setPapers((prevPapers) =>
            //     prevPapers.map((paper) =>
            //         paper.id === selectedPaper.id
            //             ? { ...paper, status: payload.status, human_review: payload.review_text }
            //             : paper
            //     )
            // );

            setTimeout(() => {
                setShowSuccessAlert(false);
                handleBackToList();

            }, 3000);
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    // Helper function to get score color
    const getScoreColor = (score) => {
        if (!score) return "";
        if (score >= 8) return "text-success";
        if (score >= 6) return "text-warning";
        return "text-danger";
    };

    // Helper function to calculate average score
    const getAverageScore = (reviews) => {
        if (!reviews || reviews.length === 0) return null;
        const sum = reviews.reduce((acc, review) => acc + parseFloat(review.review.final_score.split("/")[0]), 0);
        return (sum / reviews.length).toFixed(1);
    };

    // Filter papers based on active tab and filters
    const filteredPapers = papers.filter(paper => {
        // Filter by status
        let statusMatch = false;
        if (activeTab === "needReview" && paper.status === "Reviewed") statusMatch = true;
        if (activeTab === "accepted" && paper.status === "Accepted") statusMatch = true;
        if (activeTab === "rejected" && paper.status === "Rejected") statusMatch = true;

        // Filter by topic
        const topicMatch = filters.topic === "all" || paper.topic === filters.topic;

        // Filter by university
        const universityMatch = filters.university === "all" || paper.university === filters.university;

        // Filter by region
        const regionMatch = filters.region === "all" || paper.region === filters.region;

        return statusMatch && topicMatch && universityMatch && regionMatch;
    });

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
                        Error loading papers: {error}
                    </div>
                </div>
            </div>
        );
    }

    // Fade in animation for cards
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };


    const handleSubmitGuidelines = async () => {
        setIsSubmitting(true);
        const payload = {
            user_id: parseInt(localStorage.getItem('user_id')),
            conference_id: localStorage.getItem('conference_id'),
            text: reviewGuidelines
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/conference/upload_guidelines`, payload, {
                headers: { "Content-Type": "application/json" }
            });
            alert("Review guidelines updated successfully!");
        } catch (error) {
            console.error("Error updating guidelines:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleSearch = (query, advancedFilters) => {
        setSearchQuery(query);

        // Modify the filteredPapers logic to include search and advanced filters
        const searchFilteredPapers = papers.filter(paper => {
            // Status filter
            let statusMatch = false;
            if (activeTab === "needReview" && paper.status === "Reviewed") statusMatch = true;
            if (activeTab === "accepted" && paper.status === "Accepted") statusMatch = true;
            if (activeTab === "rejected" && paper.status === "Rejected") statusMatch = true;

            // Topic filter
            const topicMatch = filters.topic === "all" || paper.topic === filters.topic;

            // University filter
            const universityMatch = filters.university === "all" || paper.university === filters.university;

            // Region filter
            const regionMatch = filters.region === "all" || paper.region === filters.region;

            // Search filter
            const searchMatch = !query ||
                paper.title.toLowerCase().includes(query.toLowerCase());
            // ||paper.author.toLowerCase().includes(query.toLowerCase()) ||
            // paper.topic.toLowerCase().includes(query.toLowerCase()); 


            // Advanced filters
            // const authorMatch = !advancedFilters ||
            //     !advancedFilters.author ||
            //     paper.author.toLowerCase().includes(advancedFilters.author.toLowerCase());

            const dateMatch = !advancedFilters ||
                (!advancedFilters.dateFrom || new Date(paper.uploadDate) >= new Date(advancedFilters.dateFrom)) &&
                (!advancedFilters.dateTo || new Date(paper.uploadDate) <= new Date(advancedFilters.dateTo));

            const scoreMatch = !advancedFilters ||
                (!advancedFilters.scoreMin || getAverageScore(paper.reviews) >= parseFloat(advancedFilters.scoreMin)) &&
                (!advancedFilters.scoreMax || getAverageScore(paper.reviews) <= parseFloat(advancedFilters.scoreMax));

            return statusMatch &&
                // topicMatch &&
                // universityMatch &&
                // regionMatch &&
                searchMatch &&
                // authorMatch &&
                dateMatch &&
                scoreMatch;
        });

        // Update the filtered papers for rendering
        const updatedFilteredPapers = searchFilteredPapers;

        // Optional: If you want to create a new state for filtered papers
        // setFilteredPapers(updatedFilteredPapers);

        // If using the existing filteredPapers logic, you'll just use this variable in your render method
    };

    const handleFileGuidelines = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            setReviewGuidelines(e.target.result)
        };
        reader.readAsText(e.target.files[0])
    }

    return (
        <div className="home-container">
            <div className="container py-5">
                {showSuccessAlert && (<motion.div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div className="d-flex align-items-center">
                        <span className="me-8">✓</span>
                        {successMessage}
                    </div>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowSuccessAlert(false)}
                        aria-label="Close"
                    ></button>
                </motion.div>

                )}

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="section-title mb-0">Reviewer Dashboard</h2>
                    {/* <motion.button
                        className="primary-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = "/reviewer-analytics"}
                    >
                        <i className="fas fa-chart-bar me-2"></i> View Analytics
                    </motion.button> */}
                </div>
                <div className=" ">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Search papers by title, author, or topic"
                    />

                </div>

                <div className="row">

                    {/* Sidebar - visible only in list view */}
                    {viewMode === "list" && (

                        <div className="col-lg-3 mb-4">
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <div
                                            className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                background: "linear-gradient(to right, #4361ee, #3a0ca3)",
                                                color: "white",
                                                fontSize: "2rem"
                                            }}
                                        >
                                            {localStorage.getItem('name').charAt(0)}
                                        </div>
                                    </div>
                                    <h5 className="card-title">{localStorage.getItem('name')}</h5>
                                    <p className="card-text text-muted">Reviewer</p>

                                </div>
                            </div>
                            <motion.div
                                className="card border-0 shadow-sm mb-4"
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3 }}
                                variants={fadeInUp}
                            >
                                <div className="card-header bg-white">
                                    <h5 className="mb-0">Filters</h5>
                                </div>
                                <div className="card-body">
                                    {/* <div className="mb-3">
                                        <label className="form-label">Topic</label>
                                        <select
                                            className="form-select"
                                            name="topic"
                                            value={filters.topic}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="all">All Topics</option>
                                            {Array.from(new Set(papers.map(p => p.topic))).map(topic => (
                                                <option key={topic} value={topic}>{topic}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">University</label>
                                        <select
                                            className="form-select"
                                            name="university"
                                            value={filters.university}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="all">All Universities</option>
                                            {Array.from(new Set(papers.map(p => p.university))).map(uni => (
                                                <option key={uni} value={uni}>{uni}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Region</label>
                                        <select
                                            className="form-select"
                                            name="region"
                                            value={filters.region}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="all">All Regions</option>
                                            {Array.from(new Set(papers.map(p => p.region))).map(region => (
                                                <option key={region} value={region}>{region}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Review Guidelines URL</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="Enter URL to conference guidelines"
                                            value={reviewGuidelineUrl}
                                            onChange={handleGuidelineUrlChange}
                                        />
                                        <div className="form-text">
                                            This URL will be used by the AI to follow specific conference review guidelines.
                                        </div>
                                    </div> */}
                                    <div className="mb-3">
                                        <label className="form-label">Review Guidelines</label>
                                        <ul className="nav nav-tabs" id="guidelinesTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${activeTabGuidelines === "text" ? "active" : ""}`}
                                                    id="text-tab"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="text"
                                                    aria-selected={activeTabGuidelines === "text"}
                                                    onClick={() => handleTabGuidelinesChange("text")}
                                                >
                                                    Enter Text
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${activeTabGuidelines === "file" ? "active" : ""}`}
                                                    id="file-tab"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="file"
                                                    aria-selected={activeTabGuidelines === "file"}
                                                    onClick={() => handleTabGuidelinesChange("file")}
                                                >
                                                    Upload File
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content mt-3" id="guidelinesTabContent">
                                            <div className={`tab-pane fade ${activeTabGuidelines === "text" ? "show active" : ""}`} id="text" role="tabpanel" aria-labelledby="text-tab">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Enter conference review guidelines"
                                                    value={reviewGuidelines}
                                                    onChange={(e) => setReviewGuidelines(e.target.value)}
                                                    rows="4"
                                                ></textarea>
                                            </div>
                                            <div className={`tab-pane fade ${activeTabGuidelines === "file" ? "show active" : ""}`} id="file" role="tabpanel" aria-labelledby="file-tab">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => handleFileGuidelines(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-text">
                                            Choose to either enter the review guidelines as text or upload a file. The AI will use this to follow specific conference review guidelines.
                                        </div>
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={handleSubmitGuidelines}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Updating..." : "Update Guidelines"}
                                        </button>
                                    </div>


                                </div>
                            </motion.div>

                            <motion.div
                                className="card border-0 shadow-sm"
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, delay: 0.1 }}
                                variants={fadeInUp}
                            >
                                <div className="card-header bg-white">
                                    <h5 className="mb-0">Quick Stats</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>Total Papers</div>
                                        <div className="badge bg-primary">{papers.length}</div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>Needs Review</div>
                                        <div className="badge bg-warning text-dark">{papers.filter(p => p.status === "Reviewed").length}</div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>Accepted</div>
                                        <div className="badge bg-success">{papers.filter(p => p.status === "Accepted").length}</div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>Rejected</div>
                                        <div className="badge bg-danger">{papers.filter(p => p.status === "Rejected").length}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Main content area */}
                    <div className={`${viewMode === "list" ? "col-lg-9" : "col-12"}`}>
                        {viewMode === "list" ? (
                            <motion.div
                                className="card border-0 shadow-sm mb-4"
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3 }}
                                variants={fadeInUp}
                            >
                                <div className="card-header bg-white">
                                    <ul className="nav nav-tabs card-header-tabs tabs-wrapper">
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link tab-button ${activeTab === "needReview" ? "active" : ""}`}
                                                onClick={() => handleTabChange("needReview")}
                                            >
                                                Need Review
                                                <span className="badge bg-warning text-dark ms-2 tab-badge">
                                                    {papers.filter(p => p.status === "Reviewed").length}
                                                </span>
                                                {activeTab === "needReview" && <div className="tab-indicator"></div>}
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                className={`nav-link tab-button ${activeTab === "accepted" ? "active" : ""}`}
                                                onClick={() => handleTabChange("accepted")}
                                            >
                                                Accepted
                                                <span className="badge bg-warning text-dark ms-2 tab-badge">
                                                    {papers.filter(p => p.status === "Accepted").length}
                                                </span>
                                                {activeTab === "Accepted" && <div className="tab-indicator"></div>}
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                className={`nav-link tab-button ${activeTab === "rejected" ? "active" : ""}`}
                                                onClick={() => handleTabChange("rejected")}
                                            >
                                                Rejected
                                                <span className="badge bg-warning text-dark ms-2 tab-badge">
                                                    {papers.filter(p => p.status === "Rejected").length}
                                                </span>
                                                {activeTab === "Rejected" && <div className="tab-indicator"></div>}
                                            </button>
                                        </li>





                                    </ul>
                                </div>
                                <div className="card-body">
                                    {filteredPapers.length === 0 ? (
                                        <div className="text-center py-5">
                                            <p className="text-muted">No papers found in this category.</p>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        {/* <th>Author</th>
                                                        <th>University</th> */}
                                                        <th>Conference</th>
                                                        {/* <th>Topic</th> */}
                                                        <th>Average Score</th>
                                                        <th>Submitted</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredPapers.map(paper => (
                                                        <tr key={paper.id}>
                                                            <td>{paper.title}</td>
                                                            <td>{paper.conference}</td>
                                                            <td className={getScoreColor(getAverageScore(paper.reviews))}>
                                                                {getAverageScore(paper.reviews) + " / 10" || "N/A"}
                                                            </td>
                                                            <td>{paper.uploadDate}</td>
                                                            <td>
                                                                <motion.button
                                                                    className="primary-button btn-sm"
                                                                    onClick={() => handleViewPaper(paper)}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                >
                                                                    View
                                                                </motion.button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                <motion.button
                                    className="secondary-button mb-4"
                                    onClick={handleBackToList}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="me-2">←</span> Back to All Papers
                                </motion.button>

                                <div className="row">
                                    <div className="col-md-8">
                                        {/* Paper details and reviews */}
                                        <motion.div
                                            className="card border-0 shadow-sm mb-4"
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.3 }}
                                            variants={fadeInUp}
                                        >
                                            <div className="card-header bg-white">
                                                <h4 className="mb-0">{selectedPaper?.title}</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="row mb-4">
                                                    <p>
                                                        <strong>Title:</strong> {selectedPaper?.title}
                                                    </p>
                                                    <p>
                                                        <strong>Conference:</strong> {selectedPaper?.conference}
                                                    </p>

                                                    <div className="col-md-6">

                                                        {/* <p>
                                                            <strong>University:</strong> {selectedPaper?.university}
                                                        </p>
                                                        <p>
                                                            <strong>Region:</strong> {selectedPaper?.region}
                                                        </p> */}
                                                        <p>
                                                            <strong>Submitted:</strong> {selectedPaper?.uploadDate.split('T')[0]}
                                                        </p>
                                                        <p>
                                                            <strong>PDF:</strong>{" "}
                                                            <motion.a
                                                                href={`${process.env.PUBLIC_URL}/uploads/${selectedPaper.pdfUrl}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="secondary-button btn-sm"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <span className="me-1">📄</span> View Paper
                                                            </motion.a>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">


                                                        <p>
                                                            <strong>Average Score:</strong>{" "}
                                                            <span className={getScoreColor(getAverageScore(selectedPaper?.reviews))}>
                                                                {getAverageScore(selectedPaper?.reviews) + " / 10" || "N/A"}
                                                            </span>
                                                        </p>

                                                    </div>
                                                </div>

                                                {/* Paper Summary */}
                                                {selectedPaper?.status === "Reviewed" && <><h5 className="mb-3">Paper Summary <small className="text-muted">(AI-generated)</small></h5>
                                                    <div className="accordion mb-4" id="summaryAccordion">
                                                        {/* {console.log(JSON.parse(selectedPaper.summary))} */}
                                                        {selectedPaper?.summary && Object.entries(selectedPaper.summary).map(([key, value]) => (
                                                            <div className="accordion-item border-0 mb-2 shadow-sm" key={key}>
                                                                <h2 className="accordion-header">
                                                                    <button
                                                                        className="accordion-button collapsed"
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#collapse${key}`}
                                                                        aria-expanded="false"
                                                                        onClick={() => setOpenSummary(key)}

                                                                    >
                                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                                    </button>
                                                                </h2>
                                                                {/* <div
                                                                id={`collapse${key}`}
                                                                className="accordion-collapse collapse"
                                                                data-bs-parent="#summaryAccordion"
                                                            > */}
                                                                {openSummary == key && <div className="accordion-body">
                                                                    {value}
                                                                </div>}
                                                                {/* </div> */}
                                                            </div>
                                                        ))}
                                                    </div></>}

                                                {/* AI Reviews */}
                                                <h5 className="mb-3">AI Reviews</h5>

                                                {selectedPaper?.reviews && selectedPaper.reviews.length > 0 ? (
                                                    <div className="accordion mb-4" id="reviewsAccordion">
                                                        {selectedPaper.reviews.map((review, index) => (
                                                            <div className="accordion-item border-0 mb-3 shadow-sm" key={index}>
                                                                <h2 className="accordion-header">
                                                                    <button
                                                                        className="accordion-button collapsed"
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#collapseReview${index}`}
                                                                        aria-expanded="false"
                                                                        onClick={(index) => { setOpenReview(review.model) }}
                                                                    >
                                                                        <div className="d-flex justify-content-between align-items-center w-100 me-3">
                                                                            <span><strong>{review.model}</strong> Review</span>

                                                                            {reviewScores && reviewScores[index] && (
                                                                                <span className={`badge ${getScoreColor(reviewScores[index])} bg-opacity-10 border ${getScoreColor(reviewScores[index])} text-dark`}>
                                                                                    Score: {reviewScores[index].toFixed(1)}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </button>
                                                                </h2>
                                                                {/*{ openReview == index && <div
                                                                    id={`collapseReview${index}`}
                                                                    className="accordion-collapse collapse"
                                                                    data-bs-parent="#reviewsAccordion"
                                                                >
                                                                    <div className="accordion-body">
                                                                        <p>{review.content}</p>

                                                                        {review.strengths && review.strengths.length > 0 && (
                                                                            <div className="mb-3">
                                                                                <h6 className="text-success">Strengths:</h6>
                                                                                <ul className="mb-0">
                                                                                    {review.strengths.map((strength, i) => (
                                                                                        <li key={i}>{strength}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}

                                                                        {review.weaknesses && review.weaknesses.length > 0 && (
                                                                            <div>
                                                                                <h6 className="text-danger">Weaknesses:</h6>
                                                                                <ul className="mb-0">
                                                                                    {review.weaknesses.map((weakness, i) => (
                                                                                        <li key={i}>{weakness}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>}*/}

                                                                {openReview == review.model && <div key={review.model}>
                                                                    {review.review.reviews.map((review, index) => (
                                                                        <div id={`collapse${index}`} className="accordion-collapse collapse show" data-bs-parent="#reviewsAccordion">
                                                                            <div className="accordion-body">
                                                                                <div className="accordion" id={`subAccordion${index}`}>
                                                                                    {/* Numerical Ratings Section */}
                                                                                    <div className="accordion-item">
                                                                                        <h2 className="accordion-header">
                                                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#numericalRatings${index}`} onClick={() => setOpenAccordionNumerical(!openAccordionNumerical)}>Numerical Ratings</button>
                                                                                        </h2>
                                                                                        {openAccordionNumerical && <div id={`numericalRatings${index}`} className={"accordion-collapse collapse show"} data-bs-parent={`#subAccordion${index}`}>
                                                                                            <div className="accordion-body">

                                                                                                <ResponsiveContainer width="100%" height={400}>
                                                                                                    <RadarChart outerRadius={150} data={Object.entries(review.numerical_ratings).map(([key, value]) => ({ name: key, score: value.score }))}>
                                                                                                        <PolarGrid />
                                                                                                        <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
                                                                                                        <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ visibility: 'hidden' }} />
                                                                                                        <Radar name="Average Score" dataKey="score" stroke="#4361ee" fill="#4361ee" fillOpacity={0.6} />
                                                                                                        <Tooltip />
                                                                                                    </RadarChart>
                                                                                                </ResponsiveContainer>

                                                                                                {Object.entries(review.numerical_ratings).map(([key, value]) => (
                                                                                                    <p key={key}><strong>{key}:</strong> {value.comment}</p>

                                                                                                ))}
                                                                                            </div>
                                                                                        </div>}
                                                                                    </div>

                                                                                    {/* Structured Review Section */}
                                                                                    <div className="accordion-item">
                                                                                        <h2 className="accordion-header">
                                                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#structuredReview${index}`} onClick={() => setOpenAccordionStructural(!openAccordionStructural)}>Structured Review</button>
                                                                                        </h2>
                                                                                        {openAccordionStructural && <div id={`structuredReview${index}`} className="accordion-collapse collapse show" data-bs-parent={`#subAccordion${index}`}>
                                                                                            <div className="accordion-body">
                                                                                                <p><strong>Summary:</strong> {review.structured_review.summary}</p>
                                                                                                <p><strong>Strengths:</strong></p>
                                                                                                <ul>{review.structured_review.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                                                                                <p><strong>Weaknesses:</strong></p>
                                                                                                <ul>{review.structured_review.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
                                                                                                <p><strong>Ethical Considerations:</strong> {review.structured_review.ethical_considerations}</p>
                                                                                            </div>
                                                                                        </div>}
                                                                                    </div>

                                                                                    {/* Actionable Feedback Section */}
                                                                                    <div className="accordion-item">
                                                                                        <h2 className="accordion-header">
                                                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#actionableFeedback${index}`} onClick={() => setOpenAccordionFeedback(!openAccordionFeedback)}>Actionable Feedback</button>
                                                                                        </h2>
                                                                                        {openAccordionFeedback && <div id={`actionableFeedback${index}`} className="accordion-collapse collapse show" data-bs-parent={`#subAccordion${index}`}>
                                                                                            <div className="accordion-body">
                                                                                                <p><strong>Improvement Suggestions:</strong></p>
                                                                                                <ul>{review.actionable_feedback.improvement_suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                                                                                <p><strong>Checklist for Authors:</strong></p>
                                                                                                <ul>{review.actionable_feedback.checklist_for_authors.map((c, i) => <li key={i}>{c}</li>)}</ul>
                                                                                            </div>
                                                                                        </div>}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    ))}
                                                                </div>}
                                                            </div>
                                                        ))}

                                                    </div>
                                                ) : (
                                                    <div className="alert alert-info mb-4">
                                                        No AI reviews available yet. Reviews are typically generated within 24 hours of submission.
                                                    </div>
                                                )}

                                                {/* Previous Reviewer Decision (if any) */}

                                                {selectedPaper?.finalDecision && (
                                                    <div className="mb-4">
                                                        <h5 className="mb-3">Final Decision</h5>
                                                        <div className="card bg-light border-0">
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between mb-3">
                                                                    <h6 className="mb-0">
                                                                        <strong>Reviewer:</strong> {selectedPaper.finalDecision.reviewer}
                                                                    </h6>
                                                                    <span className="text-muted">{selectedPaper.finalDecision.date.split('T')[0]}</span>
                                                                </div>
                                                                <p>{selectedPaper.finalDecision.comments}</p>
                                                                <div className="mt-3">
                                                                    <span>
                                                                        <strong>Decision:</strong>
                                                                        <span className={selectedPaper.finalDecision.decision === "Accepted" ? "text-success ms-2" : "text-danger ms-2"}>
                                                                            {selectedPaper.finalDecision.decision}
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Reviewer Decision Panel - only show if status is "In Review" */}
                                    {selectedPaper?.status === "Reviewed" && (
                                        <div className="col-md-4">
                                            <motion.div
                                                className="card border-0 shadow-sm sticky-top"
                                                style={{ top: "20px" }}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                variants={fadeInUp}
                                            >
                                                <div className="card-header bg-white">
                                                    <h5 className="mb-0">Your Decision</h5>
                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="mb-4">
                                                            <label htmlFor="reviewerNote" className="form-label">Review Notes</label>
                                                            <textarea
                                                                className="form-control"
                                                                id="reviewerNote"
                                                                rows="8"
                                                                value={reviewerNote}
                                                                onChange={handleReviewNoteChange}
                                                                placeholder="Enter your review comments here..."
                                                            ></textarea>
                                                            <div className="form-text mt-2">
                                                                Please provide detailed feedback on the paper's strengths, weaknesses, and your rationale for the decision.
                                                            </div>
                                                        </div>

                                                        <div className="d-grid gap-3">
                                                            <motion.button
                                                                type="button"
                                                                className="primary-button"
                                                                style={{ backgroundColor: "#4ade80" }}
                                                                onClick={() => handleDecision("accept")}
                                                                whileHover={{ scale: 1.03 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                disabled={!reviewerNote.trim()}
                                                            >
                                                                Accept Paper
                                                            </motion.button>

                                                            <motion.button
                                                                type="button"
                                                                className="primary-button"
                                                                style={{ backgroundColor: "#f87171" }}
                                                                onClick={() => handleDecision("reject")}
                                                                whileHover={{ scale: 1.03 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                disabled={!reviewerNote.trim()}
                                                            >
                                                                Reject Paper
                                                            </motion.button>
                                                        </div>

                                                        {!reviewerNote.trim() && (
                                                            <div className="text-center mt-3">
                                                                <small className="text-muted">Please add review notes before making a decision</small>
                                                            </div>
                                                        )}
                                                    </form>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}
                                    {selectedPaper?.status !== "Reviewed" && (

                                        <div className="col-md-4">
                                            <motion.div
                                                className="card border-0 shadow-sm sticky-top"
                                                style={{ top: "20px" }}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                variants={fadeInUp}
                                            >
                                                <div className="card-header bg-white">
                                                    <h5 className="mb-3">Paper Summary <small className="text-muted">(AI-generated)</small></h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="accordion mb-4" id="summaryAccordion">
                                                        {/* {console.log(JSON.parse(selectedPaper.summary))} */}
                                                        {selectedPaper?.summary && Object.entries(selectedPaper.summary).map(([key, value]) => (
                                                            <div className="accordion-item border-0 mb-2 shadow-sm" key={key}>
                                                                <h2 className="accordion-header">
                                                                    <button
                                                                        className="accordion-button collapsed"
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#collapse${key}`}
                                                                        aria-expanded="false"
                                                                        onClick={() => setOpenSummary(key)}

                                                                    >
                                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                                    </button>
                                                                </h2>
                                                                {/* <div
                                                                id={`collapse${key}`}
                                                                className="accordion-collapse collapse"
                                                                data-bs-parent="#summaryAccordion"
                                                            > */}
                                                                {openSummary == key && <div className="accordion-body">
                                                                    {value}
                                                                </div>}
                                                                {/* </div> */}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
}