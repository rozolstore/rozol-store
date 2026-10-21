
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "../auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedStatuses = [
  "pending",
  "printed",
  "waiting_confirmation",
  "no_answer",
  "confirmed",
  "prepared",
  "shipped",
  "delivered",
  "cancelled",
];

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secret) {
    throw new Error("إعدادات قاعدة البيانات غير مكتملة.");
  }

  return createClient(url, secret);
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "يجب تسجيل الدخول أولًا." },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("eishq_orders")
      .select(
        "id, customer_name, phone, governorate, address, items, subtotal, discount, coupon_code, shipping, total, status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("Admin orders query failed:", error.message);
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
    console.error("Admin orders error:", error);
    return NextResponse.json(
      { success: false, message: "تعذر الاتصال بقاعدة البيانات." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "يجب تسجيل الدخول أولًا." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const id = body?.id;
    const status = body?.status;

    if (typeof id !== "string" || !id.trim()) {
      return NextResponse.json(
        { success: false, message: "رقم الطلب غير صحيح." },
        { status: 400 }
      );
    }

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        { success: false, message: "حالة الطلب غير صحيحة." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("eishq_orders")
      .update({ status })
      .eq("id", id)
      .select("id, status")
      .single();

    if (error) {
      console.error("Admin status update failed:", error.message);
      return NextResponse.json(
        {
          success: false,
          message: "تعذر حفظ الحالة. تأكد من إعدادات جدول الطلبات.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
      message: "تم حفظ حالة الطلب.",
    });
  } catch (error) {
    console.error("Admin status update error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء تحديث الحالة." },
      { status: 500 }
    );
  }
}
