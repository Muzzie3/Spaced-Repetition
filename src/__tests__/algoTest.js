import ConfidenceToTime from "../ConfidenceToTime";

it("maps memorization confidence to time", () => {
  for (let n = 0; n < 6; ++n) expect(ConfidenceToTime(n)).toBeLessThan(ConfidenceToTime(n + 1));
});
