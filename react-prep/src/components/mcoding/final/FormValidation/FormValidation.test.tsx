import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormValidationComponent from "./FormValidation";

describe("FormValidationComponent", () => {
  const fillValidData = () => {
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "pass123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "pass123" },
    });
  };

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<FormValidationComponent />);
  });

  test("renders all input fields with labels", () => {
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  test("updates input values correctly", () => {//coz thrugh many below tests updating the input values
    const fn = screen.getByLabelText("First Name") as HTMLInputElement;
    fireEvent.change(fn, { target: { value: "Alice" } });
    expect(fn.value).toBe("Alice");
  });

  test("shows error messages for empty fields on submit", () => {
    fireEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("First name cannot be empty")
    ).toBeInTheDocument();
    expect(screen.getByText("Last name cannot be empty")).toBeInTheDocument();
    expect(screen.getByText("Email cannot be empty")).toBeInTheDocument();
    expect(screen.getByText("Password cannot be empty")).toBeInTheDocument();
    expect(
      screen.getByText("Confirm password cannot be empty")
    ).toBeInTheDocument();
  });

  test("shows password mismatch error", () => {
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "abc123" },
    });

    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "different" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  test("submits successfully with valid data", () => {
    window.alert = jest.fn(); // mock alert

    fillValidData();

    fireEvent.click(screen.getByText("Submit"));

    expect(window.alert).toHaveBeenCalledWith("✅ Form submitted successfully!");
  });

  test("resets form after successful submit", () => {
    fillValidData();

    fireEvent.click(screen.getByText("Submit"));

    expect((screen.getByLabelText("First Name") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Last Name") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Password") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Confirm Password") as HTMLInputElement).value).toBe("");
  });

  test("typing clears error for specific field", () => {
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("First name cannot be empty")).toBeInTheDocument();

    const fn = screen.getByLabelText("First Name");

    fireEvent.change(fn, { target: { value: "New" } });

    expect(screen.queryByText("First name cannot be empty")).toBeNull();
  });
});
