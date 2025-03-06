import React from "react";
import { motion } from "framer-motion";
import PaperDecisionPanel from "./PaperDecisionPanel";
import PaperSummary from "./PaperSummary";
import PaperReviews from "./PaperReviews";

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

const PaperDetail = ({
    selectedPaper,
    reviewerNote,
    handleReviewNoteChange,
    handleBackToList,
    handleDecision
}) => {
    if (!selectedPaper) return null;

    return (
        <>
            <motion.button
                className="btn btn-outline-secondary mb-4"
                onClick={handleBackToList}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="me-2">←</span> Back to All Papers
            </motion.button>

            <div className="row">
                <div className="col-md-8">
                    {/* Paper details and reviews */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0">
                            <h4 className="mb-0">{selectedPaper.title}</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <p>
                                        <strong>Author:</strong> {selectedPaper.author}
                                    </p>
                                    <p>
                                        <strong>University:</strong> {selectedPaper.university}
                                    </p>
                                    <p>
                                        <strong>Region:</strong> {selectedPaper.region}
                                    </p>
                                    <p>
                                        <strong>Submitted:</strong> {selectedPaper.uploadDate}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p>
                                        <strong>Conference:</strong> {selectedPaper.conference}
                                    </p>
                                    <p>
                                        <strong>Topic:</strong> {selectedPaper.topic}
                                    </p>
                                    <p>
                                        <strong>Average Score:</strong>{" "}
                                        <span className={getScoreColor(getAverageScore(selectedPaper.reviews))}>
                                            {getAverageScore(selectedPaper.reviews) || "N/A"}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>PDF:</strong>{" "}
                                        <a href={selectedPaper.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                            <span className="me-1">📄</span> View Paper
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Paper Summary */}
                            <PaperSummary summary={selectedPaper.summary} />

                            {/* AI Reviews */}
                            <PaperReviews reviews={selectedPaper.reviews} finalDecision={selectedPaper.finalDecision} />
                        </div>
                    </div>
                </div>

                {/* Reviewer Decision Panel - only show if status is "In Review" */}
                {selectedPaper.status === "In Review" && (
                    <div className="col-md-4">
                        <PaperDecisionPanel
                            reviewerNote={reviewerNote}
                            handleReviewNoteChange={handleReviewNoteChange}
                            handleDecision={handleDecision}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default PaperDetail;