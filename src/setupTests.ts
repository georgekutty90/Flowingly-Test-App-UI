import * as jestDomMatchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

const matchers = (jestDomMatchers as any).default ?? jestDomMatchers;
expect.extend(matchers as any);
