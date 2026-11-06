import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import jest from "eslint-plugin-jest";

export default defineConfig([
  ...nextVitals,
  jest.configs["flat/recommended"],
  {
    rules: {
      "import/no-anonymous-default-export": ["error", { allowObject: true }],
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  globalIgnores([".next/**", "node_modules/**"]),
]);
