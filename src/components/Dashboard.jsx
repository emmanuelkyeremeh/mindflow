import React, { useState, useEffect } from "react";
import { signOutUser, getCurrentUser } from "../firebase/auth";
import {
  getUserMindMaps,
  createMindMap,
  checkUserMapLimit,
} from "../services/mindmapService";
import MindFlowLogo from "./MindFlowLogo";
import MindMap from "./MindMap";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [mindMaps, setMindMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMapId, setSelectedMapId] = useState(null);
  const [mapLimit, setMapLimit] = useState({
    canCreate: true,
    currentCount: 0,
    limit: 5,
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      loadUserData(currentUser);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserData = async (currentUser) => {
    try {
      setLoading(true);
      const userMaps = await getUserMindMaps(currentUser.uid);
      const limit = await checkUserMapLimit(currentUser.uid, "free");

      setMindMaps(userMaps);
      setMapLimit(limit);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCreateNewMap = async () => {
    if (!user) {
      alert("Please sign in to create mind maps.");
      return;
    }

    if (!mapLimit.canCreate) {
      alert(
        "You have reached your mind map limit. Upgrade to premium for unlimited maps."
      );
      return;
    }

    try {
      const newMap = await createMindMap(user.uid, {
        title: "New Mind Map",
        description: "A fresh mind map to explore your ideas",
      });

      setMindMaps((prev) => [newMap, ...prev]);
      setMapLimit((prev) => ({ ...prev, currentCount: prev.currentCount + 1 }));
    } catch (error) {
      console.error("Error creating mind map:", error);
      alert("Failed to create mind map. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner-large"></div>
        <p>Loading your mind maps...</p>
      </div>
    );
  }

  // Show mind map if one is selected
  if (selectedMapId) {
    return (
      <div className="mindmap-view">
        <header className="mindmap-header">
          <div className="header-content">
            <div className="header-left">
              <button
                className="back-button"
                onClick={() => setSelectedMapId(null)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Dashboard
              </button>
              <h2>Mind Map Editor</h2>
            </div>
            <div className="header-right">
              <div className="user-info">
                <span>Welcome, {user?.displayName || user?.email}</span>
                <button onClick={handleSignOut} className="signout-button">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <MindMap
          mapId={selectedMapId}
          userId={user?.uid}
          onSave={(data) => console.log("Mind map saved:", data)}
          onLoad={(data) => console.log("Mind map loaded:", data)}
        />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <MindFlowLogo size={40} />
            <h1>MindFlow</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span>Welcome, {user?.displayName || user?.email}</span>
              <span className="plan-badge">Free Plan</span>
            </div>
            <button onClick={handleSignOut} className="signout-button">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <div className="sidebar-header">
              <h2>My Mind Maps</h2>
              <div className="map-count">
                {mapLimit.currentCount}/
                {mapLimit.limit === -1 ? "∞" : mapLimit.limit}
              </div>
            </div>

            <button
              onClick={handleCreateNewMap}
              className="create-map-button"
              disabled={!mapLimit.canCreate}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              New Mind Map
            </button>

            <div className="mindmaps-list">
              {mindMaps.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🧠</div>
                  <p>No mind maps yet</p>
                  <p className="empty-subtitle">
                    Create your first mind map to get started
                  </p>
                </div>
              ) : (
                mindMaps.map((map) => (
                  <div key={map.id} className="mindmap-item">
                    <div className="mindmap-info">
                      <h3>{map.title}</h3>
                      <p>{map.description || "No description"}</p>
                      <div className="mindmap-stats">
                        <span>{map.nodes?.length || 0} nodes</span>
                        <span>{map.edges?.length || 0} connections</span>
                      </div>
                    </div>
                    <div className="mindmap-actions">
                      <button
                        className="action-button edit"
                        onClick={() => setSelectedMapId(map.mapId)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button className="action-button delete">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-main-area">
            <div className="welcome-section">
              <div className="welcome-content">
                <h2>Welcome to MindFlow</h2>
                <p>
                  Start creating your first 3D mind map or select an existing
                  one from the sidebar. Use AI to expand your ideas and
                  visualize your thoughts in three dimensions.
                </p>

                {mindMaps.length === 0 && (
                  <button onClick={handleCreateNewMap} className="welcome-cta">
                    <MindFlowLogo size={24} />
                    Create Your First Mind Map
                  </button>
                )}
              </div>

              <div className="features-preview">
                <div className="feature-item">
                  <div className="feature-icon">🧠</div>
                  <h3>AI Expansion</h3>
                  <p>Let AI suggest related concepts</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🌐</div>
                  <h3>3D Visualization</h3>
                  <p>Navigate in three dimensions</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💾</div>
                  <h3>Cloud Sync</h3>
                  <p>Access anywhere, anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
