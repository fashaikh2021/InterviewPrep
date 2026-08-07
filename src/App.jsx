import { useState } from "react";
import { CATEGORIES } from "./data/categories";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CategoryContent from "./components/CategoryContent";
import TopicDetailModal from "./components/TopicDetailModal";

export default function App() {
  const [sel, setSel] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null); // { catId, topicId }
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

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0E1117" }}>
      <Sidebar
        sel={sel}
        setSel={setSel}
        topicState={topicState}
        totalDone={totalDone}
        allTopicsCount={allTopics.length}
        overallPct={overallPct}
      />
      <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto", minHeight: "100vh" }}>
        {!sel ? (
          <Dashboard topics={topicState} onSelect={setSel} />
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
