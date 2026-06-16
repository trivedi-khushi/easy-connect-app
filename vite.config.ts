import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    ssr: {
      noExternal: ["@videosdk.live/react-sdk", "@videosdk.live/js-sdk"],
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
});