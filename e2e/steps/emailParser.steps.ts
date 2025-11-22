import { EmailParserPage } from "../pages/EmailParserPage";
import { expect, Page } from "@playwright/test";

export class EmailParserSteps {
  readonly pageObj: EmailParserPage;

  constructor(page: Page) {
    this.pageObj = new EmailParserPage(page);
  }

  async open() {
    await this.pageObj.goto();
  }

  async submitSample(text: string) {
    await this.pageObj.submitEmailAndWaitForOutput(text);
  }

  async submitTextOnly(text: string) {
    await this.pageObj.fillInput(text);
    await this.pageObj.submit();
  }

  async expectOutputEquals(expected: object) {
    const out = await this.pageObj.getOutputText();
    expect(out).toBe(JSON.stringify(expected, null, 2));
  }

  async expectValidation(messageFragment: string) {
    const msg = await this.pageObj.getValidationMessage();
    expect(msg).toContain(messageFragment);
  }

  // expose underlying page object for low-level actions when needed
  get page() {
    return this.pageObj;
  }
}
