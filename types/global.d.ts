import { FetchingOptions } from ".";

declare global {
  namespace Vike {
    interface GlobalContext {
      fetchingOptions: FetchingOptions;
    }
    interface PageContext {
      fetchingOptions: FetchingOptions;
    }
  }
}

// If you define Vike.GlobalContext in a .d.ts file then
// make sure there is at least one export/import statement.
// Tell TypeScript this file isn't an ambient module:
export {};
