import { NextResponse } from "next/server";

import { getAppEnv } from "@/config/env";

/**
 * Lightweight health endpoint for uptime checks — Document 11 §4.4 / 12 §3.9.
 * Returns operational status only; no secrets or catalogue data.
 */
export async function GET() {
  const { contentSource, nodeEnv } = getAppEnv();

  return NextResponse.json(
    {
      ok: true,
      status: "healthy",
      env: nodeEnv,
      contentSource,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
