"use client";

import Image from "next/image";
import { useState } from "react";

type Perfume = {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  description: string;
  size: string;
  longevity: string;
  projection: string;
};

const perfumes: Perfume[] = [ 
  {
    id: 1,
    name: "Bleu de Chanel",
    oldPrice: 1200,
    newPrice: 800,
    image: "/image/bleu.jpg",
    description: "عطر رجالي فاخر برائحة منعشة وخشبية يناسب جميع المناسبات.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 2,
    name: "Versace Eros",
    oldPrice: 1200,
    newPrice: 800,
    image: "/image/eros.jpg",
    description: "عطر رجالي جذاب بطابع شرقي ومنعش يمنحك حضورًا مميزًا.",
    size: "100ml",
    longevity: "8 ساعات",
    projection: "قوي",
  },

  {
    id: 3,
    name: "Dior Sauvage",
    oldPrice: 1300,
    newPrice: 900,
    image: "/image/sauvage.jpg",
    description: "عطر رجالي فاخر بثبات وفوحان ممتاز يناسب جميع الأوقات.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي جدًا",
  },

  {
    id: 4,
    name: "YSL Y",
    oldPrice: 1200,
    newPrice: 800,
    image: "/image/ysl.jpg",
    description: "عطر شبابي أنيق برائحة منعشة وخشبية.",
    size: "100ml",
    longevity: "7 - 9 ساعات",
    projection: "متوسط إلى قوي",
  },
{
  id: 5,
  name: "ايربابورا",
  oldPrice: 1200,
  newPrice: 900,
  image: "/image/erba.jpg",
  description: "عطر فاخر برائحة منعشة وفخمة.",
  size: "100ml",
  longevity: "8 - 10 ساعات",
  projection: "قوي",
},

{
  id: 6,
  name: "بيانكو لاتيه",
  oldPrice: 1200,
  newPrice: 850,
  image: "/image/bianco.jpg",
  description: "عطر ناعم وأنيق برائحة مميزة.",
  size: "100ml",
  longevity: "8 ساعات",
  projection: "متوسط إلى قوي",
},

{
  id: 7,
  name: "يارا",
  oldPrice: 1400,
  newPrice: 1000,
  image: "/image/yara.jpg",
  description: "عطر حريمي جذاب برائحة حلوة وفاخرة.",
  size: "100ml",
  longevity: "8 - 10 ساعات",
  projection: "قوي",
},

{
  id: 8,
  name: "دوف",
  oldPrice: 1400,
  newPrice: 1000,
  image: "/image/dove.jpg",
  description: "عطر راقي بإحساس نظيف ورائحة أنيقة.",
  size: "100ml",
  longevity: "7 - 9 ساعات",
  projection: "متوسط",
},

{
  id: 9,
  name: "خمرة",
  oldPrice: 1200,
  newPrice: 800,
  image: "/image/khamrah.jpg",
  description: "عطر شرقي فاخر برائحة دافئة وجذابة.",
  size: "100ml",
  longevity: "10 ساعات",
  projection: "قوي",
},

{
  id: 10,
  name: "Si",
  oldPrice: 1400,
  newPrice: 1000,
  image: "/image/si.jpg",
  description: "عطر حريمي راقي برائحة أنيقة.",
  size: "100ml",
  longevity: "8 ساعات",
  projection: "قوي",
},

];
const shippingPrices = {
  "القاهرة": 80,
  "الجيزة": 80,
  "الإسكندرية": 100,
  "الدلتا": 100,
  "الصعيد": 100,
};

