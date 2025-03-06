import React from "react";
import { motion } from "framer-motion";

const UploadModal = ({
    isOpen,
    onClose,
    uploadForm,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    submitting,
    conferences
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header" style={{ background: "linear-gradient(to right, #4361ee, #3a0ca3)", color: "white" }}>
                        <h5 className="modal-title">Upload New Paper</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            disabled={submitting}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Paper Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={uploadForm.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="conference" className="form-label">Target Conference</label>
                                <select
                                    className="form-select"
                                    id="conference"
                                    name="conference"
                                    value={uploadForm.conference}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a conference</option>
                                    {conferences.map(conf => (
                                        <option key={conf.value} value={conf.value}>{conf.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="file" className="form-label">Paper File (PDF)</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="comments" className="form-label">Additional Comments (Optional)</label>
                                <textarea
                                    className="form-control"
                                    id="comments"
                                    name="comments"
                                    rows="3"
                                    value={uploadForm.comments}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className="d-grid gap-2">
                                <motion.button
                                    type="submit"
                                    className="primary-button"
                                    disabled={submitting}
                                    whileHover={!submitting ? { scale: 1.03 } : {}}
                                    whileTap={!submitting ? { scale: 0.98 } : {}}
                                >
                                    {submitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <span className="me-2">📤</span> Upload Paper
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;