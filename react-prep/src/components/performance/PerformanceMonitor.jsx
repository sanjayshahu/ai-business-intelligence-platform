
import React, {
  Profiler,
  useCallback,
  useEffect,
  useState
} from "react";

// ===============================
// Metrics Store
// ===============================

export const metricsStore = {
  data: {},
  subscribers: new Set(),

  addMetric(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) {
    if (!this.data[id]) {
      this.data[id] = {
        renders: []
      };
    }

    this.data[id].renders.push({
      phase,
      actualDuration: Number(actualDuration.toFixed(2)),
      baseDuration: Number(baseDuration.toFixed(2)),
      startTime,
      commitTime,
      timestamp: new Date().toLocaleTimeString()
    });

    this.notify();
  },

  notify() {
    this.subscribers.forEach((callback) => callback());
  },

  subscribe(callback) {
    this.subscribers.add(callback);

    return () => {
      this.subscribers.delete(callback);
    };
  },

  clear() {
    this.data = {};
    this.notify();
  },

  getSummary() {
    return Object.entries(this.data).map(([id, data]) => {
      const renders = data.renders;
      const times = renders.map((r) => r.actualDuration);

      const total = times.reduce((sum, time) => sum + time, 0);

      return {
        id,

        totalRenders: renders.length,

        mountCount: renders.filter(
          (r) => r.phase === "mount"
        ).length,

        updateCount: renders.filter(
          (r) => r.phase === "update"
        ).length,

        avgDuration: times.length
          ? Number((total / times.length).toFixed(2))
          : 0,

        maxDuration: times.length
          ? Math.max(...times)
          : 0,

        minDuration: times.length
          ? Math.min(...times)
          : 0
      };
    });
  }
};

// ===============================
// Performance Profiler
// ===============================

export function PerformanceProfiler({ id, children }) {
  const handleRender = useCallback(
    (
      profilerId,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    ) => {
      metricsStore.addMetric(
        profilerId,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime
      );
    },
    []
  );

  return (
    <Profiler
      id={id}
      onRender={handleRender}
    >
      {children}
    </Profiler>
  );
}

// ===============================
// Dashboard
// ===============================

export function PerformanceDashboard() {
  const [, setUpdate] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = metricsStore.subscribe(() => {
      setUpdate((value) => value + 1);
    });

    return unsubscribe;
  }, []);

  const summary = metricsStore.getSummary();

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={styles.floating}
      >
        📊 Perf ({summary.length})
      </button>
    );
  }

  return (
    <div style={styles.panel}>

      {/* Header */}

      <div style={styles.header}>
        <strong>⚡ Performance Monitor</strong>

        <div>
          <button
            style={styles.button}
            onClick={() => metricsStore.clear()}
          >
            Clear
          </button>

          <button
            style={styles.button}
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}

      {summary.length === 0 ? (
        <div style={styles.empty}>
          No renders captured yet.
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>

            <thead>
              <tr>
                <th>Component</th>
                <th>Renders</th>
                <th>Avg</th>
                <th>Slowest</th>
                <th>Fastest</th>
              </tr>
            </thead>

            <tbody>
              {summary.map((item) => {

                const isSlow =
                  item.avgDuration > 16;

                return (
                  <tr
                    key={item.id}
                    style={
                      isSlow
                        ? styles.slowRow
                        : undefined
                    }
                  >
                    <td>{item.id}</td>

                    <td>
                      {item.totalRenders}
                    </td>

                    <td>
                      {item.avgDuration}ms
                    </td>

                    <td>
                      {item.maxDuration}ms
                    </td>

                    <td>
                      {item.minDuration}ms
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

// ===============================
// Styles
// ===============================

const styles = {
  panel: {
    position: "fixed",
    right: 16,
    bottom: 16,
    width: 550,
    maxHeight: 400,
    background: "#1e1e2e",
    color: "#cdd6f4",
    borderRadius: 8,
    boxShadow: "0 8px 24px rgba(0,0,0,.4)",
    fontFamily: "monospace",
    fontSize: 12,
    zIndex: 99999,
    overflow: "hidden"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    background: "#313244"
  },

  button: {
    marginLeft: 6,
    padding: "4px 8px",
    cursor: "pointer",
    border: "none",
    borderRadius: 4
  },

  tableWrapper: {
    maxHeight: 340,
    overflow: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  empty: {
    padding: 20,
    textAlign: "center"
  },

  slowRow: {
    background: "rgba(243,139,168,.2)"
  },

  floating: {
    position: "fixed",
    right: 16,
    bottom: 16,
    padding: "8px 12px",
    zIndex: 99999,
    cursor: "pointer"
  }
};
