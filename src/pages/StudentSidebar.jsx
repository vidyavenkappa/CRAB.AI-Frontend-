import React from "react";
import { motion } from "framer-motion";

const StudentSidebar = ({ name, papers, onViewPaper, onUpload }) => {
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

    return (
        <div className="col-lg-3 p-4">
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
                            {name.charAt(0)}
                        </div>
                    </div>
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text text-muted">Student</p>
                    {/* <div className="d-grid gap-2">
                        <motion.button
                            className="primary-button"
                            onClick={onUpload}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="me-2">+</span> Upload New Paper
                        </motion.button>
                    </div> */}
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                    <h5 className="mb-0">My Papers</h5>
                </div>
                <div className="list-group list-group-flush">
                    {papers.map(paper => (
                        <motion.button
                            key={paper.id}
                            className="list-group-item list-group-item-action border-0"
                            onClick={() => onViewPaper(paper)}
                            whileHover={{ backgroundColor: "#f8f9fa" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <span className="me-3" style={{ color: "#4361ee" }}>📄</span>
                                    <div className="text-truncate" style={{ maxWidth: "150px" }}>
                                        {paper.title}
                                    </div>
                                </div>
                                <div>
                                    {getStatusIcon(paper.status)}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentSidebar;