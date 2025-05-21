import { chromium, FullConfig } from "@playwright/test";
import mockPetsData from "../mocks/mockPetsData.json" assert { type: "json" };
import { PETS_API_URL } from "../../src/services/constants";

async function globalSetup(_: FullConfig) {
  const browser = await chromium.launch();

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.route(PETS_API_URL, (route, request) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockPetsData),
      headers: {
        ...request.headers(),
        "x-total-count": `${mockPetsData.length}`,
      },
    });
  });

  await page.route(`${PETS_API_URL}/*`, (route, request) => {
    const url = request.url();
    const id = url.slice(PETS_API_URL.length + 1);

    const mockPetData = mockPetsData.find((mockPet) => mockPet.id === Number(id));

    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockPetData),
    });
  });

  await context.close();
  await browser.close();
}

export default globalSetup;
