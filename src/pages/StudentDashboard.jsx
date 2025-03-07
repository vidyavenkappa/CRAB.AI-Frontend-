import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import './Home.css';

// Import components
import PaperCard from './PaperCard';
import PaperDetails from './PaperDetails';
import UploadModal from './UploadModal';
import StudentSidebar from './StudentSidebar';

export default function StudentDashboard() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [selectedPaperId, setSelectedPaperId] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        title: "",
        conference: "",
        file: null,
        comments: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // "grid" or "detail"
    const [uploadAlert, setUploadAlert] = useState({ show: false, message: '' });
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : "JohnDoe"; // This would come from your auth context

    const conferences = [
        { value: "ICML", label: "International Conference on Machine Learning (ICML)" },
        { value: "ICLR", label: "International Conference on Learning Representations (ICLR)" },
        { value: "ACL", label: "Association for Computational Linguistics (ACL)" },
        { value: "NeurIPS", label: "Neural Information Processing Systems (NeurIPS)" }
    ];
    useEffect(() => {
        fetchPapers();
    }, []);


    const fetchPapers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/1/papers`);
            const data = await response.json();

            setPapers(Array.isArray(data) ? data : []);
            setLoading(false); // ✅ Ensure loading state is updated
        } catch (error) {
            console.error("Failed to load papers", error);
            setPapers([]);
            setLoading(false); // ✅ Prevent infinite loading
        }
    }





    const handleFileChange = (e) => {
        setUploadForm({
            ...uploadForm,
            file: e.target.files[0]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUploadForm({
            ...uploadForm,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append("file", uploadForm.file);
        formData.append("conference", uploadForm.conference);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/1/upload`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                setPapers([...papers, result]);
                setUploadAlert({ show: true, message: "Paper uploaded successfully!" });
                setShowUploadModal(false);
                setLoading(false)
                fetchPapers();
            } else {
                setUploadAlert({ show: true, message: "Failed to upload paper." });
                setShowUploadModal(false);
                fetchPapers();
                setLoading(false)
            }
        } catch (error) {
            setUploadAlert({ show: true, message: "Server error. Try again." });
            setShowUploadModal(false);
            setLoading(false)
            fetchPapers();
        }

        setSubmitting(false);
    };

    const handleDeletePaper = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/1/papers/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete paper");
            }

            // ✅ Fetch the updated paper list
            const updatedPapersResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/students/1/papers`);
            const updatedPapers = await updatedPapersResponse.json();

            setPapers(Array.isArray(updatedPapers) ? updatedPapers : []);
        } catch (error) {
            console.error("Failed to delete paper", error);
        }
    };



    const handleViewPaper = (paper) => {
        setSelectedPaperId(paper.id);
        setSelectedPaper(paper);
        setViewMode("detail");
    };

    const handleBackToGrid = () => {
        setViewMode("grid");
    };

    if (loading) {
        return (
            <div className="home-container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <div className="spinner-border" style={{ color: "#4361ee" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container">
                <div className="container py-5">
                    <div className="alert alert-danger m-5" role="alert">
                        Error loading your papers: {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="container py-5">
                {/* Success Alert */}
                {uploadAlert.show && (
                    <motion.div
                        className="alert alert-info alert-dismissible fade show"
                        role="alert"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="d-flex align-items-center">
                            <div className="spinner-border spinner-border-sm me-2 text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            {uploadAlert.message}
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setUploadAlert({ show: false, message: '' })}
                            aria-label="Close"
                        ></button>
                    </motion.div>
                )}

                <div className="row">
                    {/* Sidebar - only shown on large screens or when in grid view on small screens */}
                    {viewMode === "grid" || (viewMode === "detail" && window.innerWidth >= 992) ? (
                        <StudentSidebar
                            username={username}
                            papers={papers}
                            onViewPaper={(paper) => {
                                setSelectedPaperId(paper.id);
                                setViewMode("detail");
                            }}
                            onUpload={() => setShowUploadModal(true)}
                        />
                    ) : null}

                    {/* Main content area */}
                    <div className={`col-12 ${viewMode === "detail" || viewMode === "grid" ? "col-lg-9" : ""} p-4`}>
                        {viewMode === "grid" ? (
                            <>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="section-title mb-0">My Papers</h4>
                                    <motion.button
                                        className="primary-button"
                                        onClick={() => setShowUploadModal(true)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="me-2">+</span> Upload Paper
                                    </motion.button>
                                </div>

                                {papers.length === 0 ? (
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-body text-center p-5">
                                            <span className="display-1 text-muted mb-4">📄</span>
                                            <h4>No papers uploaded yet</h4>
                                            <p className="text-muted">
                                                Upload your first paper to get started with AI-powered reviews
                                            </p>
                                            <motion.button
                                                className="primary-button mt-3"
                                                onClick={() => setShowUploadModal(true)}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className="me-2">+</span> Upload New Paper
                                            </motion.button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                        {papers.map(paper => (
                                            <div className="col" key={paper.id}>
                                                <PaperCard
                                                    paper={paper}
                                                    onView={handleViewPaper}
                                                    onDelete={handleDeletePaper}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <PaperDetails
                                paperId={selectedPaperId}
                                onBack={handleBackToGrid}
                                onDelete={handleDeletePaper}
                            />
                        )}
                    </div>
                </div>

                {/* Upload Modal Component */}
                <UploadModal
                    isOpen={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    uploadForm={uploadForm}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    submitting={submitting}
                    conferences={conferences}
                />
            </div>
        </div>
    );
}