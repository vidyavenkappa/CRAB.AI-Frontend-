import React from 'react';
import { motion } from 'framer-motion';
import {
    PieChart, Pie, Cell,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const TopicsView = ({ analytics }) => {
    const COLORS = ["#4361ee", "#3a0ca3", "#48bfe3", "#56cfe1", "#64dfdf", "#72efdd", "#80ffdb"];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Mock data for topic trends (replace with real data from analytics if available)
    const topicTrendsData = [
        { month: "Jan", ml: 12, cv: 8, nlp: 10, rl: 5, gnn: 3 },
        { month: "Feb", ml: 15, cv: 10, nlp: 12, rl: 6, gnn: 4 },
        { month: "Mar", ml: 18, cv: 12, nlp: 15, rl: 8, gnn: 5 },
        { month: "Apr", ml: 20, cv: 15, nlp: 18, rl: 10, gnn: 7 },
        { month: "May", ml: 25, cv: 18, nlp: 20, rl: 12, gnn: 9 },
        { month: "Jun", ml: 22, cv: 20, nlp: 22, rl: 15, gnn: 12 }
    ];

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
                        <h5 className="card-title">Papers by Topic</h5>
                        <div style={{ height: "350px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analytics.topicData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                                    >
                                        {analytics.topicData.map((entry, index) => (
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
                        <h5 className="card-title">Average Score by Topic</h5>
                        <div style={{ height: "350px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart
                                    outerRadius={150}
                                    width={730}
                                    height={350}
                                    data={analytics.scoreByTopic}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="name" />
                                    <PolarRadiusAxis angle={30} domain={[0, 10]} />
                                    <Radar
                                        name="Average Score"
                                        dataKey="score"
                                        stroke="#4361ee"
                                        fill="#4361ee"
                                        fillOpacity={0.6}
                                    />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="col-12 mb-4">
                <motion.div
                    className="card border-0 shadow-sm"
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.2 }}
                    variants={fadeInUp}
                >
                    <div className="card-body">
                        <h5 className="card-title">Topic Trends</h5>
                        <div style={{ height: "300px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={topicTrendsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="ml" name="Machine Learning" stroke="#4361ee" strokeWidth={2} />
                                    <Line type="monotone" dataKey="cv" name="Computer Vision" stroke="#3a0ca3" strokeWidth={2} />
                                    <Line type="monotone" dataKey="nlp" name="NLP" stroke="#48bfe3" strokeWidth={2} />
                                    <Line type="monotone" dataKey="rl" name="Reinforcement Learning" stroke="#56cfe1" strokeWidth={2} />
                                    <Line type="monotone" dataKey="gnn" name="Graph Neural Networks" stroke="#64dfdf" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TopicsView;