import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Ohne globale Test-APIs räumt Testing Library nicht automatisch auf.
afterEach(cleanup);
