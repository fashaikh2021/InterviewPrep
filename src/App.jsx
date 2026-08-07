import { useState, useEffect } from "react";
import { CATEGORIES } from "./data/categories";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CategoryContent from "./components/CategoryContent";
import TopicDetailModal from "./components/TopicDetailModal";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

export default function App() {
  const [sel, setSel] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null); // { catId, topicId }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [topicState, setTopicState] = useState(() => {
    const s = {};
    CATEGORIES.forEach((cat) => {
      s[cat.id] = cat.topics.map((t) => ({ ...t }));
    });
    return s;
  });

  const toggleTopic = (catId, topicId) => {
    setTopicState((prev) => ({
      ...prev,
      [catId]: prev[catId].map((t) => {
        if (t.id !== topicId) return t;
        const next = t.status === "done" ? t._orig || "covered" : "done";
        return { ...t, status: next, _orig: t.status === "done" ? t._orig : t.status };
      }),
    }));
  };

  const currentCat = CATEGORIES.find((c) => c.id === sel);
  const allTopics = Object.values(topicState).flat();
  const totalDone = allTopics.filter((t) => t.status === "done").length;
  const overallPct = Math.round((totalDone / allTopics.length) * 100);

  const activeCat = activeTopic ? CATEGORIES.find((c) => c.id === activeTopic.catId) : null;
  const activeTopicObj = activeTopic
    ? topicState[activeTopic.catId].find((t) => t.id === activeTopic.topicId)
    : null;

  const selectCategory = (id) => {
    setSel(id);
    if (isMobile) setSidebarOpen(false);
  };

  const currentLabel = sel ? currentCat?.label : "Dashboard";

  return (
    <div className="app-shell">
      {isMobile && (
        <div className="mobile-topbar">
          <button
            className="hamburger-btn"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 600, color: "#38BDF8" }}>
            .NET Lead
          </div>
          <div style={{ fontSize: 11, color: "#475569", marginLeft: "auto" }}>{currentLabel}</div>
        </div>
      )}

      <div
        className={`sidebar-backdrop${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        sel={sel}
        setSel={selectCategory}
        topicState={topicState}
        totalDone={totalDone}
        allTopicsCount={allTopics.length}
        overallPct={overallPct}
        isMobile={isMobile}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="app-main">
        {!sel ? (
          <Dashboard topics={topicState} onSelect={selectCategory} />
        ) : (
          <CategoryContent
            cat={currentCat}
            topics={topicState[sel]}
            onToggle={(tid) => toggleTopic(sel, tid)}
            onOpenDetail={(topic) => setActiveTopic({ catId: sel, topicId: topic.id })}
          />
        )}
      </main>

      {activeTopicObj && (
        <TopicDetailModal
          topic={activeTopicObj}
          catColor={activeCat?.color}
          catLabel={activeCat?.label}
          onClose={() => setActiveTopic(null)}
          onToggle={(tid) => toggleTopic(activeTopic.catId, tid)}
        />
      )}
    </div>
  );
}
