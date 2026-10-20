import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authenticated = await isAdminAuthenticated();

  return NextResponse.json(
    { authenticated },
    { status: authenticated ? 200 : 401 }
  );
}