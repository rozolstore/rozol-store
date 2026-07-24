"use client";

import Image from "next/image";
import { useState } from "react";

type Perfume = {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  image: string;
};

const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Bleu de Chanel",
    oldPrice: 1200,
    newPrice: 800,
    image: "/image/bleu.jpg",
  },
  {
    id: 2,
    name: "Versace Eros",
    oldPrice: 1200,
    newPrice: 800,
    image: "/image/eros.jpg",
  },
  {
    id: 3,
    name: "Dior Sauvage",
    oldPrice: 1200,
    newPrice: 800,
    image: "/image/sauvage.jpg",
  },
  {
    id: 4,
    name: "YSL Y",
    oldPrice: 1200,
    newPrice: 800,
    image: "/image/ysl.jpg",
  },
];

export default function Home() {
  const [cart, setCart] = useState<Perfume[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const addToCart = (perfume: Perfume) => {
    setCart([...cart, perfume]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.length * 800;

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
            أفخم العطور الرجالي والحريمي الأصلية
            <br />
            بأسعار لا تقبل المنافسة
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <a
              href="#products"
              className="bg-yellow-500 hover:bg-yellow-400 hover:scale-105 duration-300 text-black px-10 py-4 rounded-full font-bold shadow-xl"
            >
              تسوق الآن
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
              className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500 duration-300 shadow-2xl"
            >

              {/* Discount */}

              <div className="absolute bg-red-600 text-white px-4 py-1 rounded-br-2xl font-bold z-10">
                خصم 33%
              </div>

              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="w-full h-80 object-cover group-hover:scale-110 duration-500"
              />

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

          <div className="bg-white text-black w-[92%] max-w-lg rounded-3xl p-6 shadow-2xl">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-black">
                🛒 سلة المشتريات
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

                <div className="space-y-4 max-h-80 overflow-y-auto">

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
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl duration-300"
                      >
                        حذف
                      </button>

                    </div>

                  ))}

                </div>

                <div className="mt-8 border-t pt-5 flex justify-between text-2xl font-black">

                  <span>
                    الإجمالي
                  </span>

                  <span className="text-yellow-600">
                    {total} EGP
                  </span>

                </div>

                <a
                  href={`https://wa.me/201098941704?text=${encodeURIComponent(
                    whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-7 bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-2xl font-bold text-lg duration-300"
                >
                  إرسال الطلب عبر واتساب
                </a>

              </>

            )}

          </div>

        </div>
      )}

    </main>
  );
}