import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  urlShortener: {
    handler: "src/functions/urlShortener/index.handler",
    events: [
      {
        http: {
          method: "post",
          path: "/urlshortener",
        },
      },
    ],
  },
};

export default functions;
