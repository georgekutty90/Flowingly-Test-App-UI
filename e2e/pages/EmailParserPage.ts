import { Page, Locator } from "@playwright/test";

export class EmailParserPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inputBox: Locator;
  readonly submitBtn: Locator;
  readonly clearBtn: Locator;
  readonly outputBox: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.inputBox = page.getByRole("textbox", {
      name: "Paste email or text block",
    });
    this.submitBtn = page.getByRole("button", { name: "Submit to Server" });
    this.clearBtn = page.getByRole("button", { name: "Clear" });
    this.outputBox = page.getByTestId("output-display");
    this.validationError = page.getByTestId("validation-error");
  }

  async goto() {
    await this.page.goto("/");
    await this.title.waitFor({ state: "visible" });
  }

  async fillInput(text: string) {
    await this.inputBox.fill(text);
  }

  async submit() {
    await this.submitBtn.click();
  }

  async clear() {
    await this.clearBtn.click();
  }

  async getOutputText(): Promise<string> {
    const t = await this.outputBox.textContent();
    return (t ?? "").trim();
  }

  async getValidationMessage(): Promise<string> {
    const t = await this.validationError.textContent();
    return (t ?? "").trim();
  }

  async submitEmailAndWaitForOutput(text: string) {
    await this.fillInput(text);
    await this.submit();
    await this.outputBox.waitFor({ state: "visible" });
  }
}
