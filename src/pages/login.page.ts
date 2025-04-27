import { Locator, Page } from "@playwright/test";
import { step } from "allure-js-commons";
import * as dotenv from "dotenv";

dotenv.config();

export class LoginPage {
  private page: Page;
  private userMenuBtn: Locator;
  private settingsBtn: Locator;
  private langSelect: Locator;
  private saveBtn: Locator;
  private readonly toggleMenuBtn: Locator;
  private header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMenuBtn = this.page.locator(".username-dropdown-trigger");
    this.settingsBtn = this.page.locator("a.dropdown-item").first();
    this.langSelect = this.page.locator("select").nth(1);
    this.saveBtn = this.page.locator("button.base-button--type-button").nth(0);
    this.header = page.locator('header[aria-label="main navigation"]');
    this.toggleMenuBtn = this.page.locator(
      "button.menu-show-button.menu-button",
    );
  }

  async goto(): Promise<void> {
    await step(
      "Перейти на главную страницу и установить настройки",
      async () => {
        await this.page.goto("/");
        await this.login();
        await this.setLangEng();

        if (!(await this.isMenuActive())) {
          await this.toggleMenuBtn.click();
        }
      },
    );
  }

  async login(): Promise<void> {
    await step("Логин", async () => {
      await this.page.locator("#username").fill(process.env.TEST_USERNAME!);
      await this.page.locator("#password").fill(process.env.TEST_PASSWORD!);
      await this.page
        .getByRole("button", {
          name: "Login",
        })
        .click();
    });
  }

  async setLangEng(): Promise<void> {
    await step("Поставить английский язык по умолчанию", async () => {
      await this.userMenuBtn.click();
      await this.settingsBtn.click();
      await this.langSelect.selectOption({ label: "English" });
      await this.saveBtn.click();
      await this.page.goto("/");
    });
  }

  async isMenuActive() {
    return await this.header.evaluate((el) =>
      el.classList.contains("menu-active"),
    );
  }
}
