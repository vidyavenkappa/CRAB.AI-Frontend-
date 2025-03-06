export const mockPapers = [
  {
    id: 1,
    title: "Advances in Natural Language Processing with Transformer Models",
    author: "Alice Johnson",
    university: "Stanford University",
    region: "North America",
    conference: "ACL",
    topic: "Natural Language Processing",
    uploadDate: "2023-02-15",
    status: "Accepted",
    score: 8.7,
    pdfUrl: "#",
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
    finalDecision: {
      reviewer: "Dr. Smith",
      comments: "I concur with the AI reviews. This is a solid paper with strong methodology and clear presentation. The authors have addressed a significant challenge in the field and provided valuable insights.",
      decision: "Accept",
      date: "2023-03-10"
    },
    summary: {
      overview: "This paper presents advancements in natural language processing utilizing transformer architectures. The work builds upon established transformer models and introduces several optimizations to improve performance on benchmark NLP tasks.",
      methodology: "The authors employ a multi-stage training approach with a novel attention mechanism. Experiments are conducted on standard NLP benchmarks including GLUE, SuperGLUE, and several machine translation datasets.",
      results: "The proposed approach demonstrates significant improvements over baseline models, with an average 3.2% increase in performance across all benchmarks. The most substantial gains were observed in tasks requiring complex reasoning.",
      contributions: "The main contributions include: (1) a modified attention mechanism that reduces computational complexity while maintaining performance, (2) a new pre-training objective specifically designed for improved transfer learning, and (3) comprehensive evaluations across multiple NLP tasks."
    }
  },
  {
    id: 2,
    title: "Reinforcement Learning in Dynamic Environments",
    author: "Michael Chen",
    university: "MIT",
    region: "North America",
    conference: "NeurIPS",
    topic: "Reinforcement Learning",
    uploadDate: "2023-01-20",
    status: "Rejected",
    score: 5.3,
    pdfUrl: "#",
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
    finalDecision: {
      reviewer: "Dr. Johnson",
      comments: "I agree with the AI reviewers that this paper, while addressing an important topic, has significant methodological weaknesses. The experimental results do not support the claims made, and the contribution relative to existing work is not sufficiently novel.",
      decision: "Reject",
      date: "2023-02-15"
    },
    summary: {
      overview: "This paper proposes a new approach to reinforcement learning in dynamic environments where state transitions are non-stationary. The authors aim to address challenges in adapting to changing environment dynamics.",
      methodology: "The authors introduce a meta-learning framework that attempts to generalize across different environment dynamics. The approach uses a combination of model-based RL with an adaptive component that predicts changes in environment dynamics.",
      results: "The method shows modest improvements in simple toy environments but fails to demonstrate significant advantages in more complex benchmarks. The gains are typically less than 5% over baseline approaches and lack statistical significance in several experiments.",
      contributions: "The main claimed contributions are: (1) a framework for adapting to non-stationary environments, (2) a meta-learning approach for quick adaptation, and (3) empirical results on a range of environments with varying degrees of non-stationarity."
    }
  },
  {
    id: 3,
    title: "A Novel Approach to Semi-Supervised Learning",
    author: "Sarah Williams",
    university: "University of Cambridge",
    region: "Europe",
    conference: "ICLR",
    topic: "Machine Learning",
    uploadDate: "2023-03-01",
    status: "In Review",
    score: null,
    pdfUrl: "#",
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
    finalDecision: null,
    summary: {
      overview: "This paper introduces a novel semi-supervised learning approach that leverages unlabeled data more effectively. The authors propose a method that combines consistency regularization with a new uncertainty-aware pseudo-labeling technique.",
      methodology: "The approach integrates a teacher-student model with dynamic thresholding for pseudo-label selection. The authors employ a curriculum learning strategy where the model gradually incorporates more difficult examples as training progresses.",
      results: "Preliminary results show improvements over traditional semi-supervised methods on CIFAR-10, SVHN, and ImageNet datasets, particularly in low-label regimes (1-5% labeled data). The method appears to be more robust to noisy labels compared to existing approaches.",
      contributions: "The main contributions include: (1) a new uncertainty-aware pseudo-labeling technique, (2) a dynamic thresholding mechanism for reliable pseudo-label selection, and (3) empirical validation on standard semi-supervised learning benchmarks."
    }
  },
  {
    id: 4,
    title: "Efficient Transformers for Computer Vision Tasks",
    author: "James Rodriguez",
    university: "ETH Zurich",
    region: "Europe",
    conference: "ICLR",
    topic: "Computer Vision",
    uploadDate: "2023-02-20",
    status: "In Review",
    score: null,
    pdfUrl: "#",
    reviews: [],
    finalDecision: null,
    summary: {
      overview: "This paper addresses computational efficiency challenges in vision transformers. The authors propose architectural modifications to reduce compute requirements while maintaining or improving performance on standard vision tasks.",
      methodology: "The approach introduces a sparse attention mechanism coupled with hierarchical feature representation. The authors employ a novel parameter sharing strategy and adaptive computation based on input complexity.",
      results: "Preliminary results indicate a 40% reduction in FLOPs and 30% decrease in inference time compared to standard Vision Transformers, while maintaining comparable accuracy on ImageNet and COCO.",
      contributions: "The main contributions claim to be: (1) a more efficient transformer architecture for vision tasks, (2) novel attention mechanisms that reduce computational complexity, and (3) comprehensive benchmarking on multiple vision tasks including classification, detection, and segmentation."
    }
  },
  {
    id: 5,
    title: "Multi-Agent Reinforcement Learning for Autonomous Driving",
    author: "Emma Rodriguez",
    university: "University of Tokyo",
    region: "Asia",
    conference: "NeurIPS",
    topic: "Reinforcement Learning",
    uploadDate: "2023-02-28",
    status: "In Review",
    score: null,
    pdfUrl: "#",
    reviews: [],
    finalDecision: null,
    summary: {
      overview: "This paper investigates multi-agent reinforcement learning (MARL) approaches for cooperative autonomous driving scenarios. The work focuses on intersection navigation and highway merging as test cases.",
      methodology: "The authors develop a centralized training with decentralized execution (CTDE) framework with a novel communication protocol between agents. The approach incorporates attention mechanisms to focus on relevant nearby vehicles.",
      results: "Initial results from simulation environments show improved coordination between autonomous vehicles and reduced collision rates compared to baseline approaches. The method appears particularly effective in dense traffic scenarios.",
      contributions: "The claimed contributions include: (1) a new MARL framework specifically designed for autonomous driving, (2) an inter-vehicle communication protocol that enhances coordination, and (3) empirical evaluation in realistic driving simulators."
    }
  },
  {
    id: 6,
    title: "Federated Learning with Heterogeneous Devices",
    author: "David Park",
    university: "Seoul National University",
    region: "Asia",
    conference: "ICML",
    topic: "Federated Learning",
    uploadDate: "2023-02-25",
    status: "In Review",
    score: null,
    pdfUrl: "#",
    reviews: [],
    finalDecision: null,
    summary: {
      overview: "This paper addresses challenges in federated learning when dealing with highly heterogeneous client devices with varying computational capabilities and data distributions.",
      methodology: "The authors propose an adaptive aggregation approach that accounts for device heterogeneity and data distribution skew. The method employs personalized model components for each client while maintaining a shared global model.",
      results: "Simulations with realistic device profiles show improved convergence rates and final model accuracy compared to standard federated averaging, especially in scenarios with high device heterogeneity.",
      contributions: "The main contributions include: (1) a framework for handling extreme device heterogeneity in federated learning, (2) techniques for balancing personalization and global model performance, and (3) comprehensive evaluation across different heterogeneity settings."
    }
  }
];