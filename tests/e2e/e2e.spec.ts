import { test, expect, type Page, type Locator } from "@playwright/test";
import { SOMETHING_WRONG_MESSAGE } from "../../src/pages/Error/SomethingWrong";
import dayjs from "dayjs";

enum CITY_ERRORS {
  EMPTY = "You must choose the city of origin",
  NOT_VALID = "You must choose a valid city",
  NO_RECOMMENDATIONS = "No recommendations found",
}

const tomorrow = dayjs().add(1, "day");
const formattedTomorrow = tomorrow.format("DD/MM/YYYY");
const nextDay = tomorrow.get("date");
const expectedCities = ["Paris", "Marseille"];
const expectedPassengers = "2";

const getTomorrowFormattedDayForResults = (): string => {
  return dayjs().add(1, "day").format("MMM D, YYYY");
};

const expectedUrlParams = `?cities=%5B%22${expectedCities.join(
  "%22%2C%22"
)}%22%5D&passengers=${expectedPassengers}&date=${formattedTomorrow.replaceAll(
  "/",
  "%2F"
)}`;

test.describe("The user:", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Goes to the home page", async ({ page }) => {
    await expect(page).toHaveTitle(/Travel Planner/);
  });

  test("Fills the City of origin input", async ({ page }) => {
    const cityOfOrigin = page.locator('input[name="city-0"]');
    await fillInputWithText(cityOfOrigin, "Pa");
    await page.waitForTimeout(1000);
    await clickRecommendation(page, "Paris");
    await expect(cityOfOrigin).toHaveValue("Paris");
  });

  test("Fills it with an empty value and tries to submit, the user should see an error", async ({
    page,
  }) => {
    findInputByLocatorAndFillItWithText(page, `input[name="city-0"]`, "");
    await pressSubmitButton(page);
    const error = page.getByText(CITY_ERRORS.NOT_VALID);
    await expect(error).toBeVisible();
  });

  test("Fills it with “fail” and should see an error", async ({ page }) => {
    findInputByLocatorAndFillItWithText(page, `input[name="city-0"]`, "fail");
    await page.waitForTimeout(4001);
    const error = page.getByText(CITY_ERRORS.NO_RECOMMENDATIONS).first();
    await expect(error).toBeVisible();
  });

  test.describe("after fill city of origin input", () => {
    test.beforeEach(async ({ page }) => {
      await findInputByLocatorAndFillItWithText(
        page,
        `input[name="city-0"]`,
        "Paris"
      );
    });

    test("Fills the City of destination input", async ({ page }) => {
      const cityOfDestination = page.locator('input[name="city-1"]');
      await fillInputWithText(cityOfDestination, "Ma");
      await page.getByText("Marseille").nth(1).click();
      await expect(cityOfDestination).toHaveValue("Marseille");
    });

    test("Tries to click the submit button (nothing happen)", async ({
      page,
    }) => {
      const pageUrlBeforeSubmit = page.url();
      await pressSubmitButton(page);
      await expect(page).toHaveURL(pageUrlBeforeSubmit);
    });

    test.describe("after fill cities input", () => {
      test.beforeEach(async ({ page }) => {
        await fillAllCitiesInputs(page);
      });

      test("should have the minus button disabled", async ({ page }) => {
        const minusButton = page.getByLabel("minus");
        await expect(minusButton).toBeDisabled();
      });

      test.describe("after clicks twice on the plus button", () => {
        test.beforeEach(async ({ page }) => {
          await sumPassengers(page, 2);
        });

        test("should add two to the passengers counter", async ({ page }) => {
          const numberOfPassengers = page.getByLabel("counter");
          await expect(numberOfPassengers).toHaveValue("2");
        });

        test("Clicks on the minus button from the passengers input (should subtract a passenger)", async ({
          page,
        }) => {
          await subtractPassengers(page, 1);
          const numberOfPassengers = page.getByLabel("counter");
          await expect(numberOfPassengers).toHaveValue("1");
        });

        test.describe("after change date input with tomorrow value", () => {
          test.beforeEach(async ({ page }) => {
            const dateInput = page.getByPlaceholder("Select Date");
            await dateInput.click();
            const tomorrowDate = page
              .getByTitle(tomorrow.format("YYYY-MM-DD"))
              .getByText(`${nextDay}`);
            await tomorrowDate.click();
          });

          test("Clicks on the date input", async ({ page }) => {
            const dateInput = page.getByPlaceholder("Select Date");
            await expect(dateInput).toHaveValue(formattedTomorrow);
          });

          test("Reloads the page to check if the form data is perdure in the URL", async ({
            page,
          }) => {
            const pageUrl = page.url();
            await page.reload();
            await expect(page).toHaveURL(pageUrl);
          });

          test.describe("after clicks the submit button", () => {
            test.beforeEach(async ({ page }) => {
              await pressSubmitButton(page);
            });

            test("checks the url", async ({ page }) => {
              await expect(page).toHaveURL(`/results${expectedUrlParams}`);
            });

            test("should be all cities", async ({ page }) => {
              expectedCities.forEach(async (city: string) => {
                const cityText = page.getByText(city);
                await expect(cityText).toBeVisible();
              });
            });

            test("should shown the amount of passengers", async ({ page }) => {
              const passengersText = page.getByText(
                `${expectedPassengers} passengers`
              );
              await expect(passengersText).toBeVisible();
            });

            test("should be the formatted date", async ({ page }) => {
              const formattedDate = getTomorrowFormattedDayForResults();
              const dateText = page.getByText(formattedDate);
              await expect(dateText).toBeVisible();
            });
          });
        });
      });

      test.describe("after clicks on the “Add destination”", () => {
        test.beforeEach(async ({ page }) => {
          await clickOnAddDestination(page);
        });

        test("should add a new input", async ({ page }) => {
          const numberOfInputs = await page
            .getByText(/City of destination/)
            .all();

          expect(numberOfInputs.length).toBe(2);
        });

        test("Clicks on the last City of destination input", async ({
          page,
        }) => {
          const cityOfDestination = page.locator('input[name="city-2"]');
          await fillInputWithText(cityOfDestination, "Ly");
          await page.getByText("Lyon").nth(2).click();
          await expect(cityOfDestination).toHaveValue("Lyon");
        });
      });
    });
  });

  test.skip("Must see “Oops! Something went wrong!” if the users fills with “Dijon” some city.", async ({
    page,
  }) => {
    await fillAllInputs(page);
    await findInputByLocatorAndFillItWithText(
      page,
      'input[name="city-0"]',
      "Dijon"
    );
    await clickRecommendation(page, "Dijon");
    await pressSubmitButton(page);
    await page.waitForTimeout(10001);
    const errorMessage = page.getByText(SOMETHING_WRONG_MESSAGE);
    // ? https://github.com/microsoft/playwright/issues/22372
    expect(errorMessage).toBeVisible();
  });
});

