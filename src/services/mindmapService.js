// Mind map service for Firebase operations
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

// Collection name for mind maps
const MINDMAPS_COLLECTION = 'mindmaps';

// Create a new mind map
export const createMindMap = async (userId, initialData = {}) => {
  try {
    const mapId = uuidv4();
    const mindMapData = {
      mapId,
      userId,
      title: initialData.title || 'Untitled Mind Map',
      description: initialData.description || '',
      nodes: initialData.nodes || [
        {
          id: uuidv4(),
          label: 'Central Idea',
          x: 0,
          y: 0,
          z: 0,
          color: '#3B82F6',
          size: 1.2,
          createdAt: new Date().toISOString()
        }
      ],
      edges: initialData.edges || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      version: 1
    };

    const docRef = await addDoc(collection(db, MINDMAPS_COLLECTION), mindMapData);
    return { id: docRef.id, ...mindMapData };
  } catch (error) {
    console.error('Error creating mind map:', error);
    throw error;
  }
};

// Get all mind maps for a user
export const getUserMindMaps = async (userId) => {
  try {
    const q = query(
      collection(db, MINDMAPS_COLLECTION),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const mindMaps = [];
    
    querySnapshot.forEach((doc) => {
      mindMaps.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return mindMaps;
  } catch (error) {
    console.error('Error fetching user mind maps:', error);
    throw error;
  }
};

// Get a specific mind map by ID
export const getMindMap = async (mapId) => {
  try {
    const q = query(
      collection(db, MINDMAPS_COLLECTION),
      where('mapId', '==', mapId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Mind map not found');
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error fetching mind map:', error);
    throw error;
  }
};

// Update a mind map
export const updateMindMap = async (docId, updates) => {
  try {
    const docRef = doc(db, MINDMAPS_COLLECTION, docId);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp(),
      version: (updates.version || 0) + 1
    };
    
    await updateDoc(docRef, updateData);
    return updateData;
  } catch (error) {
    console.error('Error updating mind map:', error);
    throw error;
  }
};

// Delete a mind map
export const deleteMindMap = async (docId) => {
  try {
    const docRef = doc(db, MINDMAPS_COLLECTION, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting mind map:', error);
    throw error;
  }
};

// Add a new node to a mind map
export const addNode = async (docId, nodeData) => {
  try {
    const mindMap = await getMindMap(docId);
    const newNode = {
      id: uuidv4(),
      label: nodeData.label || 'New Node',
      x: nodeData.x || Math.random() * 10 - 5,
      y: nodeData.y || Math.random() * 10 - 5,
      z: nodeData.z || Math.random() * 10 - 5,
      color: nodeData.color || '#6B7280',
      size: nodeData.size || 1,
      createdAt: new Date().toISOString(),
      ...nodeData
    };
    
    const updatedNodes = [...mindMap.nodes, newNode];
    
    await updateMindMap(docId, {
      nodes: updatedNodes,
      version: mindMap.version
    });
    
    return newNode;
  } catch (error) {
    console.error('Error adding node:', error);
    throw error;
  }
};

// Update a node in a mind map
export const updateNode = async (docId, nodeId, updates) => {
  try {
    const mindMap = await getMindMap(docId);
    const updatedNodes = mindMap.nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    );
    
    await updateMindMap(docId, {
      nodes: updatedNodes,
      version: mindMap.version
    });
    
    return updatedNodes.find(node => node.id === nodeId);
  } catch (error) {
    console.error('Error updating node:', error);
    throw error;
  }
};

// Delete a node from a mind map
export const deleteNode = async (docId, nodeId) => {
  try {
    const mindMap = await getMindMap(docId);
    
    // Remove the node
    const updatedNodes = mindMap.nodes.filter(node => node.id !== nodeId);
    
    // Remove any edges connected to this node
    const updatedEdges = mindMap.edges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    );
    
    await updateMindMap(docId, {
      nodes: updatedNodes,
      edges: updatedEdges,
      version: mindMap.version
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting node:', error);
    throw error;
  }
};

// Add an edge between two nodes
export const addEdge = async (docId, sourceId, targetId) => {
  try {
    const mindMap = await getMindMap(docId);
    
    // Check if edge already exists
    const edgeExists = mindMap.edges.some(edge => 
      (edge.source === sourceId && edge.target === targetId) ||
      (edge.source === targetId && edge.target === sourceId)
    );
    
    if (edgeExists) {
      throw new Error('Edge already exists between these nodes');
    }
    
    const newEdge = {
      id: uuidv4(),
      source: sourceId,
      target: targetId,
      createdAt: new Date().toISOString()
    };
    
    const updatedEdges = [...mindMap.edges, newEdge];
    
    await updateMindMap(docId, {
      edges: updatedEdges,
      version: mindMap.version
    });
    
    return newEdge;
  } catch (error) {
    console.error('Error adding edge:', error);
    throw error;
  }
};

// Delete an edge between two nodes
export const deleteEdge = async (docId, edgeId) => {
  try {
    const mindMap = await getMindMap(docId);
    const updatedEdges = mindMap.edges.filter(edge => edge.id !== edgeId);
    
    await updateMindMap(docId, {
      edges: updatedEdges,
      version: mindMap.version
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting edge:', error);
    throw error;
  }
};

// Check if user has reached their mind map limit
export const checkUserMapLimit = async (userId, userPlan = 'free') => {
  try {
    const mindMaps = await getUserMindMaps(userId);
    const freeLimit = parseInt(import.meta.env.VITE_FREE_MAPS_LIMIT) || 5;
    const premiumLimit = parseInt(import.meta.env.VITE_PREMIUM_MAPS_LIMIT) || -1;
    
    const limit = userPlan === 'premium' ? premiumLimit : freeLimit;
    
    if (limit === -1) {
      return { canCreate: true, currentCount: mindMaps.length, limit: 'unlimited' };
    }
    
    return {
      canCreate: mindMaps.length < limit,
      currentCount: mindMaps.length,
      limit: limit
    };
  } catch (error) {
    console.error('Error checking user map limit:', error);
    return { canCreate: false, currentCount: 0, limit: 0 };
  }
};

// Load a mind map by mapId and userId
export const loadMindMap = async (mapId, userId) => {
  try {
    if (!mapId || !userId) {
      throw new Error('Map ID and User ID are required');
    }

    const q = query(
      collection(db, MINDMAPS_COLLECTION),
      where('mapId', '==', mapId),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error loading mind map:', error);
    throw error;
  }
};

// Save a mind map (update existing or create new)
export const saveMindMap = async (mapId, userId, mindMapData) => {
  try {
    if (!mapId || !userId) {
      throw new Error('Map ID and User ID are required');
    }

    // Try to find existing mind map
    const existingMap = await loadMindMap(mapId, userId);
    
    if (existingMap) {
      // Update existing mind map
      const docRef = doc(db, MINDMAPS_COLLECTION, existingMap.id);
      const updateData = {
        nodes: mindMapData.nodes || [],
        edges: mindMapData.edges || [],
        updatedAt: serverTimestamp(),
        version: (existingMap.version || 0) + 1
      };
      
      await updateDoc(docRef, updateData);
      return { id: existingMap.id, ...existingMap, ...updateData };
    } else {
      // Create new mind map
      const newMindMap = {
        mapId,
        userId,
        title: mindMapData.title || 'Untitled Mind Map',
        description: mindMapData.description || '',
        nodes: mindMapData.nodes || [
          {
            id: uuidv4(),
            label: 'Central Idea',
            x: 0,
            y: 0,
            z: 0,
            color: '#667eea',
            size: 1.5,
            createdAt: new Date().toISOString()
          }
        ],
        edges: mindMapData.edges || [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        version: 1
      };

      const docRef = await addDoc(collection(db, MINDMAPS_COLLECTION), newMindMap);
      return { id: docRef.id, ...newMindMap };
    }
  } catch (error) {
    console.error('Error saving mind map:', error);
    throw error;
  }
};
