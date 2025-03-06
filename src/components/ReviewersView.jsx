import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';

const ReviewersView = ({ analytics }) => {
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
                        <h5 className="card-title">Reviewer Workload</h5>
                        <div style={{ height: "350px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={analytics.reviewerActivityData}
                                    layout="vertical"
                                    margin={{ left: 120 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="completed" name="Completed Reviews" stackId="a" fill="#4361ee" />
                                    <Bar dataKey="pending" name="Pending Reviews" stackId="a" fill="#ffc107" />
                                </BarChart>
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
                        <h5 className="card-title">Top Reviewers</h5>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Reviewer</th>
                                        <th>Papers</th>
                                        <th>Avg. Days</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: "Dr. Johnson", papers: 12, avgDays: 3.2 },
                                        { name: "Dr. Smith", papers: 9, avgDays: 2.5 },
                                        { name: "Dr. Wang", papers: 10, avgDays: 4.1 },
                                        { name: "Dr. Garcia", papers: 6, avgDays: 1.8 },
                                        { name: "Dr. Roberts", papers: 7, avgDays: 3.5 }
                                    ].map((reviewer, index) => (
                                        <tr key={index}>
                                            <td>{reviewer.name}</td>
                                            <td>{reviewer.papers}</td>
                                            <td>{reviewer.avgDays}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="card border-0 shadow-sm mt-4"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.2 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Review Quality</h5>
                        <div className="d-flex align-items-center mb-3">
                            <div className="me-auto">
                                <strong>Average Review Length</strong>
                            </div>
                            <div>485 words</div>
                        </div>
                        <div className="progress mb-4" style={{ height: "8px" }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "75%", backgroundColor: "#4361ee" }}
                            ></div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="me-auto">
                                <strong>Average Review Score</strong>
                            </div>
                            <div>7.2/10</div>
                        </div>
                        <div className="progress mb-4" style={{ height: "8px" }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "72%", backgroundColor: "#4361ee" }}
                            ></div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="me-auto">
                                <strong>Review Consistency</strong>
                            </div>
                            <div>82%</div>
                        </div>
                        <div className="progress" style={{ height: "8px" }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "82%", backgroundColor: "#4361ee" }}
                            ></div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="col-12 mb-4">
                <motion.div
                    className="card border-0 shadow-sm"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.3 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Reviewer Agreement Rate</h5>
                        <div style={{ height: "300px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={[
                                        { month: "Jan", human_ai: 78, ai_ai: 85 },
                                        { month: "Feb", human_ai: 76, ai_ai: 88 },
                                        { month: "Mar", human_ai: 82, ai_ai: 90 },
                                        { month: "Apr", human_ai: 79, ai_ai: 87 },
                                        { month: "May", human_ai: 85, ai_ai: 92 },
                                        { month: "Jun", human_ai: 83, ai_ai: 91 }
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[50, 100]} />
                                    <Tooltip formatter={(value) => `${value}%`} />
                                    <Legend />
                                    <Line type="monotone" dataKey="human_ai" name="Human-AI Agreement" stroke="#4361ee" strokeWidth={2} />
                                    <Line type="monotone" dataKey="ai_ai" name="AI-AI Agreement" stroke="#3a0ca3" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ReviewersView;