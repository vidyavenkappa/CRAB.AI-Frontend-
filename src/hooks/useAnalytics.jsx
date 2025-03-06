// src/hooks/useAnalytics.js
import { useMemo } from 'react';

const useAnalytics = (papers) => {
    return useMemo(() => {
        const totalPapers = papers.length;
        const acceptedPapers = papers.filter(p => p.status === "Accepted").length;
        const rejectedPapers = papers.filter(p => p.status === "Rejected").length;
        const inReviewPapers = papers.filter(p => p.status === "In Review").length;

        // Calculate strong accept/reject
        const strongAccept = papers.filter(p => {
            if (!p.reviews || p.reviews.length === 0) return false;
            const avgScore = p.reviews.reduce((sum, review) => sum + review.score, 0) / p.reviews.length;
            return avgScore >= 8.5;
        }).length;

        const strongReject = papers.filter(p => {
            if (!p.reviews || p.reviews.length === 0) return false;
            const avgScore = p.reviews.reduce((sum, review) => sum + review.score, 0) / p.reviews.length;
            return avgScore <= 5.0;
        }).length;

        const borderline = totalPapers - strongAccept - strongReject - (papers.filter(p => !p.reviews || p.reviews.length === 0).length);

        // Papers by region
        const regionData = [];
        const regionCounts = papers.reduce((acc, paper) => {
            acc[paper.region] = (acc[paper.region] || 0) + 1;
            return acc;
        }, {});

        Object.keys(regionCounts).forEach(region => {
            regionData.push({
                name: region,
                value: regionCounts[region],
                percentage: Math.round((regionCounts[region] / totalPapers) * 100)
            });
        });

        // Papers by university
        const universityData = [];
        const universityCounts = papers.reduce((acc, paper) => {
            acc[paper.university] = (acc[paper.university] || 0) + 1;
            return acc;
        }, {});

        Object.entries(universityCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .forEach(([university, count]) => {
                universityData.push({
                    name: university,
                    value: count,
                    percentage: Math.round((count / totalPapers) * 100)
                });
            });

        // Papers by topic
        const topicData = [];
        const topicCounts = papers.reduce((acc, paper) => {
            acc[paper.topic] = (acc[paper.topic] || 0) + 1;
            return acc;
        }, {});

        Object.keys(topicCounts).forEach(topic => {
            topicData.push({
                name: topic,
                value: topicCounts[topic],
                percentage: Math.round((topicCounts[topic] / totalPapers) * 100)
            });
        });

        // Average score by topic
        const scoreByTopic = [];

        Object.keys(topicCounts).forEach(topic => {
            const topicPapers = papers.filter(p => p.topic === topic && p.reviews && p.reviews.length > 0);
            if (topicPapers.length === 0) return;

            const totalScore = topicPapers.reduce((sum, paper) => {
                const avgPaperScore = paper.reviews.reduce((s, review) => s + review.score, 0) / paper.reviews.length;
                return sum + avgPaperScore;
            }, 0);

            const avgScore = totalScore / topicPapers.length;

            scoreByTopic.push({
                name: topic,
                score: parseFloat(avgScore.toFixed(2))
            });
        });

        // Monthly submission data
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const submissionsByMonth = Array(12).fill(0);

        papers.forEach(paper => {
            const date = new Date(paper.uploadDate);
            const month = date.getMonth();
            submissionsByMonth[month]++;
        });

        const monthlySubmissionData = submissionsByMonth.map((count, index) => ({
            name: monthNames[index],
            submissions: count
        }));

        // Reviewer activity data (mock data for demo)
        const reviewerActivityData = [
            { name: "Dr. Johnson", completed: 12, pending: 3 },
            { name: "Dr. Smith", completed: 9, pending: 1 },
            { name: "Dr. Roberts", completed: 7, pending: 5 },
            { name: "Dr. Wang", completed: 10, pending: 2 },
            { name: "Dr. Garcia", completed: 6, pending: 4 }
        ];

        return {
            totalPapers,
            acceptedPapers,
            rejectedPapers,
            inReviewPapers,
            strongAccept,
            strongReject,
            borderline,
            regionData,
            universityData,
            topicData,
            scoreByTopic,
            monthlySubmissionData,
            reviewerActivityData,
            acceptRate: totalPapers > 0 ? Math.round((acceptedPapers / totalPapers) * 100) : 0,
            averageScore: papers.filter(p => p.reviews && p.reviews.length > 0).length > 0
                ? (papers.filter(p => p.reviews && p.reviews.length > 0).reduce((sum, paper) => {
                    return sum + (paper.reviews.reduce((s, review) => s + review.score, 0) / paper.reviews.length);
                }, 0) / papers.filter(p => p.reviews && p.reviews.length > 0).length).toFixed(1)
                : 0
        };
    }, [papers]);
};

export default useAnalytics;