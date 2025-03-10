import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const PaperDetails = ({ paperId, onBack }) => {
    const [paper, setPaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAccordionNumerical, setOpenAccordionNumerical] = useState(true);
    const [openAccordionStructural, setOpenAccordionStructural] = useState(false);
    const [openAccordionFeedback, setOpenAccordionFeedback] = useState(false);

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


    useEffect(() => {
        const fetchPaperDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/${localStorage.getItem('user_id')}/papers/${paperId}`);
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

    return (
        <div className="container py-4">
            <motion.button
                className="btn btn-secondary mb-3 primary-button"
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                ← Back to All Papers
            </motion.button>

            <motion.div className="card p-4 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h3>{paper.paper.title}</h3>
                <p className={"ms-2"}><strong>Conference:</strong> {paper.paper.conference}</p>
                <p className={"ms-2"}><strong>Uploaded:</strong> {paper.paper.date.split('T')[0]}</p>
                <p className={"ms-2"} ><strong>Status: </strong>
                    <span className={`${getStatusColor(paper.paper.status)}`}>
                        {paper.paper.status} {getStatusIcon(paper.paper.status)}
                    </span>
                </p>
                <p className={"ms-2"}><strong>Overall Score:</strong>
                    {/* {paper.paper.score ? `${paper.paper.score.toFixed(1)} / ${paper.paper.max_score.toFixed(1)}` : "Pending"} */}
                    <span className={`ms-2 ${getScoreColor(paper.paper.max_score == 5 ? paper.paper.score * 2 : paper.paper.score)}`}>
                        {paper.paper.score.toFixed(1)} / {paper.paper.max_score.toFixed(1)}
                    </span>
                </p>


                {paper.reviews && paper.reviews.length > 0 && (
                    <div className="accordion mt-4" id="reviewsAccordion">
                        {paper.reviews.map((review, index) => (
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
                    </div>
                )}  </motion.div>
        </div >
    );
};

export default PaperDetails;
