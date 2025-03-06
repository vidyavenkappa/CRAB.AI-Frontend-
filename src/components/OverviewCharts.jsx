import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OverviewCharts = ({ analytics }) => {
    const COLORS = ["#4361ee", "#3a0ca3", "#48bfe3", "#56cfe1", "#64dfdf", "#72efdd", "#80ffdb"];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="row">
            {/* Decision Distribution Pie Chart */}
            <div className="col-lg-6 mb-4">
                <motion.div
                    className="card border-0 shadow-sm"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Decision Distribution</h5>
                        <div style={{ height: "300px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "Accepted", value: analytics.acceptedPapers },
                                            { name: "Rejected", value: analytics.rejectedPapers },
                                            { name: "In Review", value: analytics.inReviewPapers }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {[
                                            { name: "Accepted", color: "#28a745" },
                                            { name: "Rejected", color: "#dc3545" },
                                            { name: "In Review", color: "#ffc107" }
                                        ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Monthly Submissions Bar Chart */}
            <div className="col-lg-6 mb-4">
                <motion.div
                    className="card border-0 shadow-sm"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Monthly Submissions</h5>
                        <div style={{ height: "300px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analytics.monthlySubmissionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="submissions" fill="#4361ee" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OverviewCharts;