const confirmPayment = 100;
export default function Home() {
  const [cart, setCart] = useState<Perfume[]>([]);
  const [openCart, setOpenCart] = useState(false);
const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [customerName, setCustomerName] = useState("");
const [customerPhone, setCustomerPhone] = useState("");
const [customerAddress, setCustomerAddress] = useState("");
const [customerGovernorate, setCustomerGovernorate] = useState("");
const addToCart = (perfume: Perfume) => {
    setCart([...cart, perfume]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.length * 800;
const shipping =
  shippingPrices[
    customerGovernorate as keyof typeof shippingPrices
  ] || 0;

const finalTotal = total + shipping;
const remaining = finalTotal - confirmPayment;
  const whatsappMessage =
    "السلام عليكم، أريد طلب:\n\n" +
    cart
      .map((item) => `• ${item.name} - ${item.newPrice} EGP`)
      .join("\n") +
    `\n\nالإجمالي: ${total} EGP`;

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-yellow-500/20">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

          <h1 className="text-3xl md:text-4xl font-black text-yellow-500 tracking-widest">
            ROZOL
          </h1>

          <ul className="hidden md:flex gap-8 font-semibold">

            <li>
              <a href="#">الرئيسية</a>
            </li>

            <li>
              <a href="#products">العطور</a>
            </li>

            <li>
              <a href="#why">لماذا نحن</a>
            </li>

            <li>
              <a href="#contact">تواصل</a>
            </li>

          </ul>

          <button
            onClick={() => setOpenCart(true)}
            className="bg-yellow-500 hover:scale-105 duration-300 text-black px-5 py-2 rounded-full font-bold shadow-lg"
          >
            🛒 {cart.length}
          </button>

        </div>

      </nav>

      {/* Hero */}

      <section className="relative overflow-hidden py-28 px-6 text-center">

        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent"></div>

        <div className="relative max-w-4xl mx-auto">

          <p className="uppercase tracking-[8px] text-yellow-500 font-bold">
            Luxury Perfumes
          </p>

          <h1 className="text-6xl md:text-8xl font-black mt-6">
            ROZOL
          </h1>

          <p className="text-gray-300 mt-8 text-xl leading-9">
           عطور أصلية بثبات فاخر 🔥
            <br />
            اطلب الأن والدفع عند الأستلام
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <a
              href="#products"
              className="bg-yellow-500 hover:bg-yellow-400 hover:scale-105 duration-300 text-black px-10 py-4 rounded-full font-bold shadow-xl"
            >
             اطلب عطرك الآن 🔥
            </a>

            <a
              href="https://wa.me/201098941704"
              target="_blank"
              className="border border-yellow-500 hover:bg-yellow-500 hover:text-black duration-300 px-10 py-4 rounded-full font-bold"
            >
              واتساب
            </a>

          </div>

        </div>

      </section>
            {/* Products */}

      <section
        id="products"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-5xl font-black text-center mb-4">
          أشهر العطور
        </h2>

        <p className="text-center text-gray-400 mb-14">
          عروض لفترة محدودة 🔥
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {perfumes.map((item) => (

<div
  key={item.id}
  className="relative group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500 duration-300 shadow-2xl"
>
              {/* Discount */}

              <div className="absolute bg-red-600 text-white px-4 py-1 rounded-br-2xl font-bold z-10">
                خصم 33%
              </div>

<div
  onClick={() => setSelectedPerfume(item)}
  className="cursor-pointer"
>
  <Image
    src={item.image}
    alt={item.name}
    width={500}
    height={500}
    className="w-full h-80 object-cover group-hover:scale-110 duration-500"
  />
</div>
              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {item.name}
                </h3>

                <div className="mt-4 flex items-center gap-3">

                  <span className="text-gray-500 line-through text-lg">
                    {item.oldPrice} EGP
                  </span>

                  <span className="text-3xl text-yellow-500 font-black">
                    {item.newPrice} EGP
                  </span>

                </div>

                <p className="text-green-400 mt-2">
                  وفر 400 جنيه
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-bold duration-300"
                  >
                    أضف للسلة
                  </button>

                  <button
                    className="w-14 rounded-xl border border-yellow-500 hover:bg-red-500 hover:border-red-500 duration-300"
                  >
                    ❤️
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>
            {/* Why Us */}

      <section
        id="why"
        className="py-24 px-6 bg-gradient-to-b from-zinc-900 to-black"
      >
        <h2 className="text-5xl font-black text-center">
          لماذا تختار ROZOL؟
        </h2>

        <p className="text-center text-gray-400 mt-4">
          لأن الجودة أهم من أي شيء
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 rounded-3xl p-8 text-center duration-300">

            <div className="text-6xl">💎</div>

            <h3 className="text-2xl font-bold text-yellow-500 mt-6">
              أصلية 100%
            </h3>

            <p className="text-gray-400 mt-4 leading-8">
              جميع العطور لدينا أصلية بجودة عالية وثبات ممتاز.
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 rounded-3xl p-8 text-center duration-300">

            <div className="text-6xl">🚚</div>

            <h3 className="text-2xl font-bold text-yellow-500 mt-6">
              شحن سريع
            </h3>

            <p className="text-gray-400 mt-4 leading-8">
              توصيل لجميع المحافظات خلال أيام قليلة.
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 rounded-3xl p-8 text-center duration-300">

            <div className="text-6xl">⭐</div>

            <h3 className="text-2xl font-bold text-yellow-500 mt-6">
              تقييمات ممتازة
            </h3>

            <p className="text-gray-400 mt-4 leading-8">
              آلاف العملاء راضون عن جودة العطور والخدمة.
            </p>

          </div>

        </div>

      </section>

      {/* Reviews */}

      <section className="py-24 px-6">

        <h2 className="text-5xl font-black text-center">
          آراء العملاء
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <div className="text-yellow-500 text-2xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-5 text-gray-300 leading-8">
              العطر ثابت جداً وأفضل من المتوقع.
            </p>

            <h4 className="mt-6 font-bold">
              أحمد
            </h4>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <div className="text-yellow-500 text-2xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-5 text-gray-300 leading-8">
              التغليف ممتاز والشحن سريع.
            </p>

            <h4 className="mt-6 font-bold">
              محمد
            </h4>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <div className="text-yellow-500 text-2xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-5 text-gray-300 leading-8">
              السعر ممتاز مقارنة بالجودة.
            </p>

            <h4 className="mt-6 font-bold">
              كريم
            </h4>

          </div>

        </div>

      </section>

      {/* Offer */}

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-[40px] p-12 text-center text-black shadow-2xl">

          <h2 className="text-5xl font-black">
            خصم لفترة محدودة
          </h2>

          <p className="text-2xl mt-6">
            بدلاً من
            <span className="line-through mx-2">
              1200 EGP
            </span>

            فقط

            <span className="font-black text-4xl mx-2">
              800 EGP
            </span>

          </p>

          <a
            href="#products"
            className="inline-block mt-10 bg-black text-white px-10 py-4 rounded-full font-bold hover:scale-105 duration-300"
          >
            اطلب الآن
          </a>

        </div>

      </section>
            {/* Contact */}

      <section
        id="contact"
        className="py-24 px-6 bg-zinc-950"
      >

        <h2 className="text-5xl font-black text-center">
          تواصل معنا
        </h2>

        <p className="text-center text-gray-400 mt-4">
          يسعدنا الرد على جميع استفساراتكم
        </p>

        <div className="max-w-2xl mx-auto mt-14 bg-zinc-900 rounded-[35px] border border-zinc-800 p-8">

          <input
            type="text"
            placeholder="الاسم"
            className="w-full mb-5 p-4 rounded-xl bg-black border border-zinc-700 outline-none focus:border-yellow-500"
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full mb-5 p-4 rounded-xl bg-black border border-zinc-700 outline-none focus:border-yellow-500"
          />

          <textarea
            rows={5}
            placeholder="رسالتك"
            className="w-full p-4 rounded-xl bg-black border border-zinc-700 outline-none focus:border-yellow-500"
          />
<select
  value={customerGovernorate}
  onChange={(e) => setCustomerGovernorate(e.target.value)}
  className="w-full border p-3 rounded-xl mt-3"
>
  <option value="">اختر المحافظة</option>
  <option value="القاهرة">القاهرة</option>
  <option value="الجيزة">الجيزة</option>
  <option value="الإسكندرية">الإسكندرية</option>
  <option value="الدلتا">الدلتا</option>
  <option value="الصعيد">الصعيد</option>
</select>
          <button
            className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-bold duration-300"
          >
            إرسال
          </button>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-zinc-800 py-12">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-black text-yellow-500">
            ROZOL
          </h2>

          <p className="text-gray-400 mt-4">
            أفخم العطور الرجالي والحريمي الأصلية
          </p>

          <div className="flex justify-center gap-8 mt-8 text-lg">

            <a
              href="https://www.instagram.com/rozol.store"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 duration-300"
            >
              Instagram
            </a>

            <a
              href="https://www.tiktok.com/@rozol.store"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 duration-300"
            >
              TikTok
            </a>

            <a
              href="https://wa.me/201098941704"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 duration-300"
            >
              WhatsApp
            </a>

          </div>

          <p className="text-gray-600 mt-10">
            © 2026 ROZOL. All Rights Reserved.
          </p>

        </div>

      </footer>

      {/* Floating WhatsApp */}

      <a
        href="https://wa.me/201098941704"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 hover:scale-110 duration-300 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl text-4xl z-50"
      >
        💬
      </a>
{/* Cart */}

{openCart && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

<div className="bg-white text-black w-[92%] max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-black">
          🛒 تأكيد الطلب
        </h2>

        <button
          onClick={() => setOpenCart(false)}
          className="text-3xl hover:text-red-500 duration-300"
        >
          ✕
        </button>

      </div>


      {cart.length === 0 ? (

        <div className="text-center py-10">

          <p className="text-6xl">🛍️</p>

          <p className="mt-5 text-xl">
            السلة فارغة
          </p>

        </div>

      ) : (

        <>

          <div className="space-y-3 mb-6">

            <input
              type="text"
              placeholder="الاسم"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="رقم الهاتف"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full border p-3 rounded-xl"
            />

            <textarea
              placeholder="العنوان"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full border p-3 rounded-xl"
            />
<textarea
  placeholder="العنوان"
  value={customerAddress}
  onChange={(e) => setCustomerAddress(e.target.value)}
  className="w-full border p-3 rounded-xl"
/>

<select
  value={customerGovernorate}
  onChange={(e) => setCustomerGovernorate(e.target.value)}
  className="w-full border p-3 rounded-xl mt-3"
>
  <option value="">اختر المحافظة</option>
  <option value="القاهرة">القاهرة</option>
  <option value="الجيزة">الجيزة</option>
  <option value="الإسكندرية">الإسكندرية</option>
  <option value="القليوبية">القليوبية</option>
  <option value="الشرقية">الشرقية</option>
  <option value="الغربية">الغربية</option>
  <option value="الدقهلية">الدقهلية</option>
  <option value="المنوفية">المنوفية</option>
  <option value="البحيرة">البحيرة</option>
  <option value="كفر الشيخ">كفر الشيخ</option>
  <option value="دمياط">دمياط</option>
  <option value="بورسعيد">بورسعيد</option>
  <option value="الإسماعيلية">الإسماعيلية</option>
  <option value="السويس">السويس</option>
  <option value="شمال سيناء">شمال سيناء</option>
  <option value="جنوب سيناء">جنوب سيناء</option>
  <option value="بني سويف">بني سويف</option>
  <option value="الفيوم">الفيوم</option>
  <option value="المنيا">المنيا</option>
  <option value="أسيوط">أسيوط</option>
  <option value="سوهاج">سوهاج</option>
  <option value="قنا">قنا</option>
  <option value="الأقصر">الأقصر</option>
  <option value="أسوان">أسوان</option>
  <option value="مطروح">مطروح</option>
  <option value="الوادي الجديد">الوادي الجديد</option>

</select>
          </div>


          <div className="space-y-4 max-h-60 overflow-y-auto">

            {cart.map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >

                <div>

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-yellow-600 font-bold">
                    {item.newPrice} EGP
                  </p>

                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  حذف
                </button>

              </div>

            ))}

          </div>


          <div className="mt-8 border-t pt-5 flex justify-between text-2xl font-black">

<div className="mt-8 border-t pt-5 space-y-3 text-lg">

  <div className="flex justify-between">
    <span>ثمن المنتجات</span>
    <span>{total} EGP</span>
  </div>

  <div className="flex justify-between">
    <span>🚚 الشحن</span>
    <span>{shipping} EGP</span>
  </div>

  <div className="flex justify-between text-green-600 font-bold">
    <span>✅ مبلغ تأكيد الطلب</span>
    <span>{confirmPayment} EGP</span>
  </div>

  <div className="flex justify-between text-yellow-600 font-bold">
    <span>💵 المتبقي عند الاستلام</span>
    <span>{remaining} EGP</span>
  </div>

  <div className="flex justify-between text-2xl font-black border-t pt-3">
    <span>الإجمالي</span>
    <span>{finalTotal} EGP</span>
  </div>

</div>
          </div>


<button
disabled={
  !customerName ||
  !customerPhone ||
  !customerAddress ||
  !customerGovernorate
}  onClick={() => {
    if (!customerName || !customerPhone || !customerAddress) return;

    window.open(
      `https://wa.me/201098941704?text=${encodeURIComponent(
`طلب جديد من ROZOL

الاسم: ${customerName}
الهاتف: ${customerPhone}
العنوان: ${customerAddress}

المنتجات:
${cart.map((item) => `• ${item.name} - ${item.newPrice} EGP`).join("\n")}

الإجمالي: ${total} EGP`
      )}`,
      "_blank"
    );
  }}
  className="block w-full mt-7 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-center py-4 rounded-2xl font-bold text-lg duration-300"
>
  إرسال الطلب عبر واتساب
</button>
        </>

      )}

    </div>

  </div>
)}
{selectedPerfume && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] px-4">

    <div className="bg-zinc-900 text-white rounded-3xl max-w-2xl w-full overflow-hidden border border-yellow-500 shadow-2xl">

      <div className="relative">

        <Image
          src={selectedPerfume.image}
          alt={selectedPerfume.name}
          width={800}
          height={800}
          className="w-full h-96 object-cover"
        />

        <button
          onClick={() => setSelectedPerfume(null)}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 w-10 h-10 rounded-full text-white font-bold"
        >
          ✕
        </button>

      </div>

      <div className="p-8">

        <h2 className="text-4xl font-black text-yellow-500">
          {selectedPerfume.name}
        </h2>

        <p className="mt-5 text-gray-300 leading-8">
          {selectedPerfume.description}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-black rounded-2xl p-4 text-center">
            <p className="text-gray-400">الحجم</p>
            <p className="font-bold mt-2">
              {selectedPerfume.size}
            </p>
          </div>

          <div className="bg-black rounded-2xl p-4 text-center">
            <p className="text-gray-400">الثبات</p>
            <p className="font-bold mt-2">
              {selectedPerfume.longevity}
            </p>
          </div>

          <div className="bg-black rounded-2xl p-4 text-center">
            <p className="text-gray-400">الفوحان</p>
            <p className="font-bold mt-2">
              {selectedPerfume.projection}
            </p>
          </div>

        </div>

        <div className="flex items-center justify-between mt-8">

          <div>

            <span className="line-through text-gray-500 mr-3">
              {selectedPerfume.oldPrice} EGP
            </span>

            <span className="text-4xl font-black text-yellow-500">
              {selectedPerfume.newPrice} EGP
            </span>

          </div>

          <button
            onClick={() => {
              addToCart(selectedPerfume);
              setSelectedPerfume(null);
            }}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold"
          >
            أضف للسلة 🛒
          </button>

        </div>

      </div>

    </div>

  </div>
)}
</main>
);
}