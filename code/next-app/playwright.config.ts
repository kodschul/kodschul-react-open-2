/**
 * External dependencies
 */
import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  outputDir: "test-results/output",
  reporter: [["html", { open: "always", outputFolder: "test-results/report" }]],
  fullyParallel: true,
};

export default config;
