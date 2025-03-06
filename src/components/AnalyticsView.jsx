import React from "react";
import { motion } from "framer-motion";
import OverviewCharts from "./OverviewCharts";
import SubmissionsView from "./SubmissionsView";
import DemographicsView from "./DemographicsView";
import TopicsView from "./TopicsView";
import ReviewersView from "./ReviewersView";

const AnalyticsView = ({ activeView, setActiveView, analytics }) => {
    const views = [
        { id: "overview", label: "Overview" },
        { id: "submissions", label: "Submissions" },
        { id: "demographics", label: "Demographics" },
        { id: "topics", label: "Topics" },
        { id: "reviewers", label: "Reviewers" }
    ];

    return (
        <>
            <ul className="nav nav-pills mb-4">
                {views.map(view => (
                    <li key={view.id} className="nav-item">
                        <button
                            className={`nav-link ${activeView === view.id ? "active" : ""}`}
                            onClick={() => setActiveView(view.id)}
                        >
                            {view.label}
                        </button>
                    </li>
                ))}
            </ul>

            {activeView === "overview" && <OverviewCharts analytics={analytics} />}
            {activeView === "submissions" && <SubmissionsView analytics={analytics} />}
            {activeView === "demographics" && <DemographicsView analytics={analytics} />}
            {activeView === "topics" && <TopicsView analytics={analytics} />}
            {activeView === "reviewers" && <ReviewersView analytics={analytics} />}
        </>
    );
};

export default AnalyticsView;