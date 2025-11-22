import { test, expect } from "@playwright/test";
import { EmailParserSteps } from "../steps/emailParser.steps";
import { sampleValidEmail, sampleInvalidEmail } from "../utils/testData";

test.describe("Email Parser page", () => {
  let steps: EmailParserSteps;

  test.beforeEach(async ({ page }) => {
    steps = new EmailParserSteps(page);
    await steps.open();
  });

  test("parses a valid email and displays expected JSON output", async () => {
    await steps.submitSample(sampleValidEmail);

    await steps.expectOutputEquals({
      isSuccess: true,
      message: "Parsing successful",
      salesTax: 3181.82,
      totalExcludingTax: 31818.18,
      costCentre: "DEV632",
    });
  });

  test("shows validation error for malformed cost centre tag", async () => {
    await steps.submitTextOnly(sampleInvalidEmail);

    await steps.expectValidation(
      "The <cost_centre> tag is unmatched or improperly nested"
    );
  });
});
