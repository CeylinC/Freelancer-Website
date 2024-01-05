import { capitalize } from "./capitalize";

test("capitalize function is correctly", () => {
  const control = "mock";
  const value = capitalize(control);
  expect(value).toBe("Mock");
});
