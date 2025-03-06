// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function StudentDashboard() {
//     const [papers, setPapers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedPaper, setSelectedPaper] = useState(null);
//     const [showUploadModal, setShowUploadModal] = useState(false);
//     const [uploadForm, setUploadForm] = useState({
//         title: "",
//         conference: "",
//         file: null,
//         comments: ""
//     });
//     const [submitting, setSubmitting] = useState(false);
//     const [viewMode, setViewMode] = useState("grid"); // "grid" or "detail"
//     const [uploadAlert, setUploadAlert] = useState({ show: false, message: '' });
//     const username = "JohnDoe"; // This would come from your auth context

//     const conferences = [
//         { value: "ICML", label: "International Conference on Machine Learning (ICML)" },
//         { value: "ICLR", label: "International Conference on Learning Representations (ICLR)" },
//         { value: "ACL", label: "Association for Computational Linguistics (ACL)" },
//         { value: "NeurIPS", label: "Neural Information Processing Systems (NeurIPS)" }
//     ];

//     // Mock data for papers - in a real app, you'd fetch this from your API
//     useEffect(() => {
//         // Simulate API call
//         setTimeout(() => {
//             const mockPapers = [
//                 {
//                     id: 1,
//                     title: "Advances in Natural Language Processing with Transformer Models",
//                     conference: "ACL",
//                     uploadDate: "2023-02-15",
//                     status: "Accepted",
//                     score: 8.7,
//                     reviews: [
//                         {
//                             model: "Gemini",
//                             content: "This paper presents a comprehensive analysis of recent advances in natural language processing using transformer models. The methodology is sound, and the experimental results are convincing. The discussion section could be expanded to address potential limitations.",
//                             score: 8.5,
//                             strengths: ["Strong methodology", "Comprehensive literature review", "Clear presentation"],
//                             weaknesses: ["Limited discussion of limitations", "Some experimental results need more explanation"]
//                         },
//                         {
//                             model: "Claude",
//                             content: "The paper provides valuable insights into transformer-based NLP models. The theoretical framework is well-established, and the practical implementations demonstrate the effectiveness of the proposed approaches. However, the evaluation metrics could be more diverse to provide a more holistic assessment.",
//                             score: 9.0,
//                             strengths: ["Excellent theoretical framework", "Strong practical demonstrations", "Clear writing"],
//                             weaknesses: ["Limited evaluation metrics", "Some claims need stronger evidence"]
//                         },
//                         {
//                             model: "ChatGPT",
//                             content: "This work makes a significant contribution to the field of NLP. The authors have thoroughly explored the capabilities of transformer models and provided empirical evidence for their effectiveness. The paper could benefit from more ablation studies to isolate the effects of individual components.",
//                             score: 8.5,
//                             strengths: ["Significant contribution", "Thorough exploration", "Strong empirical evidence"],
//                             weaknesses: ["Lack of ablation studies", "Some technical details are missing"]
//                         }
//                     ],
//                     humanReview: {
//                         reviewer: "Dr. Smith",
//                         content: "I concur with the AI reviews. This is a solid paper with strong methodology and clear presentation. The authors have addressed a significant challenge in the field and provided valuable insights. I recommend acceptance.",
//                         decision: "Accept",
//                         date: "2023-03-10"
//                     }
//                 },
//                 {
//                     id: 2,
//                     title: "Reinforcement Learning in Dynamic Environments",
//                     conference: "NeurIPS",
//                     uploadDate: "2023-01-20",
//                     status: "Rejected",
//                     score: 5.3,
//                     reviews: [
//                         {
//                             model: "Gemini",
//                             content: "The paper explores an interesting problem in reinforcement learning, but falls short in several areas. The methodology lacks rigor, and the experimental results are not sufficiently convincing. The theoretical contribution is limited, and the empirical evaluation does not adequately support the claims made.",
//                             score: 5.0,
//                             strengths: ["Interesting problem domain", "Clear motivation"],
//                             weaknesses: ["Weak methodology", "Unconvincing results", "Limited theoretical contribution"]
//                         },
//                         {
//                             model: "Claude",
//                             content: "This paper addresses an important challenge in reinforcement learning, but the approach taken has several limitations. The experimental setup is not well-designed to test the hypotheses, and the results are not statistically significant. The literature review omits several key recent works.",
//                             score: 5.5,
//                             strengths: ["Important problem", "Clear writing"],
//                             weaknesses: ["Poor experimental design", "Missing key references", "Results lack statistical significance"]
//                         },
//                         {
//                             model: "ChatGPT",
//                             content: "While the paper tackles a relevant problem, the proposed method does not show substantial improvement over existing approaches. The evaluation metrics are standard but the performance gains are marginal at best. The paper would benefit from a more thorough analysis of why the method works (or doesn't) in certain scenarios.",
//                             score: 5.4,
//                             strengths: ["Relevant problem", "Standard evaluation metrics"],
//                             weaknesses: ["Marginal improvements", "Insufficient analysis", "Limited novelty"]
//                         }
//                     ],
//                     humanReview: {
//                         reviewer: "Dr. Johnson",
//                         content: "I agree with the AI reviewers that this paper, while addressing an important topic, has significant methodological weaknesses. The experimental results do not support the claims made, and the contribution relative to existing work is not sufficiently novel. I recommend rejection.",
//                         decision: "Reject",
//                         date: "2023-02-15"
//                     }
//                 },
//                 {
//                     id: 3,
//                     title: "A Novel Approach to Semi-Supervised Learning",
//                     conference: "ICLR",
//                     uploadDate: "2023-03-01",
//                     status: "In Review",
//                     score: null,
//                     reviews: [
//                         {
//                             model: "Gemini",
//                             content: "This paper presents an interesting approach to semi-supervised learning. The method is innovative and the theoretical foundations are sound. However, the experimental evaluation could be more comprehensive, including more datasets and comparison methods.",
//                             score: 7.5,
//                             strengths: ["Novel approach", "Sound theoretical foundation", "Clear writing"],
//                             weaknesses: ["Limited experimental evaluation", "Few comparison methods", "Some assumptions are not fully justified"]
//                         },
//                         {
//                             model: "Claude",
//                             content: "The proposed method for semi-supervised learning has potential merit. The authors provide a good theoretical analysis and the approach is well-motivated. However, the experimental section needs improvement, with more rigorous evaluation and comparison to state-of-the-art methods.",
//                             score: 7.0,
//                             strengths: ["Good theoretical analysis", "Well-motivated approach", "Novel perspective"],
//                             weaknesses: ["Needs more rigorous evaluation", "Missing comparisons to SOTA", "Some results are inconclusive"]
//                         }
//                     ],
//                     humanReview: null // No human review yet
//                 },
//                 {
//                     id: 4,
//                     title: "Efficient Transformers for Computer Vision Tasks",
//                     conference: "ICLR",
//                     uploadDate: "2023-02-20",
//                     status: "In Review",
//                     score: null,
//                     reviews: [],
//                     humanReview: null
//                 },
//                 {
//                     id: 5,
//                     title: "Multi-Agent Reinforcement Learning for Autonomous Driving",
//                     conference: "NeurIPS",
//                     uploadDate: "2023-02-28",
//                     status: "In Review",
//                     score: null,
//                     reviews: [],
//                     humanReview: null
//                 }
//             ];
//             setPapers(mockPapers);
//             setLoading(false);
//         }, 1000);
//     }, []);

