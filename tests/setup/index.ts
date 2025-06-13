import { test as base } from "@playwright/test";
import { getMockedPetIdData, getMockedPetsData, mockPetsDataTotal } from "../mocks";
import { TOTAL_COUNT_HEADER } from "../../src/services/constants";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**/pets/*", async (route, request) => {
      const url = request.url();
      const mockPetData = getMockedPetIdData(url);

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPetData),
      });
    });

    await page.route("**/pets?*", async (route, request) => {
      const url = request.url();
      const mockPetsData = getMockedPetsData(url);

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPetsData),
        headers: {
          [TOTAL_COUNT_HEADER]: mockPetsDataTotal,
          "access-control-expose-headers": TOTAL_COUNT_HEADER,
        },
      });
    });

    use(page);
  },
});
