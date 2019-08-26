import React from "react";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import CampaignPage from "./CampaignPage";

const validateCampaigns = CampaignPage.__get__("validateCampaigns");

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("AddCampaigns", () => {
  test("AddCampaigns function should exist in window", () => {
    act(() => {
      render(<CampaignPage />, container);
    });
    expect(window.AddCampaigns).toBeInstanceOf(Function);
  });
});

describe("validateCampaigns", () => {
  test("validate valid input (array of 1 element)", () => {
    expect(
      validateCampaigns([
        {
          id: 6,
          name: "Photojam",
          startDate: "7/25/2017",
          endDate: "6/23/2017",
          Budget: 858131
        }
      ])
    ).toBe(true);
  });

  test("validate valid input (array of 3 elements)", () => {
    expect(
      validateCampaigns([
        {
          id: 8,
          name: "Rhyzio",
          startDate: "10/13/2017",
          endDate: "1/25/2018",
          Budget: 272552
        },
        {
          id: 9,
          name: "Zoomcast",
          startDate: "9/6/2017",
          endDate: "11/10/2017",
          Budget: 301919
        },
        {
          id: 10,
          name: "Realbridge",
          startDate: "3/5/2018",
          endDate: "10/2/2017",
          Budget: 505602
        }
      ])
    ).toBe(true);
  });

  test("validate valid input (single object)", () => {
    expect(
      validateCampaigns({
        id: 8,
        name: "Rhyzio",
        startDate: "10/13/2017",
        endDate: "1/25/2018",
        Budget: 272552
      })
    ).toBe(false);
  });

  test("validate invalid input (invalid date)", () => {
    expect(
      validateCampaigns([
        {
          id: 1,
          name: "Divavu",
          startDate: "19/19/2017",
          endDate: "3/9/2018",
          Budget: 88377
        }
      ])
    ).toBe(false);
  });

  test("validate invalid input (invalid date)", () => {
    expect(
      validateCampaigns([
        {
          id: 1,
          name: "Divavu",
          startDate: "12/32/2017",
          endDate: "3/9/2018",
          Budget: 88377
        }
      ])
    ).toBe(false);
  });

  test("validate invalid input (missing Budget in second element)", () => {
    expect(
      validateCampaigns([
        {
          id: 1,
          name: "Divavu",
          startDate: "9/19/2017",
          endDate: "3/9/2018",
          Budget: 88377
        },
        {
          id: 2,
          name: "Jaxspan",
          startDate: "11/21/2017",
          endDate: "2/21/2018"
        },
        {
          id: 3,
          name: "Miboo",
          startDate: "11/1/2017",
          endDate: "6/20/2017",
          Budget: 239507
        }
      ])
    ).toBe(false);
  });
});
