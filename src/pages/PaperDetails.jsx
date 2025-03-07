import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


const PaperDetails = ({ paperId, onBack, onDelete }) => {
    const [paper, setPaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaperDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/1/papers/${paperId}`);
                const data = await response.json();
                setPaper(data);
                setLoading(false);
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
            case "Accepted":
                return "text-success";
            case "Rejected":
                return "text-danger";
            case "In Review":
                return "text-warning";
            default:
                return "text-secondary";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Accepted":
                return <span className="text-success">✓</span>;
            case "Rejected":
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
                    <h4 className="section-title">{paper.title}</h4>
                </div>
                <motion.button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(paper.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="me-1">🗑️</span> Delete
                </motion.button>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <p>
                                <strong>Conference:</strong> {paper.conference}
                            </p>
                            <p>
                                <strong>Uploaded:</strong> {paper.uploadDate}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                <strong>Status:</strong>
                                <span className={`ms-2 ${getStatusColor(paper.status)}`}>
                                    {getStatusIcon(paper.status)} {paper.status}
                                </span>
                            </p>
                            <p>
                                <strong>Overall Score:</strong>
                                {paper.score ? (
                                    <span className={`ms-2 ${getScoreColor(paper.score)}`}>
                                        {paper.score.toFixed(1)} / 10
                                    </span>
                                ) : (
                                    <span className="ms-2 text-muted">Pending</span>
                                )}
                            </p>
                        </div>
                    </div>

                    <h5 className="mb-3">AI Reviews</h5>
                    {paper.reviews && paper.reviews.length > 0 ? (
                        <div className="accordion mb-4" id="reviewsAccordion">
                            {paper.reviews.map((review, index) => (
                                <div className="accordion-item border-0 mb-3 shadow-sm" key={index}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${index}`}
                                        >
                                            <div className="d-flex justify-content-between align-items-center w-100 me-3">
                                                <span>
                                                    <strong>{review.model}</strong> Review
                                                </span>
                                                {review.score && (
                                                    <span
                                                        className={`badge ${getScoreColor(
                                                            review.score
                                                        )} bg-opacity-10 border ${getScoreColor(
                                                            review.score
                                                        )} text-dark`}
                                                    >
                                                        Score: {review.score.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${index}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`heading${index}`}
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            No AI reviews available yet. Reviews are typically completed within 1-2 days after
                            submission.
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PaperDetails;