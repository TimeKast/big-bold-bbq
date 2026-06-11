import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClientArgs } from "payload";
import type { ReactNode } from "react";
import { importMap } from "./admin/importMap.js";
import "@payloadcms/next/css";
import "./custom.scss";

async function serverFunction(args: ServerFunctionClientArgs) {
  "use server";

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
}

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
