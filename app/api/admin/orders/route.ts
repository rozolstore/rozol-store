
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "يجب تسجيل الدخول أولًا." },
      { status: 401 }
    );
  }

  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secret) {
    console.error("Admin orders: Supabase environment variables are missing.");

    return NextResponse.json(
      { success: false, message: "إعدادات قاعدة البيانات غير مكتملة." },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(url, secret);

    const { data, error } = await supabase
      .from("eishq_orders")
      .select(
        "id, customer_name, phone, governorate, address, items, subtotal, discount, coupon_code, shipping, total, status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("Admin orders query failed:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        { success: false, message: "تعذر تحميل الطلبات." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orders: data ?? [],
    });
  } catch (error) {
    console.error("Admin orders unexpected error:", error);

    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء تحميل الطلبات." },
      { status: 500 }
    );
  }
}
