// Helper function to get color based on score
export const getScoreColor = (score) => {
    if (!score) return "";
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-danger";
  };
  
  // Helper function to calculate average score from reviews
  export const getAverageScore = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const sum = reviews.reduce((acc, review) => acc + review.score, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  // Helper function to format date
  export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Helper function to truncate text with ellipsis
  export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Helper function to categorize papers based on score
  export const categorizePapersByScore = (papers) => {
    return papers.reduce((acc, paper) => {
      if (!paper.reviews || paper.reviews.length === 0) {
        acc.needMoreReviews.push(paper);
        return acc;
      }
      
      const avgScore = parseFloat(getAverageScore(paper.reviews));
      
      if (avgScore >= 8.5) {
        acc.strongAccept.push(paper);
      } else if (avgScore <= 5.0) {
        acc.strongReject.push(paper);
      } else {
        acc.borderline.push(paper);
      }
      
      return acc;
    }, { strongAccept: [], strongReject: [], borderline: [], needMoreReviews: [] });
  };
  
  // Helper function to group papers by various attributes
  export const groupPapersBy = (papers, attribute) => {
    return papers.reduce((acc, paper) => {
      const key = paper[attribute];
      if (!key) return acc;
      
      if (!acc[key]) {
        acc[key] = [];
      }
      
      acc[key].push(paper);
      return acc;
    }, {});
  };