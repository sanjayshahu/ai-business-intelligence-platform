// src/HtmlChild.test.tsx
import { render, screen } from "@testing-library/react";
import HtmlChild from "./RoleChild";

describe("HtmlChild", () => {
  it("renders component heading", () => {
    const val={
        'n':'san','c':'ff','u':'fff','url':'x'
    }
    render(<HtmlChild val={val} />);
    expect(
      screen.getByText(/san/i)//regex is important bcoz getby text get confused when elements hold text in dual lines unable to fetch it,,,,,
    ).toBeInTheDocument();
  });


});
