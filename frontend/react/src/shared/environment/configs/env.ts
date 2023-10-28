import { Environment } from "../types";

type ApisEnvironment = {
  pokemon: {
    baseUrl: string | undefined;
  };
};

export const env: Environment<ApisEnvironment> = {
  app: {
    name: "Pokemon",
    homepageUrl: "/",
  },
  apis: {
    pokemon: {
      baseUrl: import.meta.env.VITE_API_TODO,
    },
  },
};
