import { test, expect, type Page, type Locator } from "@playwright/test";
import dayjs from "dayjs";

enum CITY_ERRORS {
  EMPTY = "You must choose the city of origin",
  NOT_VALID = "You must choose a valid city",
}

const formatDate = (date: string): string => {
  
  return dayjs(new Date(date)).format('MMM D, YYYY')
};

const RESULTS_ERROR_MESSAGE = "Oops! Something went wrong!";
const expectedUrlParams =
  "?cities=Paris,Marseille&passengers=2&date=2021-10-13";

test.describe("The user:", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Goes to the home page", async ({ page }) => {
    await expect(page).toHaveTitle(/Travel Planner/);
  });

  test("Fills the City of origin input", async ({ page }) => {
    const cityOfOrigin = page.getByLabel("City of origin");
    fillInputWithText(cityOfOrigin, "Pa");
    await clickRecommendation(page, "Paris");
    await expect(cityOfOrigin).toHaveValue("Paris");
  });

  test("Fills it with “A place that doesn’t exists” and the user should see an error", async ({
    page,
  }) => {
    findInputByLabelAndFillItWithText(
      page,
      "City of origin",
      "A place that doesn’t exists"
    );
    // ? should I use: await cityOfOrigin.press("Tab");
    const error = page.getByText(CITY_ERRORS.NOT_VALID);
    await expect(error).toBeVisible();
  });

  test("Fills it with “fail” and should see an error", async ({ page }) => {
    findInputByLabelAndFillItWithText(page, "City of origin", "fail");
    // ? should I use: await cityOfOrigin.press("Tab");
    const error = page.getByText(CITY_ERRORS.NOT_VALID);
    await expect(error).toBeVisible();
  });

  test("Fills it with “” and should see an error", async ({ page }) => {
    findInputByLabelAndFillItWithText(page, "City of origin", "");
    // ? should I use: await cityOfOrigin.press("Tab");
    const error = page.getByText(CITY_ERRORS.EMPTY);
    await expect(error).toBeVisible();
  });

  test.describe("after fill city of origin input", () => {
    test.beforeEach(async ({ page }) => {
      findInputByLabelAndFillItWithText(page, "City of origin", "Paris");
    });

    test("Fills the City of destination input", async ({ page }) => {
      const cityOfDestination = page.getByLabel("City of destination");
      fillInputWithText(cityOfDestination, "Ma");
      await clickRecommendation(page, "Marseille");
      await expect(cityOfDestination).toHaveValue("Marseille");
    });

    test.describe("after fill cities input", () => {
      test.beforeEach(async ({ page }) => {
        fillAllCitiesInputs(page);
      });

      test("Clicks on the minus button from the passengers input (nothing should happen)", async ({
        page,
      }) => {
        subtractPassengers(page, 1);
        const numberOfPassengers = page.getByLabel("Number of passengers");
        await expect(numberOfPassengers).toHaveValue("0");
      });

      test.describe("after clicks twice on the plus button", () => {
        test.beforeEach(async ({ page }) => {
          sumPassengers(page, 2);
        });

        test("should add two to the passengers counter", async ({ page }) => {
          const numberOfPassengers = page.getByLabel("Number of passengers");
          await expect(numberOfPassengers).toHaveValue("2");
        });

        test("Clicks on the minus button from the passengers input (should subtract a passenger)", async ({
          page,
        }) => {
          subtractPassengers(page, 1);
          const numberOfPassengers = page.getByLabel("Number of passengers");
          await expect(numberOfPassengers).toHaveValue("1");
        });

        test("Tries to click the submit button (nothing happen)", async ({
          page,
        }) => {
          const submitButton = page.getByText("Submit");
          await submitButton.click();
          await expect(page).toHaveURL("/");
        });

        test.describe("after change date input with tomorrow value", () => {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const tomorrowDay = tomorrow.getDate();
          const tomorrowMonth = tomorrow.getMonth();
          const tomorrowYear = tomorrow.getFullYear();

          test.beforeEach(async ({ page }) => {
            const dateInput = page.getByLabel("Date");
            await dateInput.click();
            const tomorrowDate = page.getByText(`${tomorrowDay}`);
            await tomorrowDate.click();
          });

          test("Clicks on the date input", async ({ page }) => {
            const dateInput = page.getByLabel("Date");
            expect(dateInput).toHaveValue(
              `${tomorrowYear}/${tomorrowMonth}/${tomorrowDay}`
            );
          });

          test("Reloads the page to check if the form data is perdure in the URL", async ({
            page,
          }) => {
            await page.reload();
            await expect(page).toHaveURL(
              `/${expectedUrlParams}`
            );
          });

          test.describe("after clicks the submit button", () => {
            const urlParams = new URLSearchParams(expectedUrlParams);
            const cities = urlParams.get("cities");
            const passengers = urlParams.get("passengers");
            const date = urlParams.get("date");

            test.beforeEach(async ({ page }) => {
              const submitButton = page.getByText("Submit");
              await submitButton.click();
            });

            test("checks the url", async ({ page }) => {
              await expect(page).toHaveURL(
                `/results${expectedUrlParams}`
              );
            });

            test("should be all cities", async ({ page }) => {
              cities?.split(",").forEach(async (city) => {
                const cityText = page.getByText(city);
                await expect(cityText).toBeVisible();
              });
            });

            test("should shown the amount of passengers", async ({ page }) => {
              const passengersText = page.getByText(`${passengers} passengers`);
              await expect(passengersText).toBeVisible();
            });

            test("should be the formatted date", async ({ page }) => {
              const formattedDate = formatDate(date!);
              const dateText = page.getByText(formattedDate);
              await expect(dateText).toBeVisible();
            });
          });
        });
      });

      test.describe("after clicks on the “Add destination”", () => {
        test.beforeEach(async ({ page }) => {
          clickOnAddDestination(page);
        });

        test("should add a new input", async ({ page }) => {
          const numberOfInputs = await page
            .getByLabel(/City of destination/)
            .all();
          expect(numberOfInputs.length).toBe(2);
        });

        test("Clicks on the last City of destination input", async ({
          page,
        }) => {
          const cityOfDestination = page
            .getByLabel(/City of destination/)
            .last();
          fillInputWithText(cityOfDestination, "Ly");
          clickRecommendation(page, "Lyon");
          await expect(cityOfDestination).toHaveValue("Lyon");
        });
      });
    });
  });

  test("Must see “Oops! Something went wrong!” if the users fills with “Dijon” some city.", async ({
    page,
  }) => {
    fillAllInputs(page);
    const cityOfOrigin = page.getByLabel("City of origin");
    cityOfOrigin.click();
    cityOfOrigin.fill("Dijon");
    const submitButton = page.getByText("Submit");
    await submitButton.click();
    const errorMessage = page.getByText(RESULTS_ERROR_MESSAGE);
    expect(errorMessage).toBeVisible();
  });
});

