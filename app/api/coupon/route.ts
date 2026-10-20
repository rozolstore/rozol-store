
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = String(body.code ?? "").trim().toUpperCase();

    if (!code || code.length > 80) {
      return Response.json(
        { valid: false, message: "من فضلك أدخل كود الخصم." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !secretKey) {
      return Response.json(
        { valid: false, message: "إعدادات الاتصال غير مكتملة." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, secretKey);

    const { data, error } = await supabase
      .from("loyalty_coupons")
      .select("id, discount_amount, status")
      .eq("code", code)
      .eq("status", "issued")
      .maybeSingle();

    if (error) {
      console.error("Coupon lookup failed:", error.message);
      return Response.json(
        { valid: false, message: "تعذر التحقق من الكود حاليًا." },
        { status: 500 }
      );
    }

    if (!data) {
      return Response.json(
        { valid: false, message: "الكود غير صحيح أو سبق استخدامه." },
        { status: 200 }
      );
    }

    return Response.json({
      valid: true,
      discount: data.discount_amount,
      message: "الكود صالح لخصم 50 جنيه."
    });
  } catch {
    return Response.json(
      { valid: false, message: "حصل خطأ أثناء التحقق من الكود." },
      { status: 400 }
    );
  }
}
