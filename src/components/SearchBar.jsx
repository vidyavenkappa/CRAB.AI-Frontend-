import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch, placeholder = "Search papers..." }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState({
        author: "",
        dateFrom: "",
        dateTo: "",
        scoreMin: "",
        scoreMax: ""
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (!showAdvanced) {
            onSearch(e.target.value, null);
        }
    };

    const handleAdvancedFilterChange = (e) => {
        const { name, value } = e.target;
        setAdvancedFilters({
            ...advancedFilters,
            [name]: value
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, showAdvanced ? advancedFilters : null);
    };

    const toggleAdvancedSearch = () => {
        setShowAdvanced(!showAdvanced);
    };

    return (
        <div className="search-container mb-4">
            <form onSubmit={handleSearchSubmit}>
                <div
                    className="search-box position-relative"
                    onFocus={() => setIsExpanded(true)}
                    onBlur={() => !showAdvanced && setIsExpanded(false)}
                >
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="fas fa-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder={placeholder}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            aria-label="Search papers"
                        />
                        <motion.button
                            type="button"
                            className="btn btn-outline-secondary d-flex align-items-center"
                            whileHover={{ backgroundColor: "#f8f9fa" }}
                            onClick={toggleAdvancedSearch}
                        >
                            <i className={`fas fa-sliders-h me-2 ${showAdvanced ? "text-primary" : ""}`}></i>
                            <span className="d-none d-md-inline">Advanced</span>
                        </motion.button>
                        <motion.button
                            type="submit"
                            className="btn primary-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Search
                        </motion.button>
                    </div>
                </div>

                {showAdvanced && (
                    <motion.div
                        className="advanced-search-panel card shadow-sm border-0 mt-2 p-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="mb-2">
                                    <label className="form-label small fw-medium">Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by author name"
                                        name="author"
                                        value={advancedFilters.author}
                                        onChange={handleAdvancedFilterChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-2">
                                            <label className="form-label small fw-medium">Min Score</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                name="scoreMin"
                                                value={advancedFilters.scoreMin}
                                                onChange={handleAdvancedFilterChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-2">
                                            <label className="form-label small fw-medium">Max Score</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="10"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                name="scoreMax"
                                                value={advancedFilters.scoreMax}
                                                onChange={handleAdvancedFilterChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">
                                    <label className="form-label small fw-medium">From Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="dateFrom"
                                        value={advancedFilters.dateFrom}
                                        onChange={handleAdvancedFilterChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">
                                    <label className="form-label small fw-medium">To Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="dateTo"
                                        value={advancedFilters.dateTo}
                                        onChange={handleAdvancedFilterChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;