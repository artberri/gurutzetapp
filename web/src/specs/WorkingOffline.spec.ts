import { render, waitFor } from "./config/TestUtils";

import { Data, Scenario } from "./config/Scenario";

describe("Working Offline", () => {
  let scenario: Scenario;

  beforeEach(() => {
    scenario = Scenario.default().setOffline();
  });

  describe("without previously stored data", () => {
    beforeEach(() => {
      scenario.withStoredData({
        activities: [],
        categories: [],
        venues: [],
      });
    });

    it("shows an error message", async () => {
      const { getByText } = render(scenario);

      await waitFor(() => getByText("error.fatal.title"));

      expect(getByText("error.fatal.description")).toBeVisible();
    });
  });

  describe("with previously stored data", () => {
    let data: Data;
    beforeEach(() => {
      data = Scenario.buildDemoData();
      scenario.withStoredData(data);
    });

    it("shows the stored schedule", async () => {
      const { getByText, getAllByText } = render(scenario);

      await waitFor(() => getByText("title", { exact: true }));

      expect(getAllByText("Friday").length).toBe(2);
      expect(getAllByText("Saturday").length).toBe(2);
      expect(getAllByText("Sunday").length).toBe(2);
      expect(getByText("May 6")).toBeVisible();
      expect(getByText("May 7")).toBeVisible();
      expect(getByText("May 8")).toBeVisible();
      expect(getByText("May 13")).toBeVisible();
      expect(getByText("May 14")).toBeVisible();
      expect(getByText("May 15")).toBeVisible();
    });
  });
});
