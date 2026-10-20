
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const url = process.env.SUPABASE_URL
    const secret = process.env.SUPABASE_SECRET_KEY;

    if (!url || !secret) {
      return Response.json(
        { success: false, message: "إعدادات الاتصال غير مكتملة." },
        { status: 500 }
      );
    }

    const required = [
      body.id,
      body.name,
      body.phone,
      body.gov,
      body.address
    ];

    if (
      required.some(
        value => typeof value !== "string" || !value.trim()
      ) ||
      !Array.isArray(body.items) ||
      !Number.isInteger(body.subtotal) ||
      !Number.isInteger(body.shipping) ||
      !Number.isInteger(body.total) ||
      body.subtotal < 0 ||
      body.shipping < 0 ||
      body.total < 0
    ) {
      return Response.json(
        { success: false, message: "بيانات الطلب غير مكتملة." },
        { status: 400 }
      );
    }

    const supabase = createClient(url, secret);

    const { data, error } = await supabase.rpc(
      "redeem_eishq_coupon",
      {
        p_code:
          typeof body.couponCode === "string" &&
          body.couponCode.trim()
            ? body.couponCode.trim().toUpperCase()
            : null,
        p_order_id: body.id,
        p_customer_name: body.name,
        p_phone: body.phone,
        p_governorate: body.gov,
        p_address: body.address,
        p_items: body.items,
        p_subtotal: body.subtotal,
        p_shipping: body.shipping,
        p_total: body.total
      }
    );

    if (error) {
      console.error("Order registration failed:", error.message);
      return Response.json(
        {
          success: false,
          message: "تعذر تسجيل الطلب. حاول مرة أخرى."
        },
        { status: 500 }
      );
    }

    if (!data?.success) {
      return Response.json(
        {
          success: false,
          message: data?.message || "تعذر إتمام الطلب."
        },
        { status: 409 }
      );
    }

    return Response.json({
      success: true,
      orderId: data.order_id,
      discount: data.discount
    });
  } catch {
    return Response.json(
      { success: false, message: "حصل خطأ أثناء معالجة الطلب." },
      { status: 400 }
    );
  }
}
