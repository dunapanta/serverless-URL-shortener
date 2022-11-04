import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  setUrl: {
    handler: "src/functions/setUrl/index.handler",
    events: [
      {
        http: {
          method: "post",
          path: "/",
        },
      },
    ],
  },
};

export default functions;
