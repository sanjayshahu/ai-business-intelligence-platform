// src/App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import HtmlElementsDemo from "./HtmlEle";

// List of valid ARIA roles (from https://www.w3.org/TR/wai-aria-1.2/#roles)
const validRoles = [
  "alert", "alertdialog", "application", "article", "banner", "button",
  "cell", "checkbox", "columnheader", "combobox", "complementary", "contentinfo",
  "definition", "dialog", "directory", "document", "feed", "figure", "form",
  "grid", "gridcell", "group", "heading", "img", "link", "list", "listbox",
  "listitem", "log", "main", "marquee", "math", "menu", "menubar", "menuitem",
  "menuitemcheckbox", "menuitemradio", "navigation", "note", "option", "progressbar",
  "radio", "radiogroup", "region", "row", "rowgroup", "rowheader", "scrollbar",
  "search", "separator", "slider", "spinbutton", "status", "switch", "tab",
  "table", "tablist", "tabpanel", "term", "textbox", "timer", "toolbar", "tooltip",
  "tree", "treegrid", "treeitem"
];

describe("App component ARIA roles", () => {
  it("checks all roles and displays suggestions in DOM if missing", () => {
    render(<HtmlElementsDemo />);

    const rolesToCheck = [
      "heading",
      "link",
      "list",
      "listitem",
      "form",
      "textbox",
      "spinbutton",
      "checkbox",
      "radio",
      "combobox",
      "button",
      "img",
      "generic",
      "tablei", // <-- typo
      "columnheader",
      "cell",
      "row",
      "rowgroup",
      "banner",
      "navigation",
      "main",
      "article",
      "complementary",
      "contentinfo",
      "separator",
      "progressbar",
      "meter",
      "group"
    ];

    rolesToCheck.forEach((role) => {
      let elements;
      try {
        elements = screen.queryAllByRole(role);
      } catch {
        elements = [];
      }

      if (elements.length === 0) {
        // Find closest valid role (simple suggestion using startsWith)
        const suggestion = validRoles.find((r) => r.startsWith(role[0])) || "N/A";

        // Add a message in the DOM
        const msg = document.createElement("div");
        msg.textContent = `Role "${role}" not found. Did you mean "${suggestion}"?`;
        msg.style.color = "red";
        msg.style.fontWeight = "bold";
        document.body.appendChild(msg);

        // Fail the test
        throw new Error(`Role "${role}" missing. Suggestion: "${suggestion}"`);
      }
    });
  });
});
