import MapPoint from "../../../src/components/icons/MapPoint";
import { render, screen } from "@testing-library/react";

describe("Arrow left", () => {
  beforeEach(() => {
    render(<MapPoint direction="left" />);
  });

  it("should render", () => {
    const icon = screen.getByRole("icon", { name: /map-point/i });
    expect(icon).toBeInTheDocument();
  });

});
