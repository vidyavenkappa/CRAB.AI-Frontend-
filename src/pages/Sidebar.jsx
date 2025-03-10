import React from "react";
import { topics } from "../utils/mockData";

const Sidebar = ({ filters, handleFilterChange, reviewGuidelineUrl, handleGuidelineUrlChange, papers }) => {
    // Get unique universities and regions from papers
    const universities = Array.from(new Set(papers.map(p => p.university)));
    const regions = Array.from(new Set(papers.map(p => p.region)));

    return (
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0">
                <h5 className="mb-0">Filters</h5>
            </div>
            <div className="card-body">
                {/* <div className="mb-3">
                    <label className="form-label">Topic</label>
                    <select
                        className="form-select"
                        name="topic"
                        value={filters.topic}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Topics</option>
                        {topics.map(topic => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">University</label>
                    <select
                        className="form-select"
                        name="university"
                        value={filters.university}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Universities</option>
                        {universities.map(uni => (
                            <option key={uni} value={uni}>{uni}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Region</label>
                    <select
                        className="form-select"
                        name="region"
                        value={filters.region}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Regions</option>
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div> */}
                {/* <div className="mb-3">
                    <label className="form-label">Review Guidelines URL</label>
                    <input
                        type="url"
                        className="form-control"
                        placeholder="Enter URL to conference guidelines"
                        value={reviewGuidelineUrl}
                        onChange={handleGuidelineUrlChange}
                    />
                    <div className="form-text">
                        This URL will be used by the AI to follow specific conference review guidelines.
                    </div>
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Review Guidelines</label>
                    <ul className="nav nav-tabs" id="guidelinesTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="text-tab" data-bs-toggle="tab" data-bs-target="#text" type="button" role="tab" aria-controls="text" aria-selected="true">
                                Enter Text
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="file-tab" data-bs-toggle="tab" data-bs-target="#file" type="button" role="tab" aria-controls="file" aria-selected="false">
                                Upload File
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content mt-3" id="guidelinesTabContent">
                        <div className="tab-pane fade show active" id="text" role="tabpanel" aria-labelledby="text-tab">
                            <textarea
                                className="form-control"
                                placeholder="Enter conference review guidelines"
                                value={reviewGuidelines}
                                onChange={handleGuidelineChange}
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="tab-pane fade" id="file" role="tabpanel" aria-labelledby="file-tab">
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleGuidelineFileUpload}
                            />
                        </div>
                    </div>
                    <div className="form-text">
                        Choose to either enter the review guidelines as text or upload a file. The AI will use this to follow specific conference review guidelines.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;