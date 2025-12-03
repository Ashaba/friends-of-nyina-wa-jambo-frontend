// vitest.setup.ts
// Mock common Next.js runtime modules used in client components to avoid import-time side effects.

// Mock next/font/google (Nunito) used in layout
vi.mock("next/font/google", () => ({
  Nunito: () => ({ className: "mock-nunito" }),
}));

// Mock next/image to render a plain img element
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: never) => {
    return '<img src="' + (props.src || "") + '" />';
  },
}));

// Mock next/link to render children directly
vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: never) => props.children,
}));

// Mock CSS module imports (return an object proxy)
vi.stubGlobal(
  "CSS_MODULE_PROXY",
  new Proxy(
    {},
    {
      get: () => "",
    }
  )
);

// Provide a simple DOM polyfill for any window.matchMedia usage if needed
if (typeof window !== "undefined" && !window.matchMedia) {
  // @ts-expect-error for testing purposes
  window.matchMedia = () => ({
    matches: false,
    addListener: () => null,
    removeListener: () => null,
  });
}