const clickRecommendation = async (page: Page, text: string) => {
  await page.getByText(text).first().click();
};

const fillAllInputs = async (page: Page) => {
  await fillAllCitiesInputs(page);
  await sumPassengers(page, 2);
  await fillDateInputWithTomorrow(page);
};

const fillAllCitiesInputs = async (page: Page) => {
  await findInputByLocatorAndFillItWithText(
    page,
    `input[name="city-0"]`,
    "Paris"
  );
  await page.waitForTimeout(3001);
  await page.getByText("Paris").nth(0).click();

  await findInputByLocatorAndFillItWithText(
    page,
    `input[name="city-1"]`,
    "Marseille"
  );
  await page.waitForTimeout(3001);
  await page.getByText("Marseille").nth(1).click();
};

const findInputByLocatorAndFillItWithText = async (
  page: Page,
  locator: string,
  text: string
) => {
  const input = page.locator(locator);
  await fillInputWithText(input, text);
};

const pressSubmitButton = async (page: Page) => {
  await page.getByLabel("button").click();
};

const fillInputWithText = async (input: Locator, text: string) => {
  await input.fill(text);
};

const clickOnAddDestination = async (page: Page) => {
  const addDestination = page.getByText("Add destination");
  await addDestination.click();
};

const sumPassengers = async (page: Page, numberOfPassengers: number) => {
  const plusButton = page.getByLabel("plus");
  for (let i = 0; i < numberOfPassengers; i++) {
    await plusButton.click();
  }
};

const subtractPassengers = async (page: Page, numberOfPassengers: number) => {
  const minusButton = page.getByLabel("minus");
  for (let i = 0; i < numberOfPassengers; i++) {
    await minusButton.click();
  }
};

const fillDateInputWithTomorrow = async (page: Page) => {
  const dateInput = page.getByPlaceholder("Select Date");
  await dateInput.click();
  const tomorrowDate = page
    .getByTitle(tomorrow.format("YYYY-MM-DD"))
    .getByText(`${nextDay}`);
  await tomorrowDate.click();
};
