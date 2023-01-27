import { PlaywrightTestConfig } from "@playwright/test";

const baseURL = "http://localhost:5173";

const config: PlaywrightTestConfig = {
  use: {
    baseURL,
  },
  webServer: {
    command: "npm run dev",
    url: baseURL,
  },
};

export default config;
