// Brain.js configuration for local clustering and pattern recognition
import { NeuralNetwork } from 'brain.js';

// Initialize Brain.js neural network for clustering related nodes
export const initializeBrainNetwork = () => {
  const network = new NeuralNetwork({
    hiddenLayers: [4, 3],
    learningRate: 0.3,
    iterations: 20000,
    errorThresh: 0.005
  });

  return network;
};

// Training data for clustering similar concepts
const trainingData = [
  // Technology-related concepts
  { input: { concept: 'artificial intelligence' }, output: { category: 'technology' } },
  { input: { concept: 'machine learning' }, output: { category: 'technology' } },
  { input: { concept: 'data science' }, output: { category: 'technology' } },
  { input: { concept: 'programming' }, output: { category: 'technology' } },
  { input: { concept: 'software development' }, output: { category: 'technology' } },
  
  // Business-related concepts
  { input: { concept: 'marketing' }, output: { category: 'business' } },
  { input: { concept: 'sales' }, output: { category: 'business' } },
  { input: { concept: 'finance' }, output: { category: 'business' } },
  { input: { concept: 'management' }, output: { category: 'business' } },
  { input: { concept: 'strategy' }, output: { category: 'business' } },
  
  // Education-related concepts
  { input: { concept: 'learning' }, output: { category: 'education' } },
  { input: { concept: 'teaching' }, output: { category: 'education' } },
  { input: { concept: 'research' }, output: { category: 'education' } },
  { input: { concept: 'study' }, output: { category: 'education' } },
  { input: { concept: 'knowledge' }, output: { category: 'education' } },
  
  // Health-related concepts
  { input: { concept: 'wellness' }, output: { category: 'health' } },
  { input: { concept: 'fitness' }, output: { category: 'health' } },
  { input: { concept: 'nutrition' }, output: { category: 'health' } },
  { input: { concept: 'mental health' }, output: { category: 'health' } },
  { input: { concept: 'medicine' }, output: { category: 'health' } }
];

// Train the network with the training data
export const trainBrainNetwork = (network) => {
  try {
    network.train(trainingData);
    return true;
  } catch (error) {
    console.error('Error training Brain.js network:', error);
    return false;
  }
};

// Predict category for a given concept
export const predictConceptCategory = (network, concept) => {
  try {
    const result = network.run({ concept: concept.toLowerCase() });
    
    // Find the category with the highest probability
    let maxCategory = 'general';
    let maxProbability = 0;
    
    Object.entries(result).forEach(([category, probability]) => {
      if (probability > maxProbability) {
        maxProbability = probability;
        maxCategory = category;
      }
    });
    
    return {
      category: maxCategory,
      confidence: maxProbability
    };
  } catch (error) {
    console.error('Error predicting concept category:', error);
    return {
      category: 'general',
      confidence: 0
    };
  }
};

// Check if two concepts are related based on their categories
export const areConceptsRelated = (network, concept1, concept2) => {
  const category1 = predictConceptCategory(network, concept1);
  const category2 = predictConceptCategory(network, concept2);
  
  // Concepts are related if they have the same category or high confidence
  return category1.category === category2.category || 
         (category1.confidence > 0.7 && category2.confidence > 0.7);
};

// Filter out redundant or too similar suggestions
export const filterSuggestions = (network, originalNode, suggestions) => {
  return suggestions.filter(suggestion => {
    // Remove suggestions that are too similar to the original node
    if (suggestion.toLowerCase().includes(originalNode.toLowerCase()) ||
        originalNode.toLowerCase().includes(suggestion.toLowerCase())) {
      return false;
    }
    
    // Remove suggestions that are too similar to each other
    return !suggestions.some(otherSuggestion => 
      otherSuggestion !== suggestion &&
      (suggestion.toLowerCase().includes(otherSuggestion.toLowerCase()) ||
       otherSuggestion.toLowerCase().includes(suggestion.toLowerCase()))
    );
  });
};

// Cluster related nodes and filter existing concepts
export const clusterRelatedNodes = async (nodeLabel, existingNodes = []) => {
  try {
    // Initialize and train the network
    const network = initializeBrainNetwork();
    trainBrainNetwork(network);
    
    // Get the category of the current node
    const nodeCategory = predictConceptCategory(network, nodeLabel);
    
    // Filter out existing nodes that are too similar
    const filteredExisting = existingNodes.filter(existing => {
      const existingCategory = predictConceptCategory(network, existing);
      return existingCategory.category !== nodeCategory.category ||
             existing.toLowerCase() !== nodeLabel.toLowerCase();
    });
    
    return filteredExisting;
  } catch (error) {
    console.error('Error clustering related nodes:', error);
    return existingNodes;
  }
};
