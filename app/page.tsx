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
    oldPrice: 1600,
    newPrice: 899,
    image: "/image/bleu.jpg",
    description: "عطر رجالي فاخر برائحة منعشة وخشبية يناسب جميع المناسبات.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 2,
    name: "Versace Eros",
    oldPrice: 1600,
    newPrice: 899,
    image: "/image/eros.jpg",
    description: "عطر رجالي جذاب بطابع شرقي ومنعش يمنحك حضورًا مميزًا.",
    size: "100ml",
    longevity: "8 ساعات",
    projection: "قوي",
  },

  {
    id: 3,
    name: "Dior Sauvage",
    oldPrice: 1600,
    newPrice: 899,
    image: "/image/sauvage.jpg",
    description: "عطر رجالي فاخر بثبات وفوحان ممتاز يناسب جميع الأوقات.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي جدًا",
  },

  {
    id: 4,
    name: "YSL Y",
    oldPrice: 1700,
    newPrice: 1099,
    image: "/image/ysl.jpg",
    description: "عطر شبابي أنيق برائحة منعشة وخشبية.",
    size: "100ml",
    longevity: "7 - 9 ساعات",
    projection: "متوسط إلى قوي",
  },

  {
    id: 5,
    name: "ايربابورا",
    oldPrice: 1800,
    newPrice: 1199,
    image: "/image/erba.jpg",
    description: "عطر فاخر برائحة منعشة وفخمة.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 6,
    name: "بيانكو لاتيه",
    oldPrice: 1700,
    newPrice: 1099,
    image: "/image/bianco.jpg",
    description: "عطر ناعم وأنيق برائحة مميزة.",
    size: "100ml",
    longevity: "8 ساعات",
    projection: "متوسط إلى قوي",
  },

  {
    id: 7,
    name: "يارا",
    oldPrice: 2000,
    newPrice: 1499,
    image: "/image/yara.jpg",
    description: "عطر حريمي جذاب برائحة حلوة وفاخرة.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 8,
    name: "دوف",
    oldPrice: 1300,
    newPrice: 899,
    image: "/image/dove.jpg",
    description: "عطر راقي بإحساس نظيف ورائحة أنيقة.",
    size: "100ml",
    longevity: "7 - 9 ساعات",
    projection: "متوسط",
  },

  {
    id: 9,
    name: "خمرة",
    oldPrice: 1800,
    newPrice: 1199,
    image: "/image/khamrah.jpg",
    description: "عطر شرقي فاخر برائحة دافئة وجذابة.",
    size: "100ml",
    longevity: "10 ساعات",
    projection: "قوي",
  },

  {
    id: 10,
    name: "Si",
    oldPrice: 2000,
    newPrice: 1499,
    image: "/image/si.jpg",
    description: "عطر حريمي راقي برائحة أنيقة.",
    size: "100ml",
    longevity: "8 ساعات",
    projection: "قوي",
  },

  // المنتجات الجديدة

  {
    id: 11,
    name: "Khamrah Waha",
    oldPrice: 2000,
    newPrice: 1399,
    image: "/image/Khamrah Waha without box.jpg",
    description: "عطر فاخر برائحة مميزة وجذابة.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 12,
    name: "Emporio Armani Stronger With You Black",
    oldPrice: 1600,
    newPrice: 999,
    image: "/image/Emporio Armani Stronger With You Black.jpg",
    description: "عطر رجالي جذاب برائحة قوية وعصرية.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 13,
    name: "Emporio Armani Stronger With You Green",
    oldPrice: 1800,
    newPrice: 1199,
    image: "/image/Emporio Armani Stronger With You Green.jpg",
    description: "عطر أنيق ومنعش برائحة مميزة.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 14,
    name: "Afnan Silver & Bronze",
    oldPrice: 2400,
    newPrice: 1499,
    image: "/image/Afnan Silver & Bronze.jpg",
    description: "عطر فاخر بلمسة أنيقة وثبات مميز.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 15,
    name: "Lattafa Eclaire",
    oldPrice: 1600,
    newPrice: 999,
    image: "/image/Lattafa Eclaire.jpg",
    description: "عطر حلو وناعم برائحة جذابة.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 16,
    name: "Ghissa",
    oldPrice: 1600,
    newPrice: 999,
    image: "/image/Ghissa.jpg",
    description: "عطر أنيق برائحة مميزة.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 17,
    name: "ghissa La Louna",
    oldPrice: 2400,
    newPrice: 1499,
    image: "/image/ghissa La Louna.jpg",
    description: "عطر جذاب برائحة مميزة.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },

  {
    id: 18,
    name: "Laverne Sense",
    oldPrice: 1900,
    newPrice: 1299,
    image: "/image/Laverne Sense.jpg",
    description: "عطر راقٍ برائحة مميزة وثبات جيد.",
    size: "100ml",
    longevity: "8 - 10 ساعات",
    projection: "قوي",
  },
  {
  id: 19,
  name: "Oud Madawi",
  oldPrice: 1800,
  newPrice: 1199,
  image: "/image/Oud Madawi.jpg",
  description: "عطر عود فاخر بلمسة شرقية جذابة",
  size: "100ml",
  longevity: "ثبات طويل",
  projection: "فوحان قوي",
},
{
  id: 20,
  name: "Amerat Al Arab",
  oldPrice: 1800,
  newPrice: 1199,
  image: "/image/Amerat Al Arab.jpg",
  description: "عطر عربي أنيق بلمسة فاخرة وجذابة",
  size: "100ml",
  longevity: "ثبات طويل",
  projection: "فوحان قوي",
},
{
  id: 21,
  name: "Musamm White",
  oldPrice: 2000,
  newPrice: 999,
  image: "/image/Musamm White.jpg",
  description: "عطر أنيق وفخم بلمسة ناعمة وجذابة",
  size: "100ml",
  longevity: "ثبات طويل",
  projection: "فوحان قوي",
},
{
  id: 22,
  name: "Valentino Donna",
  oldPrice: 2800,
  newPrice: 1499,
  image: "/image/Valentino Donna.png",
  description: "عطر نسائي أنيق ومميز بلمسة وردية جذابة",
  size: "100ml",
  longevity: "Long Lasting",
  projection: "Strong",
},
{
  id: 23,
  name: "Valentino Uomo Born In Roma",
  oldPrice: 2800,
  newPrice: 1299,
  image: "/image/Valentino Uomo.jpg",
  description: "عطر رجالي أنيق وجذاب بلمسة عصرية مميزة",
  size: "100ml",
  longevity: "Long Lasting",
  projection: "Strong",
},
{
  id: 24,
  name: "Louis Vuitton Ombre Nomade",
  oldPrice: 1900,
  newPrice: 1199,
  image: "/image/Ombre Nomade.jpg",
  description: "عطر فاخر بطابع شرقي دافئ يجمع بين العود ولمسات جلدية وعنبرية",
  size: "100ml",
  longevity: "Long Lasting",
  projection: "Strong",
},
{
  id: 25,
  name: "Ibrahim Al Qurashi Pink Diamond Sakura",
  oldPrice: 2800,
  newPrice: 1499,
  image: "/image/Pink Diamond 200ml.jpg",
  description: "عطر زهري ناعم ومشرق بلمسات من أزهار الكرز والورد والمسك والعنبر",
  size: "200ml",
  longevity: "Long Lasting",
  projection: "Medium",
},
{
  id: 26,
  name: "Assaf Arrogate Pink",
  oldPrice: 2800,
  newPrice: 1499,
  image: "/image/Assaf Arrogate Pink.jpg",
  description: "عطر أنيق وجذاب بلمسة عصرية مميزة",
  size: "200ml",
  longevity: "Long Lasting",
  projection: "Strong",
},

{
  id: 27,
  name: "Assaf Lipstick",
  oldPrice: 2800,
  newPrice: 1499,
  image: "/image/Assaf Lipstick.jpg",
  description: "عطر أنيق وجذاب بلمسة مميزة",
  size: "200ml",
  longevity: "Long Lasting",
  projection: "Strong",
},
{
  id: 28,
  name: "Lattafa Fakhar Black",
  oldPrice: 2800,
  newPrice: 1499,
  image: "/image/Lattafa Fakhar Black.jpg",
  description: "عطر رجالي أنيق ومنعش بلمسة عصرية جذابة",
  size: "100ml",
  longevity: "Long Lasting",
  projection: "Strong",
},
{
  id: 29,
  name: "Burberry Her",
  oldPrice: 2500,
  newPrice: 1199,
  image: "/image/Burberry Her.jpg",
  description: "عطر نسائي أنيق بلمسة فاكهية وزهرية ناعمة",
  size: "100ml",
  longevity: "Long Lasting",
  projection: "Strong",
},

{
  id: 30,
  name: "Louis Vuitton Pacific Chill",
  oldPrice: 2800,
  newPrice: 1399,
  image: "/image/Pacific Chill.jpg",
  description: "عطر منعش بنفحات الكشمش الأسود والليمون والنعناع",
  size: "100ml",
  longevity: "Long Lasting",
  projection: "Strong",
},

{
  id: 31,
  name: "Lattafa Atheeri",
  oldPrice: 2200,
  newPrice: 1299,
  image: "/image/Lattafa Atheeri without box.jpg",
  description: "عطر زهري حلو بنفحات الباشن فلور والأوركيد والياسمين والفانيليا",
  size: "100ml",
  longevity: "Long Lasting",
  projection: "Strong",
},

];