//     const handleFileChange = (e) => {
//         setUploadForm({
//             ...uploadForm,
//             file: e.target.files[0]
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUploadForm({
//             ...uploadForm,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {

//         e.preventDefault();
//         setSubmitting(true);

//         // In a real app, you'd upload the file to your server
//         // For this demo, we'll simulate the upload with a timeout
//         setTimeout(() => {
//             const newPaper = {
//                 id: papers.length + 1,
//                 title: uploadForm.title,
//                 conference: uploadForm.conference,
//                 uploadDate: new Date().toISOString().split('T')[0],
//                 status: "In Review",
//                 score: null,
//                 reviews: [],
//                 humanReview: null
//             };

//             setPapers([...papers, newPaper]);
//             setSubmitting(false);
//             setShowUploadModal(false);

//             // Add this new alert state
//             setUploadAlert({
//                 show: true,
//                 message: `Your paper "${uploadForm.title}" has been uploaded successfully and is now in review. The review process typically takes 1-2 days.`
//             });

//             // Clear the alert after 5 seconds
//             setTimeout(() => {
//                 setUploadAlert({ show: false, message: '' });
//             }, 5000);

//             setUploadForm({
//                 title: "",
//                 conference: "",
//                 file: null,
//                 comments: ""
//             });
//         }, 2000);

//     };

//     const handleDeletePaper = (id) => {
//         // In a real app, you'd make an API call to delete the paper
//         setPapers(papers.filter(paper => paper.id !== id));
//         if (selectedPaper && selectedPaper.id === id) {
//             setSelectedPaper(null);
//             setViewMode("grid");
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "Accepted": return "text-success";
//             case "Rejected": return "text-danger";
//             case "In Review": return "text-warning";
//             default: return "text-secondary";
//         }
//     };

//     const getStatusIcon = (status) => {
//         switch (status) {
//             case "Accepted": return <span className="text-success">✓</span>;
//             case "Rejected": return <span className="text-danger">✗</span>;
//             case "In Review": return <span className="text-warning">⟳</span>;
//             default: return null;
//         }
//     };

//     const getScoreColor = (score) => {
//         if (!score) return "";
//         if (score >= 8) return "text-success";
//         if (score >= 6) return "text-warning";
//         return "text-danger";
//     };

//     const handleViewPaper = (paper) => {
//         setSelectedPaper(paper);
//         setViewMode("detail");
//     };

//     const handleBackToGrid = () => {
//         setViewMode("grid");
//     };

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
//                 <div className="spinner-border" style={{ color: "#3050A4" }} role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="alert alert-danger m-5" role="alert">
//                 Error loading your papers: {error}
//             </div>
//         );
//     }

//     return (
//         <div className="container-fluid pt-5 mt-3">
//             {uploadAlert.show && (
//                 <div className="alert alert-info alert-dismissible fade show" role="alert">
//                     <div className="d-flex align-items-center">
//                         <div className="spinner-border spinner-border-sm me-2 text-primary" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </div>
//                         {uploadAlert.message}
//                     </div>
//                     <button
//                         type="button"
//                         className="btn-close"
//                         onClick={() => setUploadAlert({ show: false, message: '' })}
//                         aria-label="Close"
//                     ></button>
//                 </div>
//             )}
//             <div className="row">
//                 {/* Sidebar - only shown on large screens or when in grid view on small screens */}
//                 <div className={`col-lg-3 p-4 ${viewMode === "detail" ? "d-none d-lg-block" : ""}`}>
//                     <div className="card border-0 shadow-sm mb-4">
//                         <div className="card-body text-center">
//                             <div className="mb-3">
//                                 <div
//                                     className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
//                                     style={{
//                                         width: "80px",
//                                         height: "80px",
//                                         backgroundColor: "#3050A4",
//                                         color: "white",
//                                         fontSize: "2rem"
//                                     }}
//                                 >
//                                     {username.charAt(0)}
//                                 </div>
//                             </div>
//                             <h5 className="card-title">{username}</h5>
//                             <p className="card-text text-muted">Student</p>
//                             <div className="d-grid gap-2">
//                                 <motion.button
//                                     className="btn text-white"
//                                     style={{ backgroundColor: "#3050A4" }}
//                                     onClick={() => setShowUploadModal(true)}
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <span className="me-2">+</span> Upload New Paper
//                                 </motion.button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="card border-0 shadow-sm">
//                         <div className="card-header bg-white border-0">
//                             <h5 className="mb-0">My Papers</h5>
//                         </div>
//                         <div className="list-group list-group-flush">
//                             {papers.map(paper => (
//                                 <motion.button
//                                     key={paper.id}
//                                     className="list-group-item list-group-item-action border-0"
//                                     onClick={() => handleViewPaper(paper)}
//                                     whileHover={{ backgroundColor: "#f8f9fa" }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <div className="d-flex align-items-center">
//                                             <span className="me-3 text-primary">📄</span>
//                                             <div className="text-truncate" style={{ maxWidth: "150px" }}>
//                                                 {paper.title}
//                                             </div>
//                                         </div>
//                                         <div>
//                                             {getStatusIcon(paper.status)}
//                                         </div>
//                                     </div>
//                                 </motion.button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main content area */}
//                 <div className={`col-12 ${viewMode === "detail" ? "col-lg-9" : "col-lg-9"} p-4`}>
//                     {viewMode === "grid" ? (
//                         <>
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <h4 className="mb-0">My Papers</h4>
//                                 <motion.button
//                                     className="btn text-white"
//                                     style={{ backgroundColor: "#3050A4" }}
//                                     onClick={() => setShowUploadModal(true)}
//                                     whileHover={{ scale: 1.03 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <span className="me-2">+</span> Upload Paper
//                                 </motion.button>
//                             </div>

//                             {papers.length === 0 ? (
//                                 <div className="card border-0 shadow-sm">
//                                     <div className="card-body text-center p-5">
//                                         <span className="display-1 text-muted mb-4">📄</span>
//                                         <h4>No papers uploaded yet</h4>
//                                         <p className="text-muted">
//                                             Upload your first paper to get started with AI-powered reviews
//                                         </p>
//                                         <motion.button
//                                             className="btn text-white mt-3"
//                                             style={{ backgroundColor: "#3050A4" }}
//                                             onClick={() => setShowUploadModal(true)}
//                                             whileHover={{ scale: 1.03 }}
//                                             whileTap={{ scale: 0.98 }}
//                                         >
//                                             <span className="me-2">+</span> Upload New Paper
//                                         </motion.button>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                                     {papers.map(paper => (
//                                         <div className="col" key={paper.id}>
//                                             <motion.div
//                                                 className="card h-100 border-0 shadow-sm"
//                                                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//                                                 transition={{ duration: 0.3 }}
//                                             >
//                                                 <div className="card-body">
//                                                     <div className="d-flex justify-content-between mb-3">
//                                                         <span className={`badge ${paper.status === "Accepted" ? "text-bg-success" : paper.status === "Rejected" ? "text-bg-danger" : "text-bg-warning"}`}>
//                                                             {paper.status}
//                                                         </span>
//                                                         <small className="text-muted">{paper.uploadDate}</small>
//                                                     </div>
//                                                     <h5 className="card-title">{paper.title}</h5>
//                                                     <p className="card-text text-muted mb-3">
//                                                         Conference: {paper.conference}
//                                                     </p>
//                                                     {paper.score !== null && (
//                                                         <p className={`mb-3 ${getScoreColor(paper.score)}`}>
//                                                             Score: <strong>{paper.score.toFixed(1)}/10</strong>
//                                                         </p>
//                                                     )}
//                                                     <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
//                                                         <motion.button
//                                                             className="btn btn-sm btn-outline-primary"
//                                                             onClick={() => handleViewPaper(paper)}
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                         >
//                                                             View Details
//                                                         </motion.button>
//                                                         <motion.button
//                                                             className="btn btn-sm btn-outline-danger"
//                                                             onClick={() => handleDeletePaper(paper.id)}
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                         >
//                                                             <span>🗑️</span>
//                                                         </motion.button>
//                                                     </div>
//                                                 </div>
//                                             </motion.div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </>
//                     ) : (
//                         <div>
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <div>
//                                     <motion.button
//                                         className="btn btn-outline-secondary mb-3 d-flex align-items-center"
//                                         onClick={handleBackToGrid}
//                                         whileHover={{ scale: 1.03 }}
//                                         whileTap={{ scale: 0.95 }}
//                                     >
//                                         <span className="me-2">←</span> Back to All Papers
//                                     </motion.button>
//                                     <h4>{selectedPaper?.title}</h4>
//                                 </div>
//                                 <motion.button
//                                     className="btn btn-sm btn-outline-danger"
//                                     onClick={() => handleDeletePaper(selectedPaper.id)}
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                 >
//                                     <span className="me-1">🗑️</span> Delete
//                                 </motion.button>
//                             </div>

//                             <div className="card border-0 shadow-sm mb-4">
//                                 <div className="card-body">
//                                     <div className="row mb-4">
//                                         <div className="col-md-6">
//                                             <p>
//                                                 <strong>Conference:</strong> {selectedPaper?.conference}
//                                             </p>
//                                             <p>
//                                                 <strong>Uploaded:</strong> {selectedPaper?.uploadDate}
//                                             </p>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <p>
//                                                 <strong>Status:</strong>
//                                                 <span className={`ms-2 ${getStatusColor(selectedPaper?.status)}`}>
//                                                     {getStatusIcon(selectedPaper?.status)} {selectedPaper?.status}
//                                                 </span>
//                                             </p>
//                                             <p>
//                                                 <strong>Overall Score:</strong>
//                                                 {selectedPaper?.score ? (
//                                                     <span className={`ms-2 ${getScoreColor(selectedPaper.score)}`}>
//                                                         {selectedPaper.score.toFixed(1)} / 10
//                                                     </span>
//                                                 ) : (
//                                                     <span className="ms-2 text-muted">Pending</span>
//                                                 )}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <h5 className="mb-3">AI Reviews</h5>
//                                     {selectedPaper?.reviews.length > 0 ? (
//                                         <div className="accordion mb-4" id="reviewsAccordion">
//                                             {selectedPaper?.reviews.map((review, index) => (
//                                                 <div className="accordion-item border-0 mb-3 shadow-sm" key={index}>
//                                                     <h2 className="accordion-header" id={`heading${index}`}>
//                                                         <button
//                                                             className="accordion-button collapsed"
//                                                             type="button"
//                                                             data-bs-toggle="collapse"
//                                                             data-bs-target={`#collapse${index}`}
//                                                             aria-expanded="false"
//                                                             aria-controls={`collapse${index}`}
//                                                         >
//                                                             <div className="d-flex justify-content-between align-items-center w-100 me-3">
//                                                                 <span><strong>{review.model}</strong> Review</span>
//                                                                 {review.score && (
//                                                                     <span className={`badge ${getScoreColor(review.score)} bg-opacity-10 border ${getScoreColor(review.score)} text-dark`}>
//                                                                         Score: {review.score.toFixed(1)}
//                                                                     </span>
//                                                                 )}
//                                                             </div>
//                                                         </button>
//                                                     </h2>
//                                                     <div
//                                                         id={`collapse${index}`}
//                                                         className="accordion-collapse collapse"
//                                                         aria-labelledby={`heading${index}`}
//                                                         data-bs-parent="#reviewsAccordion"
//                                                     >
//                                                         <div className="accordion-body">
//                                                             <p>{review.content}</p>
//                                                             {review.strengths && review.strengths.length > 0 && (
//                                                                 <div className="mb-3">
//                                                                     <h6 className="text-success">Strengths:</h6>
//                                                                     <ul className="mb-0">
//                                                                         {review.strengths.map((strength, i) => (
//                                                                             <li key={i}>{strength}</li>
//                                                                         ))}
//                                                                     </ul>
//                                                                 </div>
//                                                             )}
//                                                             {review.weaknesses && review.weaknesses.length > 0 && (
//                                                                 <div>
//                                                                     <h6 className="text-danger">Weaknesses:</h6>
//                                                                     <ul className="mb-0">
//                                                                         {review.weaknesses.map((weakness, i) => (
//                                                                             <li key={i}>{weakness}</li>
//                                                                         ))}
//                                                                     </ul>
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         <div className="alert alert-info">
//                                             No AI reviews available yet. Reviews are typically completed within 1-2 days after submission.
//                                         </div>
//                                     )}

//                                     <h5 className="mb-3">Human Review</h5>
//                                     {selectedPaper?.humanReview ? (
//                                         <div className="card bg-light border-0 mb-4">
//                                             <div className="card-body">
//                                                 <div className="d-flex justify-content-between mb-3">
//                                                     <h6 className="mb-0">
//                                                         <strong>Reviewer:</strong> {selectedPaper.humanReview.reviewer}
//                                                     </h6>
//                                                     <span className="text-muted">{selectedPaper.humanReview.date}</span>
//                                                 </div>
//                                                 <p>{selectedPaper.humanReview.content}</p>
//                                                 <div className="d-flex justify-content-between align-items-center mt-3">
//                                                     <span>
//                                                         <strong>Decision:</strong>
//                                                         <span className={selectedPaper.humanReview.decision === "Accept" ? "text-success ms-2" : "text-danger ms-2"}>
//                                                             {selectedPaper.humanReview.decision}
//                                                         </span>
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className="alert alert-info">
//                                             No human review available yet. Human reviewers typically complete their assessment after the AI reviews.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Upload Modal */}
//             {showUploadModal && (
//                 <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content border-0 shadow">
//                             <div className="modal-header" style={{ background: "linear-gradient(to right, #3050A4, #70A4FF)", color: "white" }}>
//                                 <h5 className="modal-title">Upload New Paper</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close btn-close-white"
//                                     onClick={() => setShowUploadModal(false)}
//                                     disabled={submitting}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="mb-3">
//                                         <label htmlFor="title" className="form-label">Paper Title</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="title"
//                                             name="title"
//                                             value={uploadForm.title}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="conference" className="form-label">Target Conference</label>
//                                         <select
//                                             className="form-select"
//                                             id="conference"
//                                             name="conference"
//                                             value={uploadForm.conference}
//                                             onChange={handleInputChange}
//                                             required
//                                         >
//                                             <option value="">Select a conference</option>
//                                             {conferences.map(conf => (
//                                                 <option key={conf.value} value={conf.value}>{conf.label}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="file" className="form-label">Paper File (PDF)</label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             id="file"
//                                             accept=".pdf"
//                                             onChange={handleFileChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="comments" className="form-label">Additional Comments (Optional)</label>
//                                         <textarea
//                                             className="form-control"
//                                             id="comments"
//                                             name="comments"
//                                             rows="3"
//                                             value={uploadForm.comments}
//                                             onChange={handleInputChange}
//                                         ></textarea>
//                                     </div>
//                                     <div className="d-grid gap-2">
//                                         <motion.button
//                                             type="submit"
//                                             className="btn text-white"
//                                             style={{ backgroundColor: "#3050A4" }}
//                                             disabled={submitting}
//                                             whileHover={!submitting ? { scale: 1.03 } : {}}
//                                             whileTap={!submitting ? { scale: 0.98 } : {}}
//                                         >
//                                             {submitting ? (
//                                                 <>
//                                                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                     Uploading...
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <span className="me-2">📤</span> Upload Paper
//                                                 </>
//                                             )}
//                                         </motion.button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import './Home.css';

// Import components
import PaperCard from './PaperCard';
import PaperDetails from './PaperDetails';
import UploadModal from './UploadModal';
import StudentSidebar from './StudentSidebar';

// Import services (for a real app)
// import { getPapers, uploadPaper, deletePaper } from '../services/paperService';

// Mock data
import { mockPapers } from '../utils/mockData_Student';

export default function StudentDashboard() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
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
    const username = "JohnDoe"; // This would come from your auth context

    const conferences = [
        { value: "ICML", label: "International Conference on Machine Learning (ICML)" },
        { value: "ICLR", label: "International Conference on Learning Representations (ICLR)" },
        { value: "ACL", label: "Association for Computational Linguistics (ACL)" },
        { value: "NeurIPS", label: "Neural Information Processing Systems (NeurIPS)" }
    ];

    // Load mock data for papers
    useEffect(() => {
        // In a real app, this would be fetching from an API
        // For example: getPapers().then(data => setPapers(data))
        setTimeout(() => {
            setPapers(mockPapers);
            setLoading(false);
        }, 1000);
    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        // In a real app, this would be an API call
        // For example: uploadPaper(uploadForm).then(newPaper => {...})
        setTimeout(() => {
            const newPaper = {
                id: papers.length + 1,
                title: uploadForm.title,
                conference: uploadForm.conference,
                uploadDate: new Date().toISOString().split('T')[0],
                status: "In Review",
                score: null,
                reviews: [],
                humanReview: null
            };

            setPapers([...papers, newPaper]);
            setSubmitting(false);
            setShowUploadModal(false);

            setUploadAlert({
                show: true,
                message: `Your paper "${uploadForm.title}" has been uploaded successfully and is now in review. The review process typically takes 1-2 days.`
            });

            // Clear the alert after 5 seconds
            setTimeout(() => {
                setUploadAlert({ show: false, message: '' });
            }, 5000);

            setUploadForm({
                title: "",
                conference: "",
                file: null,
                comments: ""
            });
        }, 2000);
    };

    const handleDeletePaper = (id) => {
        // In a real app, this would be an API call to delete
        // For example: deletePaper(id).then(() => {...})
        setPapers(papers.filter(paper => paper.id !== id));
        if (selectedPaper && selectedPaper.id === id) {
            setSelectedPaper(null);
            setViewMode("grid");
        }
    };

    const handleViewPaper = (paper) => {
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
                            onViewPaper={handleViewPaper}
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
                                paper={selectedPaper}
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