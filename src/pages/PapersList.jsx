import React from "react";
import { motion } from "framer-motion";

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
    const sum = reviews.reduce((acc, review) => acc + review.score, 0);
    return (sum / reviews.length).toFixed(1);
};

const PapersList = ({ filteredPapers, activeTab, handleTabChange, handleViewPaper }) => {
    return (
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "needReview" ? "active" : ""}`}
                            onClick={() => handleTabChange("needReview")}
                        >
                            Need Review
                            <span className="badge bg-warning text-dark ms-2">
                                {filteredPapers.filter(p => p.status === "In Review").length}
                            </span>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "accepted" ? "active" : ""}`}
                            onClick={() => handleTabChange("accepted")}
                        >
                            Accepted
                            <span className="badge bg-success ms-2">
                                {filteredPapers.filter(p => p.status === "Accepted").length}
                            </span>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "rejected" ? "active" : ""}`}
                            onClick={() => handleTabChange("rejected")}
                        >
                            Rejected
                            <span className="badge bg-danger ms-2">
                                {filteredPapers.filter(p => p.status === "Rejected").length}
                            </span>
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
                                    <th>Author</th>
                                    <th>University</th>
                                    <th>Conference</th>
                                    <th>Topic</th>
                                    <th>Average Score</th>
                                    <th>Submitted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPapers.map(paper => (
                                    <tr key={paper.id}>
                                        <td>{paper.title}</td>
                                        <td>{paper.author}</td>
                                        <td>{paper.university}</td>
                                        <td>{paper.conference}</td>
                                        <td>{paper.topic}</td>
                                        <td className={getScoreColor(getAverageScore(paper.reviews))}>
                                            {getAverageScore(paper.reviews) || "N/A"}
                                        </td>
                                        <td>{paper.uploadDate}</td>
                                        <td>
                                            <motion.button
                                                className="btn btn-sm btn-primary"
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
        </div>
    );
};

export default PapersList;