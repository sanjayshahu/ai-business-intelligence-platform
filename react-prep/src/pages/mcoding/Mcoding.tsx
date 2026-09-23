import { useState } from "react";
import Accordion from "../../components/mcoding/accordion/Accordion";
import Chips from "../../components/mcoding/chips/chips";
import { FE } from "../../components/mcoding/folderexplorer/FolderExplorer";
import Nested from "../../components/mcoding/nested/nested";
import Otp from "../../components/mcoding/otp/otp";
import Pagination from "../../components/mcoding/pagination/pagination";
import Progressbar from "../../components/mcoding/progressbar/progressbar";
import Tictactoe from "../../components/mcoding/Tictactoe/tictactoe";
import ToDo from "../../components/mcoding/todo/todo";
import AutoComplete from "../../components/mcoding/autocomplete/AutoComplete";

const tabs = [
  { label: "Accordion", component: <Accordion /> },
  { label: "Chips", component: <Chips /> },
  { label: "Folder Explorer", component: <FE /> },
  { label: "Nested", component: <Nested /> },
  { label: "OTP", component: <Otp /> },
  { label: "Pagination", component: <Pagination /> },
  { label: "Progress Bar", component: <Progressbar /> },
  { label: "Tic Tac Toe", component: <Tictactoe /> },
  { label: "To Do", component: <ToDo /> },
  { label: "Auto Complete", component: <AutoComplete /> },
];

const Mcoding = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: activeTab === index ? "#2563eb" : "#e5e7eb",
              color: activeTab === index ? "#fff" : "#111",
              fontWeight: 600,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{tabs[activeTab].component}</div>
    </div>
  );
};

export default Mcoding;
