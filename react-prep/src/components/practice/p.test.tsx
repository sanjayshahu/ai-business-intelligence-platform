
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { vi } from "vitest";

import userEvent from "@testing-library/user-event";

import App from "./p";

describe("p", () => {
  //for every test
  //api mock setup
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  //api mocks
  const mockFetchSuccess = (
    products = [
      {
        id: "1",
        title: "iPhone",
      },
    ],
    total = 10 //these are defaults,,const PRODUCTS_PER_PAGE = 10; thus 1 page
  ) => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        products,
        total,
      }),
    });
  }; //here product n total given

  const mockFetchFailure = (
    message = "Failed to fetch products"
  ) => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });
  };

  //strstergy,,,loading,,,then on sucess,,with or without data,,,user interaction,,,,edge cases,,
  //nvr inbuilt hooks only whats visible

  //only loading
  test("shows loading state initially", () => {
    (fetch as vi.Mock).mockImplementation(
      () => new Promise(() => {})
    ); //no data returned,,,as its unresolved

    render(<App />);

    expect(
      screen.getByRole("status")
    ).toHaveTextContent(
      "Loading products..."
    );
  });

  //load n sucess actual flow
  test("renders products after successful fetch", async () => {
    mockFetchSuccess(
      [
        {
          id: "1",
          title: "iPhone",
        },
        {
          id: "2",
          title: "Macbook",
        },
      ],
      20
    );

    render(<App />);

    expect(
      screen.getByRole("status")
    ).toBeInTheDocument(); //fist loading

    expect(
      await screen.findByText("iPhone")//coz async
    ).toBeInTheDocument();

    expect(
      screen.getByText("Macbook")//once find done all are sync
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("status")//query if doesn't exist
    ).not.toBeInTheDocument();
  });

  //error
  test("shows error message when api fails", async () => {
    mockFetchFailure();

    render(<App />);

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      "Failed to fetch products"
    );
  });
  //unknown error
  test("shows fallback error message for unknown errors", async () => {
  (fetch as any).mockRejectedValueOnce(
    "random failure"
  );

  render(<App />);

  expect(
    await screen.findByRole("alert")
  ).toHaveTextContent(
    "Something went wrong"
  );
});

  //empty
  test("shows empty state when no products returned", async () => {
    mockFetchSuccess([], 0);

    render(<App />);

    expect(
      await screen.findByText(
        "No products found."
      )
    ).toBeInTheDocument();
  });

  //2pages as t=20=/count{10},,,but no products ,,still one page rendered,,with p disabled,,
  test("disables previous button on first page", async () => {
    mockFetchSuccess([], 20); //2 pages bu no dara

    render(<App />);

    const previousButton =
      await screen.findByRole(
        "button",
        {
          name: /previous/i,
        }
      );

    expect(previousButton).toBeDisabled();//we r at first page but no data,,still prev must be disabled,,
  });

  // ---------------------------------------------------
  // Next Button Disabled On Last Page
  // ---------------------------------------------------

  test("disables next button on last page", async () => {
    const user = userEvent.setup();

    // page 1//this is for on component munt,,here cp=0
    mockFetchSuccess(
      [
        {
          id: "1",
          title: "Page 1 Product",
        },
      ],
      20 //total always same
    );

    // page 2//when new cpage,,cp=1
    mockFetchSuccess(
      [
        {
          id: "2",
          title: "Page 2 Product",
        },
      ],
      20
    );

    render(<App />);

    expect(
      await screen.findByText(
        "Page 1 Product"
      )
    ).toBeInTheDocument();

    const nextButton =
      screen.getByRole("button", {
        name: /next/i,
      });

    await user.click(nextButton);

    expect(
      await screen.findByText(
        "Page 2 Product"
      )
    ).toBeInTheDocument();

    expect(nextButton).toBeDisabled(); //when at last page not allowed
  });

  //check next functionality above check sonditional statement{branches} n  this func{functions}
  test("fetches next page products", async () => {
    const user = userEvent.setup();

    // first page
    mockFetchSuccess(
      [
        {
          id: "1",
          title: "Page 1",
        },
      ],
      20
    );

    // second page
    mockFetchSuccess(
      [
        {
          id: "2",
          title: "Page 2",
        },
      ],
      20
    );

    render(<App />);

    expect(
      await screen.findByText(
        "Page 1"
      )
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /next/i,
      })
    );

    expect(
      await screen.findByText(
        "Page 2"
      )
    ).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledTimes(
      2 //on mount then on click
    );
  });

  // ---------------------------------------------------
  // Previous Pagination
  // ---------------------------------------------------

  test("fetches previous page products", async () => {
    const user = userEvent.setup();

    // first page
    mockFetchSuccess(
      [
        {
          id: "1",
          title: "Page 1",
        },
      ],
      20
    );

    // second page
    mockFetchSuccess(
      [
        {
          id: "2",
          title: "Page 2",
        },
      ],
      20
    );

    // previous page fetch again
    mockFetchSuccess(
      [
        {
          id: "1",
          title: "Page 1",
        },
      ],
      20
    );

    render(<App />);

    expect(
      await screen.findByText(
        "Page 1"
      )
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /next/i,
      })
    );

    expect(
      await screen.findByText(
        "Page 2"
      )
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /previous/i,
      })
    ); //second page previos gets enabled on seccond page

    expect(
      await screen.findByText(
        "Page 1"
      )
    ).toBeInTheDocument(); //when previous clicked
  });

  // ---------------------------------------------------
  // Page Number Click
  // ---------------------------------------------------

  test("navigates using page number buttons", async () => {
    const user = userEvent.setup();

    // page 1
    mockFetchSuccess(
      [
        {
          id: "1",
          title: "Page 1 Product",
        },
      ],
      30 //used 30 bcoz we need 3 pages,,30/10
    );

    // page 3
    mockFetchSuccess(
      [
        {
          id: "3",
          title: "Page 3 Product",
        },
      ],
      30
    );

    render(<App />);

    expect(
      await screen.findByText(
        "Page 1 Product"
      )
    ).toBeInTheDocument();

    const page3Button =
      screen.getByRole("button", {
        name: "3",
      }); //clicked button with page number,,being at page1

    await user.click(page3Button);

    expect(
      await screen.findByText(
        "Page 3 Product"
      )
    ).toBeInTheDocument();
  });

  //checking if buttons is active when at particular related page
  test("marks active page with aria-current", async () => {
    mockFetchSuccess([], 30);

    render(<App />);

    const currentPageButton =
      await screen.findByRole(
        "button",
        {
          name: "1",
        }
      );

    expect(currentPageButton).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  //when multiple times same active button clicked,,,
  test("does not refetch when clicking current page", async () => {
    const user = userEvent.setup();

    mockFetchSuccess([], 30);

    render(<App />);

    await screen.findByRole(
      "button",
      {
        name: "1",
      }
    );

    const currentPageButton =
      screen.getByRole("button", {
        name: "1",
      });

    await user.click(currentPageButton);

    expect(fetch).toHaveBeenCalledTimes(
      1
    ); //see here,,only once//coz depends on active page or skip
  });

  test("calls correct api url", async () => {
    mockFetchSuccess([], 10);

    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products?limit=10&skip=0"
      );
    });
  });
});

