
"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  governorate: string;
  address: string;
  items: unknown;
  subtotal: number;
  discount: number;
  coupon_code: string | null;
  shipping: number;
  total: number;
  status: string;
  created_at: string;
};

const statuses = [
  "pending",
  "waiting_confirmation",
  "no_answer",
  "confirmed",
  "prepared",
  "shipped",
  "delivered",
  "cancelled",
];

const statusLabels: Record<string, string> = {
  pending: "طلب جديد",
  waiting_confirmation: "بانتظار التأكيد",
  no_answer: "العميل لا يرد",
  confirmed: "تم التأكيد",
  prepared: "تم التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  async function loadOrders() {
    setLoadingOrders(true);
    setError("");

    try {
      const response = await fetch("/api/admin/orders", {
        cache: "no-store",
      });
      const result = await response.json();

      if (response.status === 401) {
        setLoggedIn(false);
        setOrders([]);
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "تعذر تحميل الطلبات.");
      }

      setOrders(result.orders ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الطلبات."
      );
    } finally {
      setLoadingOrders(false);
    }
  }

  useEffect(() => {
    let active = true;

    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => {
        if (active) setLoggedIn(response.ok);
      })
      .catch(() => {
        if (active) setLoggedIn(false);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      void loadOrders();
    }
  }, [loggedIn]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoggingIn(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "كلمة المرور غير صحيحة.");
        return;
      }

      setPassword("");
      setLoggedIn(true);
    } catch {
      setError("تعذر الاتصال بالسيرفر. حاول مرة أخرى.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setLoggedIn(false);
      setOrders([]);
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === "all" || order.status === filter;
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      order.id.toLowerCase().includes(query) ||
      order.customer_name.toLowerCase().includes(query) ||
      order.phone.includes(query);

    const orderDate = new Date(order.created_at).toLocaleDateString("en-CA");
    const matchesDate = !selectedDate || orderDate === selectedDate;

    return matchesStatus && matchesSearch && matchesDate;
  });

  function exportExcel() {
    import("xlsx")
      .then((XLSX) => {
        const rows = filteredOrders.map((order) => ({
          "رقم الطلب": order.id,
          "اسم العميل": order.customer_name,
          "رقم الهاتف": order.phone,
          المحافظة: order.governorate,
          العنوان: order.address,
          المنتجات: JSON.stringify(order.items),
          المجموع: order.subtotal,
          الخصم: order.discount,
          الشحن: order.shipping,
          "الإجمالي عند الاستلام": order.total,
          الحالة: statusLabels[order.status] || order.status,
          "تاريخ الطلب": new Date(order.created_at).toLocaleString("ar-EG"),
        }));

        const sheet = XLSX.utils.json_to_sheet(rows);
        const book = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(book, sheet, "طلبات EISHQ");
        XLSX.writeFile(book, "EISHQ-orders.xlsx");
      })
      .catch(() => {
        setError("تعذر إنشاء ملف Excel.");
      });
  }

  function printLabel(order: Order) {
    const popup = window.open("", "_blank", "width=500,height=800");

    if (!popup) {
      setError("اسمح بفتح النوافذ المنبثقة لطباعة البوليصة.");
      return;
    }

    const safe = (value: unknown) =>
      String(value ?? "").replace(/[&<>"']/g, (char) => {
        const entities: Record<string, string> = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return entities[char];
      });

    function formatItems(value: unknown): string {
      if (Array.isArray(value)) {
        return value
          .map((item) => {
            if (item && typeof item === "object") {
              const product = item as Record<string, unknown>;
              const name = String(product.name ?? "منتج");
              const quantity = Number(product.quantity ?? 1);
              const price = Number(product.price ?? 0);
              return `${name} × ${quantity} — ${price * quantity} جنيه`;
            }
            return String(item);
          })
          .join("\n");
      }

      if (typeof value === "string") {
        try {
          const parsed: unknown = JSON.parse(value);
          if (Array.isArray(parsed)) return formatItems(parsed);
        } catch {
          // Keep ordinary text as entered.
        }
        return value;
      }

      return JSON.stringify(value ?? [], null, 2);
    }

    const itemText = formatItems(order.items);
    const orderDate = new Date(order.created_at).toLocaleString("ar-EG");

    popup.document.write(`
      <!doctype html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>بوليصة ${safe(order.id)}</title>
        <style>
          @page {
            size: 100mm 130mm;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          html, body {
            margin: 0;
            padding: 0;
            width: 100mm;
            min-height: 130mm;
            background: #fff;
            color: #222;
            font-family: Arial, Tahoma, sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body {
            padding: 5mm;
            font-size: 11px;
            line-height: 1.45;
          }

          .label {
            width: 90mm;
            min-height: 120mm;
            margin: 0 auto;
          }

          .header {
            text-align: center;
            border: 1.5px solid #5D2829;
            padding: 3mm;
            margin-bottom: 3mm;
          }

          .brand {
            margin: 0;
            color: #5D2829;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 1px;
          }

          .brand-ar {
            font-size: 13px;
            margin-right: 3px;
          }

          .subtitle {
            margin: 1mm 0 0;
            font-size: 11px;
            font-weight: bold;
          }

          .order-id {
            margin-top: 2.5mm;
            padding: 2mm;
            background: #f6f0e4;
            border: 1px dashed #5D2829;
          }

          .order-id span {
            display: block;
            font-size: 10px;
          }

          .order-id strong {
            display: block;
            direction: ltr;
            font-size: 17px;
            letter-spacing: 1px;
            overflow-wrap: anywhere;
          }

          .date {
            margin: 2mm 0;
            font-size: 10px;
          }

          .section {
            border: 1px solid #bbb;
            margin: 2.5mm 0;
            padding: 2.5mm;
            break-inside: avoid;
          }

          h2 {
            font-size: 12px;
            margin: 0 0 2mm;
            padding-bottom: 1mm;
            color: #5D2829;
            border-bottom: 1px solid #DCC49D;
          }

          .field {
            margin: 1.5mm 0;
            overflow-wrap: anywhere;
          }

          .field span {
            font-weight: bold;
          }

          .phone, .latin {
            direction: ltr;
            unicode-bidi: embed;
          }

          .address {
            line-height: 1.6;
          }

          .items {
            white-space: pre-wrap;
            overflow-wrap: anywhere;
            font-size: 10.5px;
            margin: 0;
            font-family: inherit;
          }

          .payment {
            border: 1px solid #DCC49D;
            padding: 2.5mm;
            display: flex;
            justify-content: space-between;
            gap: 2mm;
            align-items: center;
            margin-top: 2.5mm;
          }

          .total {
            border: 2px solid #5D2829;
            background: #f6f0e4;
            padding: 3mm;
            margin-top: 2.5mm;
            text-align: center;
          }

          .total span {
            display: block;
            font-size: 11px;
          }

          .total strong {
            display: block;
            color: #5D2829;
            font-size: 19px;
          }

          .barcode {
            margin-top: 3mm;
            padding: 2mm;
            border: 1px dashed #888;
            text-align: center;
          }

          .barcode-title {
            font-size: 10px;
            font-weight: bold;
          }

          .barcode-lines {
            height: 13mm;
            margin: 2mm auto 1mm;
            width: 70mm;
            background:
              repeating-linear-gradient(
                90deg,
                #111 0,
                #111 0.5mm,
                transparent 0.5mm,
                transparent 1mm,
                #111 1mm,
                #111 1.8mm,
                transparent 1.8mm,
                transparent 2.4mm
              );
          }

          .barcode-id {
            direction: ltr;
            font-size: 10px;
            letter-spacing: 1px;
            overflow-wrap: anywhere;
          }

          .barcode-note {
            color: #555;
            font-size: 9px;
          }

          .footer {
            margin-top: 2.5mm;
            text-align: center;
            color: #5D2829;
            font-size: 9px;
          }

          .actions {
            text-align: center;
            margin: 12px;
          }

          .actions button {
            border: 0;
            border-radius: 5px;
            padding: 10px 18px;
            background: #5D2829;
            color: white;
            cursor: pointer;
            font-size: 14px;
          }

          @media screen {
            body {
              margin: 12px auto;
              box-shadow: 0 0 10px #ccc;
            }
          }

          @media print {
  html, body {
    width: 100mm;
    min-height: 130mm;
    margin: 0;
    padding: 0;
    box-shadow: none;
  }

  .actions {
    display: none !important;
  }
}
        </style>
      </head>
      <body>
        <main class="label">
          <header class="header">
            <h1 class="brand">EISHQ <span class="brand-ar">عشق</span></h1>
            <p class="subtitle">بوليصة تجهيز وشحن داخلية</p>
            <div class="order-id">
              <span>رقم الطلب</span>
              <strong>${safe(order.id)}</strong>
            </div>
          </header>

          <div class="date">
            <strong>تاريخ الطلب:</strong> ${safe(orderDate)}
          </div>

          <section class="section">
            <h2>بيانات المستلم</h2>
            <div class="field"><span>الاسم:</span> ${safe(order.customer_name)}</div>
            <div class="field"><span>الهاتف:</span> <b class="phone">${safe(order.phone)}</b></div>
            <div class="field"><span>المحافظة:</span> ${safe(order.governorate)}</div>
            <div class="field address"><span>العنوان:</span> ${safe(order.address)}</div>
          </section>

          <section class="section">
            <h2>محتويات الشحنة</h2>
            <pre class="items">${safe(itemText)}</pre>
          </section>

          <section class="payment">
            <span>طريقة الدفع</span>
            <strong>الدفع عند الاستلام</strong>
          </section>

          <section class="total">
            <span>إجمالي التحصيل عند الاستلام</span>
            <strong>${safe(order.total)} جنيه</strong>
          </section>

          <section class="barcode">
  <div class="barcode-title">منطقة الباركود الداخلي</div>
  <div class="barcode-lines" aria-hidden="true"></div>
  <div class="barcode-id">${safe(order.id)}</div>
  <div class="barcode-note">الخطوط شكل توضيحي وليست باركودًا قابلًا للمسح</div>
</section>

          <footer class="footer">
            EISHQ — Elegance in every drop
          </footer>
        </main>

        <div class="actions">
          <button onclick="window.print()">طباعة البوليصة</button>
        </div>
      </body>
      </html>
    `);

    popup.document.close();
  }

  if (checkingSession) {
    return (
      <main dir="rtl" style={centerStyle}>
        جاري التحقق من تسجيل الدخول...
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main dir="rtl" style={centerStyle}>
        <form onSubmit={handleLogin} style={loginCardStyle}>
          <h1 style={{ color: "#5D2829", fontSize: 32, marginBottom: 8 }}>
            EISHQ
          </h1>
          <p style={{ color: "#5D2829", marginBottom: 24 }}>
            لوحة إدارة الطلبات
          </p>

          <input
            type="password"
            placeholder="كلمة مرور الإدارة"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={inputStyle}
          />

          <button type="submit" disabled={loggingIn} style={buttonStyle}>
            {loggingIn ? "جاري تسجيل الدخول..." : "دخول لوحة التحكم"}
          </button>

          {error && <p style={{ color: "#b00020" }}>{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main dir="rtl" style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>EISHQ | إدارة الطلبات</h1>
          <p style={{ marginBottom: 0 }}>متابعة وتجهيز وشحن طلبات العملاء</p>
        </div>
        <button onClick={handleLogout} style={lightButtonStyle}>
          تسجيل الخروج
        </button>
      </header>

      <section style={statsGridStyle}>
        {[
          ["كل الطلبات", orders.length],
          ["طلبات جديدة", orders.filter((o) => o.status === "pending").length],
          ["تم التأكيد", orders.filter((o) => o.status === "confirmed").length],
          ["تم الشحن", orders.filter((o) => o.status === "shipped").length],
        ].map(([title, value]) => (
          <article key={String(title)} style={statCardStyle}>
            <p style={{ margin: 0, color: "#76504B" }}>{title}</p>
            <strong style={{ fontSize: 30, color: "#5D2829" }}>{value}</strong>
          </article>
        ))}
      </section>

      <section style={panelStyle}>
        <h2 style={{ color: "#5D2829", marginTop: 0 }}>إدارة الطلبات</h2>

        <div style={filtersStyle}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث برقم الطلب أو الاسم أو الهاتف"
            style={inputStyle}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={inputStyle}
          >
            <option value="all">كل الحالات</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={inputStyle}
          />

          <button onClick={exportExcel} style={buttonStyle}>
            تصدير Excel
          </button>

          <button onClick={() => void loadOrders()} style={lightButtonStyle}>
            {loadingOrders ? "جاري التحديث..." : "تحديث الطلبات"}
          </button>
        </div>

        {error && <p style={{ color: "#b00020" }}>{error}</p>}
        {loadingOrders && <p>جاري تحميل الطلبات...</p>}

        {!loadingOrders && filteredOrders.length === 0 && (
          <p>لا توجد طلبات مطابقة للبحث.</p>
        )}

        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>رقم الطلب</th>
                <th style={cellStyle}>العميل</th>
                <th style={cellStyle}>الهاتف</th>
                <th style={cellStyle}>المحافظة والعنوان</th>
                <th style={cellStyle}>الإجمالي</th>
                <th style={cellStyle}>الحالة</th>
                <th style={cellStyle}>التاريخ</th>
                <th style={cellStyle}>البوليصة</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td style={cellStyle}>{order.id}</td>
                  <td style={cellStyle}>{order.customer_name}</td>
                  <td style={cellStyle}>{order.phone}</td>
                  <td style={cellStyle}>
                    {order.governorate}
                    <br />
                    {order.address}
                  </td>
                  <td style={cellStyle}>{order.total} جنيه</td>
                  <td style={cellStyle}>
                    {statusLabels[order.status] || order.status}
                  </td>
                  <td style={cellStyle}>
                    {new Date(order.created_at).toLocaleString("ar-EG")}
                  </td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => printLabel(order)}
                      style={lightButtonStyle}
                    >
                      طباعة البوليصة
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ color: "#76504B", marginTop: 16 }}>
          تغيير حالات الطلبات سيتم تفعيله بعد تجهيز API محمي لتحديث الحالة.
          البوليصة هنا داخلية للطباعة وليست بوليصة رسمية لشركة شحن.
        </p>
      </section>
    </main>
  );
}

const centerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#F6F0E4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  fontFamily: "Arial, sans-serif",
  color: "#5D2829",
};

const loginCardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
  background: "#fff",
  padding: 30,
  borderRadius: 12,
  border: "1px solid #DCC49D",
  textAlign: "center",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  border: "1px solid #DCC49D",
  borderRadius: 6,
  boxSizing: "border-box",
  background: "#fff",
  color: "#371818",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 18px",
  background: "#5D2829",
  color: "#F6F0E4",
  border: 0,
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
};

const lightButtonStyle: React.CSSProperties = {
  padding: "12px 18px",
  background: "#DCC49D",
  color: "#371818",
  border: "1px solid #5D2829",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#F6F0E4",
  padding: 24,
  fontFamily: "Arial, sans-serif",
  color: "#371818",
};

const headerStyle: React.CSSProperties = {
  background: "#5D2829",
  color: "#F6F0E4",
  padding: 24,
  borderRadius: 10,
  marginBottom: 24,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap",
};

const statsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #DCC49D",
  borderRadius: 10,
  padding: 22,
};

const panelStyle: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  border: "1px solid #DCC49D",
};

const filtersStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
  marginBottom: 20,
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "right",
  minWidth: 900,
};

const cellStyle: React.CSSProperties = {
  borderBottom: "1px solid #E8DCC8",
  padding: 12,
  verticalAlign: "top",
};
