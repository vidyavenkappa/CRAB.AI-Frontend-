import React from "react";
import { motion } from "framer-motion";

const PaperDecisionPanel = ({ reviewerNote, handleReviewNoteChange, handleDecision }) => {
    return (
        <div className="card border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
            <div className="card-header bg-white border-0">
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
                            className="btn btn-success"
                            onClick={() => handleDecision("accept")}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!reviewerNote.trim()}
                        >
                            Accept Paper
                        </motion.button>

                        <motion.button
                            type="button"
                            className="btn btn-danger"
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
        </div>
    );
};

export default PaperDecisionPanel;