// src/Component.test.tsx
import React, { act } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";

import HtmlElements from "./Role";
jest.useFakeTimers();

//helper setup
expect.extend({
  toContainRole(container: HTMLElement, role: string, quantity = 1) {
    const elements = within(container).queryAllByRole(role);

    const pass = elements.length === quantity;
    if (pass) {
      return {
        pass: true,
        message: () =>
          `expected container not to contain exactly ${quantity} elements with role '${role}'`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          `expected container to contain exactly ${quantity} elements with role '${role}', but found ${elements.length}`,
      };
    }
  },
});

// TypeScript support
declare global {
  namespace jest {
    interface Matchers<R> {
      toContainRole(role: string, quantity?: number): R;
    }
  }
}
//helper till here


describe("Component", () => {
  it("g,q,f single", async () => {
    render(<HtmlElements />); // Render the component
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();

    // Example: check if some text is in the document
    const element = screen.getByRole("heading", {
      level: 2,
      name: "Synchronous List",
    });

    console.log("1", element);
    const element1 = screen.queryByRole("heading", {
      level: 2,
      name: "Synchronous List",
    });

    console.log("2", element1);

    const element2 = await screen.findByRole("heading", {
      level: 2,
      name: "Synchronous List",
    });

    console.log("3", element2);
  });
  fit("g,q,f  not or multiple found", async () => {
    // expect(()=>screen.getByRole("link")).toThrow();//not found error
    // expect(()=>screen.getByRole("heading")).toThrow();//multiple error
    //  const element1 =screen.queryByRole("link")//not found null
    // const element1 =screen.queryByRole("heading")//multiple null
    //console.log("2",element1);
    // esliable-next-line testing-library/await-async-query
     //await expect(screen.findByRole("link")).rejects.toThrow();nt-dis//not found  promise rejected
    //  await expect(screen.findByRole("heading")).rejects.toThrow();//multiple   promise rejected
    // console.log("2",element2);
  });

  it("not found then error thrown while fetching test fails", () => {
    render(<HtmlElements />); // Render the component

    // Example: check if some text is in the document
    const element = screen.getByRole("Hello World");
    // expect(element).toBeInTheDocument();
  });
  it("if get replaced by query then test passes coz will return empty array thus assertion is must", () => {
    render(<HtmlElements />); // Render the component

    // Example: check if some text is in the document
    const element = screen.queryByRole("Hello World");
    expect(element).toBeInTheDocument();
  });

  it("g,q,f multiple find", async () => {
    render(<HtmlElements />); // Render the component

    // Example: check if some text is in the document
    //const elements = screen.getAllByRole("listitem");
    // console.log("1",elements.length);//it give sync one
    //  const elements1 = screen.queryAllByRole("listitem");
    // console.log("2",elements1.length);//same here

    //will not work
    //  const elements2 = await screen.findAllByRole("listitem", {}, { timeout: 2000 });
    //  console.log("6", elements2.length);
    // await expect(screen.findAllByRole("listitem")).resolves.toHaveLength(6);
    //wii0l not work
    await waitFor(() => {
      const elements2 = screen.getAllByRole("listitem");
      expect(elements2).toHaveLength(6); //
      //both approaches  didnot work because async 3 items  not found
    });
  });
  it("debug DOM state will work n find 3 async using get only because using promise delay introduced here", async () => {
    render(<HtmlElements />);

    // Log DOM immediately
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();

    // Wait 1.5s (longer than your 1000ms setTimeout)
    await new Promise((r) => setTimeout(r, 1500));

    // Log DOM again
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();

    const elements = screen.getAllByRole("listitem");
    console.log("length after wait", elements.length); //used getallby role used here
  });

  it("debug DOM state will work n find 3 async using get only because using faketimers initilized at top of test file and intest delay introduced here", async () => {
    render(<HtmlElements />);

    // Log DOM immediately (will only show sync list: Apple, Banana, Cherry)
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();

    await act(async () => {
      jest.runAllTimers();
    });
    // Use findAllByRole — this will retry until *all 6 li elements* are present
    const elements = await screen.findAllByRole("listitem");

    // Log DOM after async items appear (should now include Dog, Cat, Rabbit)
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();

    console.log("length after wait", elements.length);
    expect(elements).toHaveLength(6);
  });

  it("g,q,f multiple error", async () => {
    render(<HtmlElements />); // Render the component

    //  expect(()=>screen.getAllByRole("link")).toThrow();//not found error
    // const element1 =screen.queryAllByRole("link")
    // console.log("ll",element1);//not found empty []error
    //  await expect(screen.findAllByRole("link")).rejects.toThrow();//not found promise error
  // await expect(screen.findAllByRole("heading"))//will five array if found in multiples
  });
    it("custom helper not used", async () => {
    render(<HtmlElements />); // Render the component

    expect(screen.getAllByRole('button')).toHaveLength(3);
    const form = screen.getByRole("form", { name: "formt" });
    //first is role
    //second is accessible name,,,

    expect(within(form).getAllByRole('button')).toHaveLength(2);
  });
    fit("custom helper  used", async () => {
    render(<HtmlElements />); // Render the component

    expect(screen.getAllByRole('button')).toHaveLength(3);
    const form = screen.getByRole("form", { name: "formt" });
  expect(form).toContainRole('button',2)
  });
  
});
