export const mockPapers = [
    {
      id: 1,
      title: "Advances in Natural Language Processing with Transformer Models",
      conference: "ACL",
      uploadDate: "2023-02-15",
      status: "Accepted",
      score: 8.7,
      reviews: [
        {
          model: "Gemini",
          content: "This paper presents a comprehensive analysis of recent advances in natural language processing using transformer models. The methodology is sound, and the experimental results are convincing. The discussion section could be expanded to address potential limitations.",
          score: 8.5,
          strengths: ["Strong methodology", "Comprehensive literature review", "Clear presentation"],
          weaknesses: ["Limited discussion of limitations", "Some experimental results need more explanation"]
        },
        {
          model: "Claude",
          content: "The paper provides valuable insights into transformer-based NLP models. The theoretical framework is well-established, and the practical implementations demonstrate the effectiveness of the proposed approaches. However, the evaluation metrics could be more diverse to provide a more holistic assessment.",
          score: 9.0,
          strengths: ["Excellent theoretical framework", "Strong practical demonstrations", "Clear writing"],
          weaknesses: ["Limited evaluation metrics", "Some claims need stronger evidence"]
        },
        {
          model: "ChatGPT",
          content: "This work makes a significant contribution to the field of NLP. The authors have thoroughly explored the capabilities of transformer models and provided empirical evidence for their effectiveness. The paper could benefit from more ablation studies to isolate the effects of individual components.",
          score: 8.5,
          strengths: ["Significant contribution", "Thorough exploration", "Strong empirical evidence"],
          weaknesses: ["Lack of ablation studies", "Some technical details are missing"]
        }
      ],
      humanReview: {
        reviewer: "Dr. Smith",
        content: "I concur with the AI reviews. This is a solid paper with strong methodology and clear presentation. The authors have addressed a significant challenge in the field and provided valuable insights. I recommend acceptance.",
        decision: "Accept",
        date: "2023-03-10"
      }
    },
    {
      id: 2,
      title: "Reinforcement Learning in Dynamic Environments",
      conference: "NeurIPS",
      uploadDate: "2023-01-20",
      status: "Rejected",
      score: 5.3,
      reviews: [
        {
          model: "Gemini",
          content: "The paper explores an interesting problem in reinforcement learning, but falls short in several areas. The methodology lacks rigor, and the experimental results are not sufficiently convincing. The theoretical contribution is limited, and the empirical evaluation does not adequately support the claims made.",
          score: 5.0,
          strengths: ["Interesting problem domain", "Clear motivation"],
          weaknesses: ["Weak methodology", "Unconvincing results", "Limited theoretical contribution"]
        },
        {
          model: "Claude",
          content: "This paper addresses an important challenge in reinforcement learning, but the approach taken has several limitations. The experimental setup is not well-designed to test the hypotheses, and the results are not statistically significant. The literature review omits several key recent works.",
          score: 5.5,
          strengths: ["Important problem", "Clear writing"],
          weaknesses: ["Poor experimental design", "Missing key references", "Results lack statistical significance"]
        },
        {
          model: "ChatGPT",
          content: "While the paper tackles a relevant problem, the proposed method does not show substantial improvement over existing approaches. The evaluation metrics are standard but the performance gains are marginal at best. The paper would benefit from a more thorough analysis of why the method works (or doesn't) in certain scenarios.",
          score: 5.4,
          strengths: ["Relevant problem", "Standard evaluation metrics"],
          weaknesses: ["Marginal improvements", "Insufficient analysis", "Limited novelty"]
        }
      ],
      humanReview: {
        reviewer: "Dr. Johnson",
        content: "I agree with the AI reviewers that this paper, while addressing an important topic, has significant methodological weaknesses. The experimental results do not support the claims made, and the contribution relative to existing work is not sufficiently novel. I recommend rejection.",
        decision: "Reject",
        date: "2023-02-15"
      }
    },
    {
      id: 3,
      title: "A Novel Approach to Semi-Supervised Learning",
      conference: "ICLR",
      uploadDate: "2023-03-01",
      status: "In Review",
      score: null,
      reviews: [
        {
          model: "Gemini",
          content: "This paper presents an interesting approach to semi-supervised learning. The method is innovative and the theoretical foundations are sound. However, the experimental evaluation could be more comprehensive, including more datasets and comparison methods.",
          score: 7.5,
          strengths: ["Novel approach", "Sound theoretical foundation", "Clear writing"],
          weaknesses: ["Limited experimental evaluation", "Few comparison methods", "Some assumptions are not fully justified"]
        },
        {
          model: "Claude",
          content: "The proposed method for semi-supervised learning has potential merit. The authors provide a good theoretical analysis and the approach is well-motivated. However, the experimental section needs improvement, with more rigorous evaluation and comparison to state-of-the-art methods.",
          score: 7.0,
          strengths: ["Good theoretical analysis", "Well-motivated approach", "Novel perspective"],
          weaknesses: ["Needs more rigorous evaluation", "Missing comparisons to SOTA", "Some results are inconclusive"]
        }
      ],
      humanReview: null // No human review yet
    },
    {
      id: 4,
      title: "Efficient Transformers for Computer Vision Tasks",
      conference: "ICLR",
      uploadDate: "2023-02-20",
      status: "In Review",
      score: null,
      reviews: [],
      humanReview: null
    },
    {
      id: 5,
      title: "Multi-Agent Reinforcement Learning for Autonomous Driving",
      conference: "NeurIPS",
      uploadDate: "2023-02-28",
      status: "In Review",
      score: null,
      reviews: [],
      humanReview: null
    }
  ];