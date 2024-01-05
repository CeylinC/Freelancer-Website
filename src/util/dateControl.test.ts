import { dateControl } from "./dateControl";

describe("dateControl", () => {
  test("start date is less than end date", () => {
    const startValue = "1/10/2023";
    const finishValue = "1/15/2023";
    const value = dateControl(startValue, finishValue);
    expect(value).toBeFalsy();
  });
  test("end date is less than start date", () => {
    const startValue = "1/15/2023";
    const finishValue = "1/10/2023";
    const value = dateControl(startValue, finishValue);
    expect(value).toBeTruthy();
  });
});