const clickRecommendation = async (page: Page, text: string) => {
  const recommendation = page.getByText(text);
  await recommendation.click();
};

const fillAllInputs = (page: Page) => {
  fillAllCitiesInputs(page);
  sumPassengers(page, 2);
  fillDateInputWithTomorrow(page);
};

const fillAllCitiesInputs = (page: Page) => {
  findInputByLabelAndFillItWithText(page, "City of origin", "Paris");
  findInputByLabelAndFillItWithText(page, "City of destination", "Marseille");
};

const findInputByLabelAndFillItWithText = (
  page: Page,
  label: string,
  text: string
) => {
  const input = page.getByLabel(label);
  fillInputWithText(input, text);
};

const fillInputWithText = (input: Locator, text: string) => {
  input.click();
  input.fill(text);
};

const clickOnAddDestination = (page: Page) => {
  const addDestination = page.getByText("Add destination");
  addDestination.click();
};

const sumPassengers = (page: Page, numberOfPassengers: number) => {
  const plusButton = page.getByLabel("Add a passenger");
  for (let i = 0; i < numberOfPassengers; i++) {
    plusButton.click();
  }
};

const subtractPassengers = (page: Page, numberOfPassengers: number) => {
  const minusButton = page.getByLabel("Remove a passenger");
  for (let i = 0; i < numberOfPassengers; i++) {
    minusButton.click();
  }
};

const fillDateInputWithTomorrow = (page: Page) => {
  const dateInput = page.getByLabel("Date");
  dateInput.click();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDay = tomorrow.getDate();
  const tomorrowDate = page.getByText(`${tomorrowDay}`);
  tomorrowDate.click();
};