const shippingPrices = {
  "القاهرة": 100,
  "الجيزة": 100,

  "الإسكندرية": 100,
  "القليوبية": 100,
  "الشرقية": 100,
  "الغربية": 100,
  "الدقهلية": 100,
  "المنوفية": 100,
  "البحيرة": 100,
  "كفر الشيخ": 100,
  "دمياط": 100,
  "بورسعيد": 100,
  "الإسماعيلية": 100,
  "السويس": 100,

  "شمال سيناء": 120,
  "جنوب سيناء": 120,
  "بني سويف": 120,
  "الفيوم": 120,
  "المنيا": 120,
  "أسيوط": 120,
  "سوهاج": 120,
  "قنا": 120,
  "الأقصر": 120,
  "أسوان": 120,
  "مطروح": 120,
  "الوادي الجديد": 120,
};
export default function Home() {
  const [cart, setCart] = useState<Perfume[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerGovernorate, setCustomerGovernorate] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 8;
const menIds = [1, 2, 3, 5, 12, 13, 14, 19, 21, 23, 24];

const womenIds = [4, 7, 8, 10, 15, 17, 18, 20, 22, 25, 26, 27, 28, 29, 31];

const unisexIds = [6, 9, 11, 16, 30];
const [category, setCategory] = useState("all");
const filteredPerfumes =
  category === "all"
    ? perfumes
    : perfumes.filter((perfume) => {
        if (category === "men") return menIds.includes(perfume.id);
        if (category === "women") return womenIds.includes(perfume.id);
        if (category === "unisex") return unisexIds.includes(perfume.id);
        return true;
      });

const totalPages = Math.ceil(filteredPerfumes.length / productsPerPage);

const startIndex = (currentPage - 1) * productsPerPage;

const currentPerfumes = filteredPerfumes.slice(
  startIndex,
  startIndex + productsPerPage
);

const [cartAnimation, setCartAnimation] = useState(false);
const [showAddedMessage, setShowAddedMessage] = useState(false);
const [firstProductAdded, setFirstProductAdded] = useState(false);
const addToCart = (perfume: Perfume) => {

  setCart((prevCart) => [...prevCart, perfume]);

  setCartAnimation(true);

  setShowAddedMessage(true);

  setTimeout(() => {
    setCartAnimation(false);
  }, 500);

  setTimeout(() => {
    setShowAddedMessage(false);
  }, 2000);

  if (!firstProductAdded) {
    setFirstProductAdded(true);
    setOpenCart(true);
  }

};
  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

const total = cart.reduce((sum, item) => sum + item.newPrice, 0);

const shipping =
  total >= 2000
    ? 0
    : shippingPrices[
        customerGovernorate as keyof typeof shippingPrices
      ] || 0;

const finalTotal = total + shipping;

const whatsappMessage =
  "السلام عليكم، أريد طلب:\n\n" +
  cart
    .map((item) => `• ${item.name} - ${item.newPrice} EGP`)
    .join("\n") +
  `\n\nسعر المنتجات: ${total} EGP` +
  `\nسعر الشحن: ${shipping} EGP` +
  `\nالإجمالي النهائي: ${finalTotal} EGP`;

return (
  
<main className="min-h-screen bg-[#5f1815] text-white">
      {/* شريط العرض */}
      {showAddedMessage && (
  <div className="fixed top-24 right-5 z-50 bg-[#5f1815] text-white px-5 py-3 rounded-xl shadow-lg">
    تم إضافة العطر للسلة 🛍️
  </div>
)}
<div className="w-full overflow-hidden bg-[#5f1815] text-white font-bold border-b border-white/20">
      <div className="whitespace-nowrap py-2 animate-marquee">
        🎉 اطلب بأكثر من 2000 جنيه واحصل على شحن مجاني 🚚
        {"   •   "}
        🔥 عرض من EISHQ
        {"   •   "}
        🎉 اطلب بأكثر من 2000 جنيه واحصل على شحن مجاني 🚚
      </div>
    </div>      {/* Navbar */}
<nav className="sticky top-0 z-50 bg-[#3a0f0d] backdrop-blur border-b border-yellow-500/20">
<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1 h-14">

<Image
  src="/image/logo2.png"
  alt="EISHQ"
  width={250}
  height={120}
  className="object-contain"
/>
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
  className={`bg-yellow-500 hover:scale-105 duration-300 text-black px-5 py-2 rounded-full font-bold shadow-lg ${
    cartAnimation ? "animate-bounce" : ""
  }`}
>
  🛒 {cart.length}
</button>
        </div>

      </nav>

{/* Hero */}

<section className="relative overflow-hidden py-16 px-6 text-center">

  <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent"></div>

  <div className="relative max-w-4xl mx-auto">

    <p className="uppercase tracking-[6px] text-yellow-500 font-bold">
      Luxury Perfumes
    </p>

    <h1 className="text-5xl md:text-7xl font-black mt-4">
      EISHQ
    </h1>

    <p className="text-gray-300 mt-6 text-lg leading-8">
      عطور بجوده وثبات فاخر 🔥
      <br />
      اطلب الأن والدفع عند الأستلام
    </p>

    <div className="mt-8 flex justify-center gap-4">

      <a
        href="#products"
        className="bg-yellow-500 hover:bg-yellow-400 hover:scale-105 duration-300 text-black px-8 py-3 rounded-full font-bold shadow-xl"
      >
        اطلب عطرك الآن 🔥
      </a>

      <a
        href="https://wa.me/201098941704"
        target="_blank"
        className="border border-yellow-500 hover:bg-yellow-500 hover:text-black duration-300 px-8 py-3 rounded-full font-bold"
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
  <div className="flex flex-wrap justify-center gap-3 mb-10">
<button
onClick={() => {
  setCategory("all");
  setCurrentPage(1);

  setTimeout(() => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}}
  className={`px-6 py-3 rounded-xl font-bold duration-300 ${
    category === "all"
      ? "bg-[#d2af53] text-black shadow-lg shadow-yellow-500/30 scale-105"
      : "bg-[#4a1210] text-white border border-[#d2af53]/30 hover:border-[#d2af53]"
  }`}
>
  All
</button>

    <button
onClick={() => {
  setCategory("men");
  setCurrentPage(1);

  setTimeout(() => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}}
      className={`px-6 py-3 rounded-xl font-bold duration-300 ${
        category === "men"
          ? "bg-[#d2af53] text-black shadow-lg shadow-yellow-500/30 scale-105"
          : "bg-[#4a1210] text-white border border-[#d2af53]/30 hover:border-[#d2af53]"
      }`}
    >
      👨 Man
    </button>

    <button
onClick={() => {
  setCategory("women");
  setCurrentPage(1);

  setTimeout(() => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}}
      className={`px-6 py-3 rounded-xl font-bold duration-300 ${
        category === "women"
          ? "bg-[#d2af53] text-black shadow-lg shadow-yellow-500/30 scale-105"
          : "bg-[#4a1210] text-white border border-[#d2af53]/30 hover:border-[#d2af53]"
      }`}
    >
      👩 Woman
    </button>

    <button
onClick={() => {
  setCategory("unisex");
  setCurrentPage(1);

  setTimeout(() => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}}
      className={`px-6 py-3 rounded-xl font-bold duration-300 ${
        category === "unisex"
          ? "bg-[#d2af53] text-black shadow-lg shadow-yellow-500/30 scale-105"
          : "bg-[#4a1210] text-white border border-[#d2af53]/30 hover:border-[#d2af53]"
      }`}
    >
      👫 Unisex
    </button>
      </div>

  <h2 className="text-5xl font-black text-center mb-4">
    أشهر العطور
  </h2>

  <p className="text-center text-gray-400 mb-14">
    عروض لفترة محدودة 🔥
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {currentPerfumes.map((item) => (
<div
  key={item.id}
className="relative group bg-[#4a1210] rounded-3xl overflow-hidden border border-[#d2af53]/30 hover:border-[#d2af53] duration-300 shadow-2xl"
>
              {/* Discount */}

              <div className="absolute bg-red-600 text-white px-4 py-1 rounded-br-2xl font-bold z-10">
                خصم 35%
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
className="w-full h-80 object-contain group-hover:scale-105 duration-500 p-4"
  />
</div>
              <div className="p-6">

<h3 className="text-xl font-bold text-white group-hover:text-[#d2af53] duration-300">
  {item.name}
</h3>

                <div className="mt-4 flex items-center gap-3">

                  <span className="text-white/50 line-through text-base">
                    {item.oldPrice} EGP
                  </span>

                  <span className="text-2xl text-[#d2af53] font-black">
                    {item.newPrice} EGP
                  </span>
                </div>

                <p className="text-green-400 mt-2">
                  وفر اكثر من 500 جنيه
                </p>

                <div className="flex gap-3 mt-6">

                  <button
onClick={() => {
  addToCart(item);
  setCheckoutStarted(false);
}}
                   className="flex-1 bg-[#d2af53] hover:bg-[#e5c66a] text-black py-3 rounded-xl font-bold duration-300 hover:scale-[1.02] shadow-lg"
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

        <div className="flex justify-center gap-3 mt-10 mb-10">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-3 bg-zinc-800 rounded-xl disabled:opacity-30"
          >
            السابق
          </button>

          <span className="px-5 py-3 bg-yellow-500 text-black rounded-xl font-bold">
            {currentPage}
          </span>

<button
  onClick={() => {
    setCurrentPage(currentPage + 1);

    setTimeout(() => {
      document.getElementById("perfumes")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }}
  disabled={currentPage === totalPages}
  className="px-5 py-3 bg-zinc-800 rounded-xl disabled:opacity-30"
>
  التالي
</button>
        </div>

      </section>

      <section
        id="why"
        className="py-24 px-6 bg-gradient-to-b from-zinc-900 to-black"
      >
        <h2 className="text-5xl font-black text-center">
          لماذا تختار Eishq؟
        </h2>

        <p className="text-center text-gray-400 mt-4">
          لأن الجودة أهم من أي شيء
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 rounded-3xl p-8 text-center duration-300">

            <div className="text-6xl">💎</div>

            <h3 className="text-2xl font-bold text-yellow-500 mt-6">
              ثبات 100%
            </h3>

            <p className="text-gray-400 mt-4 leading-8">
            
         يوجد لدينا جميع العطور لطابع من اول لحظة وحتي اخر اثر.
            </p>

          </div>

<div className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 rounded-3xl p-8 text-center duration-300">

  <div className="text-6xl">🚚</div>

  <h3 className="text-2xl font-bold text-yellow-500 mt-6">
    شحن سريع
  </h3>

  <p className="text-gray-400 mt-4 leading-8">
    توصيل لجميع المحافظات من 2 - 3 أيام.
  </p>

  <p className="text-green-400 font-bold mt-3">
    🎉 الشحن مجاني للطلبات فوق 2000 جنيه
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
              1800 EGP
            </span>

            فقط

            <span className="font-black text-4xl mx-2">
              1199 EGP
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
            Eichq
          </h2>

          <p className="text-gray-400 mt-4">
            أفخم العطور الرجالي والحريمي 
          </p>

          <div className="flex justify-center gap-8 mt-8 text-lg">

            <a
              href="https://www.instagram.com/eishq.store"
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
              href="https://wa.me/201042362785"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 duration-300"
            >
              WhatsApp
            </a>

          </div>

          <p className="text-gray-600 mt-10">
            © 2026 Eichq Rights Reserved.
          </p>

        </div>

      </footer>

      {/* Floating WhatsApp */}

      <a
        href="https://wa.me/201042362785"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 hover:scale-110 duration-300 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl text-4xl z-50"
      >
        💬
      </a>
{/* Cart */}

{openCart && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

<div className="bg-white text-black w-[90%] max-w-md max-h-[80vh] overflow-y-auto rounded-3xl p-5 shadow-2xl">
        <div className="flex justify-between items-center mb-6">

<h2 className="text-2xl font-black text-[#5f1815]">
  🛒 تأكيد الطلب
</h2>

        <button
onClick={() => {
  setOpenCart(false);
  setCheckoutStarted(false);
}}          className="text-3xl hover:text-red-500 duration-300"
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

) : !checkoutStarted ? (

  <div className="text-center py-8">

    <p className="text-5xl">🛍️</p>

    <h3 className="text-2xl font-black text-[#5f1815] mt-4">
      إيه اللي تحب تعمله؟
    </h3>

    <p className="text-gray-500 mt-2 mb-6">
      المنتج اتضاف للسلة بنجاح
    </p>

    <div className="flex gap-3">

      <button
onClick={() => {
  setOpenCart(false);
  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth",
  });
}}        className="flex-1 border-2 border-[#5f1815] text-[#5f1815] py-3 rounded-xl font-bold hover:bg-[#5f1815] hover:text-white duration-300"
      >
        🛍️ متابعة التسوق
      </button>

      <button
        onClick={() => setCheckoutStarted(true)}
        className="flex-1 bg-[#d2af53] text-black py-3 rounded-xl font-bold hover:bg-[#e5c66a] duration-300"
      >
        ✅ إكمال الطلب
      </button>

    </div>

  </div>

) : (

  <>
          <div className="space-y-3 mb-6">

            <input
              type="text"
              placeholder="الاسم"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#d2af53] focus:ring-2 focus:ring-[#d2af53]/20 duration-200"            />

            <input
              type="text"
              placeholder="رقم الهاتف"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#d2af53] focus:ring-2 focus:ring-[#d2af53]/20 duration-200"            />

            <textarea
              placeholder="العنوان"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#d2af53] focus:ring-2 focus:ring-[#d2af53]/20 duration-200"
            />
<textarea
  placeholder="ملاحظات الطلب (اختياري)"
  value={customerNotes}
  onChange={(e) => setCustomerNotes(e.target.value)}
className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#d2af53] focus:ring-2 focus:ring-[#d2af53]/20 duration-200"
  rows={3}
/>
<select

  value={customerGovernorate}
  onChange={(e) => setCustomerGovernorate(e.target.value)}
className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#d2af53] focus:ring-2 focus:ring-[#d2af53]/20 duration-200"
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


<div className="space-y-2 max-h-44 overflow-y-auto">
            {cart.map((item, index) => (

              <div
                key={index}
className="flex justify-between items-center border-b border-gray-100 pb-3"              >

                <div>

<h3 className="font-bold text-base text-[#5f1815]">                    {item.name}
                  </h3>

                  <p className="text-yellow-600 font-bold">
                    {item.newPrice} EGP
                  </p>

                </div>

                <button
                  onClick={() => removeFromCart(index)}
className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-red-600 duration-200"
                >
                  حذف
                </button>

              </div>

            ))}

          </div>


<div className="mt-5 border-t pt-4 space-y-3 text-base">
<div className="space-y-3">
  <div className="flex justify-between">
    <span>ثمن المنتجات</span>
    <span>{total} EGP</span>
  </div>

<div className="flex justify-between items-center">
  <span className="text-gray-600">🚚 الشحن</span>

  <span className="font-bold text-[#5f1815]">
    {shipping === 0 ? "مجاني" : `${shipping} EGP`}
  </span>
</div>
{total > 2000 && (
<div className="bg-[#d2af53]/15 border border-[#d2af53]/50 rounded-xl p-3 text-center text-[#5f1815] font-bold text-sm mb-4 shadow-sm">
  🎉 مبروك! طلبك فوق 2000 جنيه — الشحن مجاني 🚚
</div>
)}

{total > 0 && total <= 2000 && (
<div className="bg-[#5f1815]/5 border border-[#5f1815]/20 rounded-xl p-3 text-center text-[#5f1815] font-bold text-sm mb-4">
  🎁 اطلب بأكثر من 2000 جنيه واحصل على شحن مجاني
</div>
)}

<div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
  <span className="text-lg font-bold text-gray-700">
    الإجمالي
  </span>

  <span className="text-2xl font-black text-[#5f1815]">
    {finalTotal} EGP
  </span>
</div>
</div>
          </div>


<button
  disabled={
    !customerName ||
    !customerPhone ||
    !customerAddress ||
    !customerGovernorate
  }
  onClick={() => {
    if (
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !customerGovernorate
    )
      return;

    window.open(
      `https://wa.me/201042362785?text=${encodeURIComponent(
`🛍️ طلب جديد من Eichq

👤 الاسم: ${customerName}
📞 الهاتف: ${customerPhone}
🏠 العنوان: ${customerAddress}
📍 المحافظة: ${customerGovernorate}

📝 الملاحظات:
${customerNotes || "لا توجد ملاحظات"}

---------------------------------------

🛒 المنتجات:
${Object.values(
  cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        name: item.name,
        price: item.newPrice,
        quantity: 1,
      };
    } else {
      acc[item.id].quantity++;
    }
    return acc;
  }, {} as Record<number, { name: string; price: number; quantity: number }>)
)
  .map(
    (item) =>
      `• ${item.name} × ${item.quantity} = ${item.price * item.quantity} EGP`
  )
  .join("\n")}
🚚 سعر الشحن: ${shipping} EGP

💰 إجمالي الطلب: ${finalTotal} EGP


🙏 شكرًا لاختيارك Eichq


🔒 جميع بياناتك محفوظة بسرية تامة.

📦 بعد مراجعة الطلب سيتم تجهيزه للشحن في أقرب وقت.`
      )}`,
      "_blank"
    );
  }}
className="block w-full mt-5 bg-[#5f1815] hover:bg-[#4a1210] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-center py-3.5 rounded-xl font-bold text-base duration-300 shadow-lg"
>
  إرسال الطلب عبر واتساب
</button>    </>

      )}

    </div>

  </div>
)}
{selectedPerfume && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] px-4">

<div className="bg-zinc-900 text-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-yellow-500 shadow-2xl">
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