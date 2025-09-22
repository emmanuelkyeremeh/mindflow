import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { generateNodeExpansions } from "../config/openrouter";
import { clusterRelatedNodes } from "../config/brain";
import { saveMindMap, loadMindMap } from "../services/mindmapService";
import "./MindMap.css";

// Node component for individual mind map nodes
const MindMapNode = ({
  node,
  isSelected,
  onSelect,
  onDoubleClick,
  onExpandWithAI,
  isExpanding,
  onDrag,
}) => {
  const meshRef = useRef();
  const textRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, z: 0 });

  // Animation for selected node
  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.scale.setScalar(
          1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
        );
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    onDoubleClick(node.id);
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({
      x: e.point.x,
      y: e.point.y,
      z: e.point.z,
    });
  };

  const handlePointerMove = (e) => {
    if (isDragging && onDrag) {
      e.stopPropagation();
      const newPosition = {
        x: node.x + (e.point.x - dragStart.x),
        y: node.y + (e.point.y - dragStart.y),
        z: node.z + (e.point.z - dragStart.z),
      };
      onDrag(node.id, newPosition);
      setDragStart({
        x: e.point.x,
        y: e.point.y,
        z: e.point.z,
      });
    }
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  const getNodeColor = () => {
    if (isDragging) return "#ffa500"; // Orange when dragging
    if (isSelected) return "#667eea";
    if (isExpanding) return "#ff6b6b";
    return node.color || "#4ecdc4";
  };

  return (
    <group position={[node.x, node.y, node.z]}>
      <Sphere
        ref={meshRef}
        args={[node.size || 1, 32, 32]}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <meshStandardMaterial
          color={getNodeColor()}
          emissive={getNodeColor()}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.1}
        />
      </Sphere>

      <Text
        ref={textRef}
        position={[0, 0, node.size + 0.5]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
        strokeWidth={0.02}
        strokeColor="#000000"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {node.label}
      </Text>

      {isExpanding && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[node.size + 0.5, 16, 16]} />
          <meshBasicMaterial color="#ff6b6b" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};

// Connection line component
const Connection = ({ source, target, nodes }) => {
  const sourceNode = nodes.find((n) => n.id === source);
  const targetNode = nodes.find((n) => n.id === target);

  if (!sourceNode || !targetNode) return null;

  const points = [
    new THREE.Vector3(sourceNode.x, sourceNode.y, sourceNode.z),
    new THREE.Vector3(targetNode.x, targetNode.y, targetNode.z),
  ];

  return (
    <Line
      points={points}
      color="#667eea"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
};

// Main MindMap component
const MindMap = ({ mapId, userId, onSave, onLoad }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const canvasRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();

  // Load mind map data on component mount
  useEffect(() => {
    const loadMap = async () => {
      if (!mapId || !userId) {
        // Create a default central node for new maps
        const centralNode = {
          id: "1",
          label: "Central Idea",
          x: 0,
          y: 0,
          z: 0,
          size: 1.5,
          color: "#667eea",
        };
        setNodes([centralNode]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const mapData = await loadMindMap(mapId, userId);
        if (mapData) {
          setNodes(mapData.nodes || []);
          setEdges(mapData.edges || []);
        } else {
          // Create default central node if no data found
          const centralNode = {
            id: "1",
            label: "Central Idea",
            x: 0,
            y: 0,
            z: 0,
            size: 1.5,
            color: "#667eea",
          };
          setNodes([centralNode]);
        }
      } catch (err) {
        console.error("Error loading mind map:", err);
        setError("Failed to load mind map");
      } finally {
        setLoading(false);
      }
    };

    loadMap();
  }, [mapId, userId]);

  // Auto-save when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0 && mapId && userId) {
      const saveMap = async () => {
        try {
          await saveMindMap(mapId, userId, { nodes, edges });
          if (onSave) onSave({ nodes, edges });
        } catch (err) {
          console.error("Error saving mind map:", err);
        }
      };

      const timeoutId = setTimeout(saveMap, 1000); // Debounce saves
      return () => clearTimeout(timeoutId);
    }
  }, [nodes, edges, mapId, userId, onSave]);

  // Handle node selection
  const handleNodeSelect = useCallback((nodeId) => {
    setSelectedNodeId(nodeId);
  }, []);

  // Handle node double-click for editing
  const handleNodeDoubleClick = useCallback(
    (nodeId) => {
      const newLabel = prompt(
        "Edit node label:",
        nodes.find((n) => n.id === nodeId)?.label || ""
      );
      if (newLabel !== null && newLabel.trim()) {
        setNodes((prev) =>
          prev.map((node) =>
            node.id === nodeId ? { ...node, label: newLabel.trim() } : node
          )
        );
      }
    },
    [nodes]
  );

  // Handle node dragging
  const handleNodeDrag = useCallback((nodeId, newPosition) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId
          ? { ...node, x: newPosition.x, y: newPosition.y, z: newPosition.z }
          : node
      )
    );
  }, []);

  // Add new node manually
  const addNode = useCallback(() => {
    const newNodeId = (
      Math.max(...nodes.map((n) => parseInt(n.id)), 0) + 1
    ).toString();
    const newNode = {
      id: newNodeId,
      label: "New Node",
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10,
      size: 1,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };

    setNodes((prev) => [...prev, newNode]);

    // If a node is selected, create an edge to it
    if (selectedNodeId) {
      const newEdge = {
        id: `${selectedNodeId}-${newNodeId}`,
        source: selectedNodeId,
        target: newNodeId,
      };
      setEdges((prev) => [...prev, newEdge]);
    }
  }, [nodes, selectedNodeId]);

  // Expand node with AI
  const expandWithAI = useCallback(
    async (nodeId) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      try {
        setIsExpanding(true);
        setError(null);

        // Get existing node labels for context
        const existingLabels = nodes.map((n) => n.label);

        // Use Brain.js to cluster and avoid repetitive suggestions
        const relatedConcepts = await clusterRelatedNodes(
          node.label,
          existingLabels
        );

        // Get AI suggestions
        const suggestions = await generateNodeExpansions(
          node.label,
          relatedConcepts
        );

        // Create new nodes from suggestions
        const newNodes = suggestions.map((suggestion, index) => {
          const newNodeId = (
            Math.max(...nodes.map((n) => parseInt(n.id)), 0) +
            index +
            2
          ).toString();
          return {
            id: newNodeId,
            label: suggestion,
            x: node.x + (Math.random() - 0.5) * 8,
            y: node.y + (Math.random() - 0.5) * 8,
            z: node.z + (Math.random() - 0.5) * 8,
            size: 0.8,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          };
        });

        // Create edges from selected node to new nodes
        const newEdges = suggestions.map((_, index) => {
          const newNodeId = (
            Math.max(...nodes.map((n) => parseInt(n.id)), 0) +
            index +
            2
          ).toString();
          return {
            id: `${nodeId}-${newNodeId}`,
            source: nodeId,
            target: newNodeId,
          };
        });

        setNodes((prev) => [...prev, ...newNodes]);
        setEdges((prev) => [...prev, ...newEdges]);
      } catch (err) {
        console.error("Error expanding with AI:", err);
        setError("Failed to expand with AI. Please try again.");
      } finally {
        setIsExpanding(false);
      }
    },
    [nodes]
  );

  // Export as PNG - Using Velocify approach for proper 3D snapshot
  const exportAsPNG = useCallback(async () => {
    try {
      console.log("Starting PNG export using Velocify 3D capture method");

      // Check if we have the necessary references
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
        throw new Error(
          "3D scene not ready for export - missing renderer, scene, or camera"
        );
      }

      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;

      // Wait a bit to ensure the scene is fully rendered
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Force a re-render by temporarily changing the camera position slightly
      const originalPosition = camera.position.clone();
      camera.position.x += 0.001;
      camera.position.y += 0.001;
      camera.position.z += 0.001;

      // Render the scene
      renderer.render(scene, camera);

      // Restore original position
      camera.position.copy(originalPosition);

      // Wait a bit more for the render to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log("Capturing 3D mind map snapshot...");

      // Set high resolution for export
      const pixelRatio = 2;
      const width = 1200;
      const height = 800;

      // Set up the renderer for export
      const originalSize = renderer.getSize(new THREE.Vector2());
      const originalPixelRatio = renderer.getPixelRatio();

      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor("#d1d5db", 1.0);

      // Render the scene
      renderer.render(scene, camera);
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Try to get image data
      const dataURL = renderer.domElement.toDataURL("image/png", 0.95);

      // Restore original settings
      renderer.setSize(originalSize.x, originalSize.y);
      renderer.setPixelRatio(originalPixelRatio);

      if (!dataURL || dataURL === "data:,") {
        throw new Error("Failed to generate image data from 3D scene");
      }

      console.log("PNG export successful, data URL length:", dataURL.length);

      // Download the image
      const link = document.createElement("a");
      link.download = `mindmap-${mapId || "export"}.png`;
      link.href = dataURL;
      link.click();
    } catch (err) {
      console.error("Error exporting PNG:", err);
      setError("Failed to export PNG. Please try again.");
    }
  }, [mapId]);

  // Export as JSON
  const exportAsJSON = useCallback(() => {
    try {
      const data = { nodes, edges, mapId, timestamp: new Date().toISOString() };
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = `mindmap-${mapId || "export"}.json`;
      link.href = url;
      link.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting JSON:", err);
      setError("Failed to export JSON");
    }
  }, [nodes, edges, mapId]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  if (loading) {
    return (
      <div className="mindmap-loading">
        <div className="loading-spinner"></div>
        <p>Loading mind map...</p>
      </div>
    );
  }

  return (
    <div className="mindmap-container">
      {/* Controls Panel */}
      <div className="mindmap-controls">
        <div className="control-group">
          <button
            className="control-button primary"
            onClick={addNode}
            title="Add New Node"
          >
            <span>+</span> Add Node
          </button>

          {selectedNodeId && (
            <button
              className="control-button ai"
              onClick={() => expandWithAI(selectedNodeId)}
              disabled={isExpanding}
              title="Expand with AI"
            >
              {isExpanding ? (
                <span className="loading-spinner-small"></span>
              ) : (
                <span>🧠</span>
              )}
              Expand with AI
            </button>
          )}
        </div>

        <div className="control-group">
          <button
            className="control-button secondary"
            onClick={exportAsPNG}
            title="Export as PNG"
          >
            <span>📸</span> Export PNG
          </button>

          <button
            className="control-button secondary"
            onClick={exportAsJSON}
            title="Export as JSON"
          >
            <span>💾</span> Export JSON
          </button>
        </div>

        {selectedNodeId && (
          <div className="selected-node-info">
            Selected:{" "}
            <strong>{nodes.find((n) => n.id === selectedNodeId)?.label}</strong>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mindmap-error">
          <span>{error}</span>
          <button onClick={clearError}>×</button>
        </div>
      )}

      {/* 3D Canvas */}
      <div className="mindmap-canvas">
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 15], fov: 75 }}
          gl={{
            antialias: true,
            alpha: false,
            preserveDrawingBuffer: true,
            powerPreference: "high-performance",
          }}
          style={{
            background: "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)",
          }}
          onCreated={({ gl, camera, scene, size }) => {
            // Store references for snapshot capture
            canvasRef.current = gl.domElement;
            rendererRef.current = gl;
            sceneRef.current = scene;
            cameraRef.current = camera;
            console.log("3D Canvas created:", {
              canvas: canvasRef.current,
              size,
              preserveDrawingBuffer: true,
            });
          }}
        >
          <color attach="background" args={["#d1d5db"]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.7} />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
          />

          {/* Render nodes */}
          {nodes.map((node) => (
            <MindMapNode
              key={node.id}
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={handleNodeSelect}
              onDoubleClick={handleNodeDoubleClick}
              onExpandWithAI={expandWithAI}
              isExpanding={isExpanding && selectedNodeId === node.id}
              onDrag={handleNodeDrag}
            />
          ))}

          {/* Render connections */}
          {edges.map((edge) => (
            <Connection
              key={edge.id}
              source={edge.source}
              target={edge.target}
              nodes={nodes}
            />
          ))}
        </Canvas>
      </div>

      {/* Instructions */}
      <div className="mindmap-instructions">
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul>
          <li>Click nodes to select them</li>
          <li>Double-click nodes to edit their labels</li>
          <li>Drag nodes to reposition them in 3D space</li>
          <li>Use mouse to drag, zoom, and rotate the 3D view</li>
          <li>
            Select a node and click "Expand with AI" for intelligent suggestions
          </li>
          <li>Export your mind map as PNG or JSON</li>
        </ul>
      </div>
    </div>
  );
};

export default MindMap;
