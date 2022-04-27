import { render, waitFor } from "./config/TestUtils";

import { Scenario } from "./config/Scenario";

describe("Schedule", () => {
  test("loads and displays", async () => {
    const { getByText, getByRole } = render(Scenario.default().setOffline());

    await waitFor(() => getByText("title", { exact: true }));

    expect(getByRole("button")).toHaveTextContent("error.fatal.button");
  });
});
