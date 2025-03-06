import React from "react";

// Helper function to get score color
const getScoreColor = (score) => {
    if (!score) return "";
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-danger";
};

const PaperReviews = ({ reviews, finalDecision }) => {
    return (
        <>
            {/* AI Reviews */}
            <h5 className="mb-3">AI Reviews</h5>

            {reviews && reviews.length > 0 ? (
                <div className="accordion mb-4" id="reviewsAccordion">
                    {reviews.map((review, index) => (
                        <div className="accordion-item border-0 mb-3 shadow-sm" key={index}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapseReview${index}`}
                                    aria-expanded="false"
                                >
                                    <div className="d-flex justify-content-between align-items-center w-100 me-3">
                                        <span><strong>{review.model}</strong> Review</span>
                                        {review.score && (
                                            <span className={`badge ${getScoreColor(review.score)} bg-opacity-10 border ${getScoreColor(review.score)} text-dark`}>
                                                Score: {review.score.toFixed(1)}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </h2>
                            <div
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
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info mb-4">
                    No AI reviews available yet. Reviews are typically generated within 24 hours of submission.
                </div>
            )}

            {/* Previous Reviewer Decision (if any) */}
            {finalDecision && (
                <div className="mb-4">
                    <h5 className="mb-3">Final Decision</h5>
                    <div className="card bg-light border-0">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h6 className="mb-0">
                                    <strong>Reviewer:</strong> {finalDecision.reviewer}
                                </h6>
                                <span className="text-muted">{finalDecision.date}</span>
                            </div>
                            <p>{finalDecision.comments}</p>
                            <div className="mt-3">
                                <span>
                                    <strong>Decision:</strong>
                                    <span className={finalDecision.decision === "Accept" ? "text-success ms-2" : "text-danger ms-2"}>
                                        {finalDecision.decision}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaperReviews;