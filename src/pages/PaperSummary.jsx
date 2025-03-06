import React from "react";

const PaperSummary = ({ summary }) => {
    if (!summary) return null;

    const sections = [
        { id: "abstract", title: "Abstract", content: summary.abstract },
        { id: "introduction", title: "Introduction", content: summary.introduction },
        { id: "methodology", title: "Methodology", content: summary.methodology },
        { id: "results", title: "Results", content: summary.results },
        { id: "discussion", title: "Discussion", content: summary.discussion },
        { id: "conclusion", title: "Conclusion", content: summary.conclusion }
    ];

    return (
        <>
            <h5 className="mb-3">Paper Summary <small className="text-muted">(AI-generated)</small></h5>
            <div className="accordion mb-4" id="summaryAccordion">
                {sections.map((section) => (
                    <div className="accordion-item border-0 mb-2 shadow-sm" key={section.id}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${section.id}`}
                                aria-expanded="false"
                            >
                                {section.title}
                            </button>
                        </h2>
                        <div
                            id={`collapse${section.id}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#summaryAccordion"
                        >
                            <div className="accordion-body">
                                {section.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PaperSummary;