import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


const PaperDetails = ({ paperId, onBack, onDelete }) => {
    const [paper, setPaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const fetchPaperDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/1/papers/${paperId}`);
                const data = await response.json();
                setPaper(data);
                setLoading(false);
                setError(null);
            } catch (error) {
                setError("Failed to load paper details");
                setLoading(false);
            }
        };
        fetchPaperDetails();
    }, [paperId]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const getStatusColor = (status) => {
        switch (status) {
            case "Accept":
                return "text-success";
            case "Reject":
                return "text-danger";
            case "In Review":
                return "text-warning";
            default:
                return "text-secondary";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Accept":
                return <span className="text-success">✓</span>;
            case "Reject":
                return <span className="text-danger">✗</span>;
            case "In Review":
                return <span className="text-warning">⟳</span>;
            default:
                return null;
        }
    };

    const getScoreColor = (score) => {
        if (!score) return "";
        if (score >= 8) return "text-success";
        if (score >= 6) return "text-warning";
        return "text-danger";
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <motion.button
                        className="secondary-button mb-3 d-flex align-items-center"
                        onClick={onBack}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="me-2">←</span> Back to All Papers
                    </motion.button>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <h4 className="section-title">{paper.paper.title}</h4>
                    <hr />
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <p>
                                <strong>Conference:</strong> {paper.paper.conference}
                            </p>
                            <p>
                                <strong>Uploaded:</strong> {paper.paper.date.split('T')[0]}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                <strong>Status:</strong>
                                <span className={`ms-2 ${getStatusColor(paper.paper.status)}`}>
                                    {getStatusIcon(paper.paper.status)} {paper.paper.status}
                                </span>
                            </p>
                            <p>
                                <strong>Overall Score:</strong>
                                {paper.paper.score ? (
                                    <span className={`ms-2 ${getScoreColor(paper.paper.max_score == 5 ? paper.paper.score * 2 : paper.paper.score)}`}>
                                        {paper.paper.score.toFixed(1)} / {paper.paper.max_score.toFixed(1)}
                                    </span>
                                ) : (
                                    <span className="ms-2 text-muted">Pending</span>
                                )}
                            </p>
                        </div>
                    </div>

                    {paper.reviews && paper.reviews.length > 0 ? (
                        <div className="mb-4">
                            <div className="accordion" id="reviewsAccordion">
                                {paper.reviews.map((review, index) => (
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${index}`}
                                                aria-expanded="true"
                                                aria-controls={`collapse${index}`}
                                                onClick={() => setIsOpen(!isOpen)}
                                            >
                                                AI Reviews
                                            </button>
                                        </h2>
                                        {isOpen && (<div
                                            id={`collapse${index}`}
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#reviewsAccordion"
                                        >
                                            <div className="accordion-body">
                                                <p>{review.content}</p>
                                                {/* Strengths Section */}
                                                {review.strengths?.length > 0 && (
                                                    <div className="mb-3">
                                                        <h6 className="text-success">Strengths:</h6>
                                                        <ul className="mb-0">
                                                            {review.strengths.map((strength, i) => (
                                                                <li key={i}>{strength}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {/* Weaknesses Section */}
                                                {review.weaknesses?.length > 0 && (
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
                                        </div>)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            No AI reviews available yet. Reviews are typically completed within 1-2 days after submission.
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PaperDetails;