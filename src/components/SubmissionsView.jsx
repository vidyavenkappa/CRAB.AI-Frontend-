import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SubmissionsView = ({ analytics }) => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="row">
            <div className="col-lg-8 mb-4">
                <motion.div
                    className="card border-0 shadow-sm"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Submission Trends</h5>
                        <div style={{ height: "350px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analytics.monthlySubmissionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="submissions"
                                        stroke="#4361ee"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="col-lg-4 mb-4">
                <motion.div
                    className="card border-0 shadow-sm"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Score Distribution</h5>
                        <div style={{ height: "350px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "Strong Accept (>8.5)", value: analytics.strongAccept },
                                            { name: "Borderline (5-8.5)", value: analytics.borderline },
                                            { name: "Strong Reject (<5)", value: analytics.strongReject }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        <Cell fill="#28a745" />
                                        <Cell fill="#ffc107" />
                                        <Cell fill="#dc3545" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SubmissionsView;