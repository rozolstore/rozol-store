import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!adminPassword || !sessionSecret) {
      return NextResponse.json(
        { success: false, message: "إعدادات الدخول غير مكتملة." },
        { status: 500 }
      );
    }

    if (
      typeof password !== "string" ||
      password.length > 200 ||
      password.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    const provided = Buffer.from(password);
    const expected = Buffer.from(adminPassword);

    if (
      provided.length !== expected.length ||
      !timingSafeEqual(provided, expected)
    ) {
      return NextResponse.json(
        { success: false, message: "كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    const expiresAt = Math.floor(Date.now() / 1000) + 8 * 60 * 60;
    const payload = `admin:${expiresAt}`;
    const signature = createHmac("sha256", sessionSecret)
      .update(payload)
      .digest("hex");

    const response = NextResponse.json({ success: true });

    response.cookies.set(
      "eishq_admin_session",
      `${payload}:${signature}`,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 8 * 60 * 60,
      }
    );

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "تعذر إتمام تسجيل الدخول." },
      { status: 400 }
    );
  }
}