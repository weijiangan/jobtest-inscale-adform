import React from "react";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

import CampaignPage from "./CampaignPage";

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

test("AddCampaign function should exist in window", () => {
  act(() => {
    render(<CampaignPage />, container);
  });
  expect(window.AddCampaigns).toBeInstanceOf(Function);
});
