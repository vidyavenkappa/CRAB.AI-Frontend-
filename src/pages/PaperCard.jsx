import React, { useState } from "react";
import { motion } from "framer-motion";

const PaperCard = ({ paper, onView, onDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const getScoreColor = (score) => {
        if (!score) return "";
        if (score >= 8) return "text-success";
        if (score >= 6) return "text-warning";
        return "text-danger";
    };

    const handleDelete = async () => {
        try {
            onDelete(paper.id);

        } catch (error) {
            console.error("Failed to delete paper", error);
        }
        setShowConfirm(false);
    };


    return (
        <motion.div
            className="card h-100 border-0 shadow-sm feature-card"
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                    <span
                        className={`badge ${paper.status === "Accepted"
                            ? "text-bg-success"
                            : paper.status === "Rejected"
                                ? "text-bg-danger"
                                : "text-bg-warning"
                            }`}
                    >
                        {paper.status}
                    </span>
                    <small className="text-muted">{paper.uploadDate}</small>
                </div>
                <h5 className="card-title">{paper.title}</h5>
                <p className="card-text text-muted mb-3">Conference: {paper.conference}</p>
                {paper && paper.score && paper.score !== null && (
                    <p className={`mb-3 ${getScoreColor(paper.score)}`}>
                        Score: <strong>{paper.score.toFixed(1)}/10</strong>
                    </p>
                )}
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                    <motion.button
                        className="secondary-button btn-sm"
                        onClick={() => onView(paper.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Details
                    </motion.button>
                    <motion.button
                        className="btn btn-sm btn-outline-danger"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowConfirm(true)}
                    >
                        <span>🗑️</span>
                    </motion.button>
                </div>
            </div>

            {showConfirm && (
                <div className="confirm-overlay">
                    <div className="confirm-box shadow p-3 rounded">
                        <p className="mb-3">Are you sure you want to delete this paper?</p>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default PaperCard;