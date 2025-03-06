import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UploadPaper() {
    const [file, setFile] = useState(null);
    const [conference, setConference] = useState("ICML");
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("conference", conference);
        formData.append("author_id", localStorage.getItem("user_id")); // Ensure user_id is stored after login

        setUploading(true);

        try {
            const response = await axios.post("http://localhost:8000/papers/upload_paper", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert(response.data.message);
            navigate("/student-dashboard"); // Redirect after upload
        } catch (error) {
            alert("Failed to upload paper.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "500px", borderRadius: "15px" }}>
                <h2 className="text-center mb-4" style={{ color: "#F28482" }}>Upload Your Research Paper</h2>

                {/* Conference Selection */}
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#84A59D" }}>Select Conference</label>
                    <select
                        className="form-select border-0 shadow-sm"
                        style={{ backgroundColor: "#F5CAC3", color: "#333" }}
                        value={conference}
                        onChange={(e) => setConference(e.target.value)}
                    >
                        <option value="ICML">ICML</option>
                        <option value="ICLR">ICLR</option>
                        <option value="ACL">ACL</option>
                        <option value="NeurIPS">NeurIPS</option>
                    </select>
                </div>

                {/* File Upload */}
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#F6BD60" }}>Upload Paper (PDF only)</label>
                    <input
                        type="file"
                        accept=".pdf"
                        className="form-control border-0 shadow-sm"
                        style={{ backgroundColor: "#F7EDE2", color: "#333" }}
                        onChange={handleFileChange}
                    />
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="btn btn-lg w-100 text-white shadow-sm"
                    style={{ backgroundColor: uploading ? "#84A59D" : "#F28482" }}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload Paper"}
                </button>
            </div>
        </div>
    );
}
