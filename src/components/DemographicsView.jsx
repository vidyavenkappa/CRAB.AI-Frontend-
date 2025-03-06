import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DemographicsView = ({ analytics }) => {
    const COLORS = ["#4361ee", "#3a0ca3", "#48bfe3", "#56cfe1", "#64dfdf", "#72efdd", "#80ffdb"];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="row">
            <div className="col-lg-6 mb-4">
                <motion.div
                    className="card border-0 shadow-sm"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Papers by Region</h5>
                        <div style={{ height: "350px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analytics.regionData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value} (${(value / analytics.totalPapers * 100).toFixed(0)}%)`}
                                    >
                                        {analytics.regionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="col-lg-6 mb-4">
                <motion.div
                    className="card border-0 shadow-sm"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Top 10 Universities</h5>
                        <div style={{ height: "350px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={analytics.universityData}
                                    layout="vertical"
                                    margin={{ left: 150 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#4361ee" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DemographicsView;