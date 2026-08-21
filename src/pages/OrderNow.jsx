import React, { useMemo, useState } from "react";

/**
 * OrderPage
 * ---------------------------------------------------------------
 * A full "select dishes → review cart → deliver & pay" flow, built
 * to match the visual language already used in Beverages / Desserts
 * / Soups: bg #0b0d10, font-grotesk headings, font-montserrat
 * eyebrows/labels, #ff3b30 accent, rounded-2xl cards, subtle ring
 * hovers. No backend — wire handlePlaceOrder() up to your API.
 * ---------------------------------------------------------------
 */

const MENU = {
  Sushi: [
    { id: "sushi-maki", name: "Classic Maki Rolls", price: 700, image: "/menu/makiRool.webp" },
    { id: "sushi-sashiminigiri", name: "Sashimi & Nigiri Selection", price: 950, image: "/menu/Shashmi_and_Nigiri.webp" },
    { id: "sushi-platter", name: "Signature Sushi Platter", price: 1400, image: "/menu/shushi_platter.webp" },
    { id: "sushi-specialmaki", name: "Special Maki Rolls", price: 850, image: "/menu/specialMakiRoll.webp" },
    { id: "sushi-salmon", name: "Fresh Salmon Sashimi", price: 900, image: "/menu/salmon.webp" },
    { id: "sushi-assorted", name: "Assorted Sushi Selection", price: 1100, image: "/menu/some_shushi.webp" },
    { id: "sushi-shrimpcombo", name: "Shrimp & Sushi Combo", price: 950, image: "/menu/shrink_and_shushi.webp" },
    { id: "sushi-rice", name: "Classic Rice Sushi", price: 600, image: "/menu/rice_Shushi.webp" },
    { id: "sushi-beefrice", name: "Japanese Beef Rice", price: 800, image: "/menu/BeefRice.webp" },
    { id: "sushi-fishprawn", name: "Fish & Prawn Selection", price: 1000, image: "/menu/FishandPrawn.webp" },
  ],
  Soups: [
    { id: "soup-chicken", name: "Spicy Chicken Soup", price: 450, image: "/soup/chicken_soup.webp" },
    { id: "soup-creamy", name: "Creamy Mushroom Soup", price: 420, image: "/soup/creamy_soup.webp" },
    { id: "soup-makhni", name: "Makhni Corn Soup", price: 480, image: "/soup/makhnii_shoup.webp" },
    { id: "soup-veg", name: "Classic Vegetable Soup", price: 380, image: "/soup/pexels-fajrinugroho-16811680.webp" },
    { id: "soup-yakhni", name: "Yakhni Mutton Soup", price: 550, image: "/soup/yahni_soup.webp" },
    { id: "soup-chatni", name: "Tangy Chatni Soup", price: 400, image: "/soup/chatni_soup.webp" },
  ],
  Beverages: [
    { id: "bev-greenmint", name: "Green Mint Cooler", price: 250, image: "/Bevrages/green_mint.webp" },
    { id: "bev-lemonmint", name: "Lemon Mint Cooler", price: 250, image: "/Bevrages/lemonMint.webp" },
    { id: "bev-milkshake", name: "Classic Milkshake", price: 350, image: "/Bevrages/Milkshake.webp" },
    { id: "bev-mintmargarita", name: "Mint Margarita", price: 300, image: "/Bevrages/Mintmargerita.webp" },
    { id: "bev-orange", name: "Fresh Orange", price: 220, image: "/Bevrages/orange.webp" },
    { id: "bev-berry", name: "Berry Blast Cooler", price: 300, image: "/Bevrages/R.webp" },
    { id: "bev-raspberry", name: "Raspberry Fizz", price: 300, image: "/Bevrages/Rasberryy.webp" },
    { id: "bev-strawshake", name: "Strawberry Milkshake", price: 380, image: "/Bevrages/strawbery_shake.webp" },
    { id: "bev-strawcooler", name: "Fresh Strawberry Cooler", price: 300, image: "/Bevrages/strawbery.webp" },
    { id: "bev-appleshake", name: "Apple Milkshake", price: 380, image: "/Bevrages/appleShake.webp" },
    { id: "bev-bananashake", name: "Banana Milkshake", price: 380, image: "/Bevrages/bananaMilkshake.webp" },
  ],
  Desserts: [
    { id: "des-creamy", name: "Creamy Vanilla Cake", price: 600, image: "/Desert/creamyCake.webp" },
    { id: "des-choc", name: "Chocolate Fudge Cake", price: 650, image: "/Desert/chocklateCake.webp" },
    { id: "des-yellow", name: "Classic Yellow Cake", price: 600, image: "/Desert/yellowCake.webp" },
    { id: "des-icecream", name: "Assorted Ice Cream Tub", price: 500, image: "/Desert/icecreams.webp" },
    { id: "des-brown", name: "Brown Sugar Caramel Cake", price: 650, image: "/Desert/brown_cake.webp" },
    { id: "des-scoop", name: "Ice Cream Scoop", price: 200, image: "/Desert/ice_cream.webp" },
  ],
};

const CATEGORIES = Object.keys(MENU);
const DELIVERY_FEE = 150;

const currency = (n) => `Rs. ${n.toLocaleString("en-PK")}`;

const MenuItem = ({ item, qty, onAdd, onRemove }) => (
  <div className="group flex items-center gap-4 rounded-2xl bg-[#12151a] p-3 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:ring-[#ff3b30]/40">
    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
    </div>

    <div className="min-w-0 flex-1">
      <h4 className="font-grotesk truncate text-base font-bold tracking-[-0.01em] text-white sm:text-lg">
        {item.name}
      </h4>
      <p className="font-montserrat mt-1 text-sm text-gray-400">{currency(item.price)}</p>
    </div>

    {qty === 0 ? (
      <button
        onClick={() => onAdd(item)}
        className="font-montserrat shrink-0 rounded-full bg-[#ff3b30] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#e8342a]"
      >
        Add
      </button>
    ) : (
      <div className="flex shrink-0 items-center gap-3 rounded-full bg-white/5 px-2 py-1.5 ring-1 ring-inset ring-white/10">
        <button
          onClick={() => onRemove(item)}
          aria-label={`Remove one ${item.name}`}
          className="flex h-6 w-6 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        >
          −
        </button>
        <span className="font-montserrat w-4 text-center text-sm font-bold text-white">{qty}</span>
        <button
          onClick={() => onAdd(item)}
          aria-label={`Add one more ${item.name}`}
          className="flex h-6 w-6 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        >
          +
        </button>
      </div>
    )}
  </div>
);

const Field = ({ label, ...props }) => (
  <label className="block">
    <span className="font-montserrat mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
      {label}
    </span>
    <input
      {...props}
      className="font-montserrat w-full rounded-xl border-none bg-[#12151a] px-4 py-3 text-sm text-white placeholder:text-gray-500 ring-1 ring-inset ring-white/10 outline-none transition-all focus:ring-2 focus:ring-[#ff3b30]"
    />
  </label>
);

const OrderNow = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [cart, setCart] = useState({}); // id -> qty
  const [step, setStep] = useState("menu"); // menu | checkout | confirmed
  const [payment, setPayment] = useState("cod"); // cod | card
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    notes: "",
  });
  const [orderId, setOrderId] = useState(null);

  const allItems = useMemo(() => Object.values(MENU).flat(), []);

  const cartLines = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({ item: allItems.find((i) => i.id === id), qty })),
    [cart, allItems]
  );

  const subtotal = cartLines.reduce((sum, l) => sum + l.item.price * l.qty, 0);
  const total = cartLines.length ? subtotal + DELIVERY_FEE : 0;
  const itemCount = cartLines.reduce((sum, l) => sum + l.qty, 0);

  const addItem = (item) =>
    setCart((c) => ({ ...c, [item.id]: (c[item.id] || 0) + 1 }));

  const removeItem = (item) =>
    setCart((c) => {
      const next = { ...c, [item.id]: Math.max(0, (c[item.id] || 0) - 1) };
      if (next[item.id] === 0) delete next[item.id];
      return next;
    });

  const addressValid =
    address.name.trim() && address.phone.trim() && address.street.trim() && address.city.trim();

  const handlePlaceOrder = () => {
    // TODO: wire this up to your real order API
    const id = `RZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setStep("confirmed");
  };

  const resetOrder = () => {
    setCart({});
    setAddress({ name: "", phone: "", street: "", city: "", notes: "" });
    setPayment("cod");
    setOrderId(null);
    setStep("menu");
  };

  // ---------------------------------------------------------- Confirmed
  if (step === "confirmed") {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0b0d10] px-6 py-20 text-white">
        <div className="mx-auto max-w-md text-center">
          <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.32em] text-[#ff3b30]">
            Order Confirmed
          </span>
          <h2 className="font-grotesk mt-5 text-5xl font-bold leading-[.9] tracking-[-.04em] sm:text-6xl">
            On its
            <br />
            way.
          </h2>
          <p className="font-montserrat mt-6 text-sm text-gray-400">
            Order <span className="font-bold text-white">{orderId}</span> is confirmed. We'll deliver to{" "}
            <span className="text-white">{address.street}, {address.city}</span> — pay{" "}
            {payment === "cod" ? "cash on delivery" : "by card"}.
          </p>
          <div className="mt-8 rounded-2xl bg-[#12151a] p-6 text-left ring-1 ring-inset ring-white/10">
            {cartLines.map(({ item, qty }) => (
              <div key={item.id} className="font-montserrat flex justify-between py-1.5 text-sm text-gray-300">
                <span>{qty}× {item.name}</span>
                <span>{currency(item.price * qty)}</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-montserrat text-sm text-gray-400">
              <span>Delivery</span>
              <span>{currency(DELIVERY_FEE)}</span>
            </div>
            <div className="font-grotesk mt-2 flex justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>{currency(total)}</span>
            </div>
          </div>
          <button
            onClick={resetOrder}
            className="font-montserrat mt-8 rounded-full bg-[#ff3b30] px-8 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#e8342a]"
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------- Checkout
  if (step === "checkout") {
    return (
      <section className="min-h-screen bg-[#0b0d10] px-6 py-16 text-white sm:px-10 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => setStep("menu")}
            className="font-montserrat mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-400 transition-colors hover:text-white"
          >
            ← Back to menu
          </button>

          <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.32em] text-gray-300">
            Almost There
          </span>
          <h2 className="font-grotesk mt-4 text-5xl font-bold leading-[.9] tracking-[-.045em] sm:text-6xl">
            Delivery &amp;
            <br />
            <span className="text-[#ff3b30]">Payment.</span>
          </h2>

          {/* Order summary */}
          <div className="mt-10 rounded-2xl bg-[#12151a] p-5 ring-1 ring-inset ring-white/10">
            {cartLines.map(({ item, qty }) => (
              <div key={item.id} className="font-montserrat flex justify-between py-1.5 text-sm text-gray-300">
                <span>{qty}× {item.name}</span>
                <span>{currency(item.price * qty)}</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-montserrat text-sm text-gray-400">
              <span>Subtotal</span>
              <span>{currency(subtotal)}</span>
            </div>
            <div className="font-montserrat flex justify-between text-sm text-gray-400">
              <span>Delivery fee</span>
              <span>{currency(DELIVERY_FEE)}</span>
            </div>
            <div className="font-grotesk mt-2 flex justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>{currency(total)}</span>
            </div>
          </div>

          {/* Address */}
          <div className="mt-10">
            <h3 className="font-grotesk text-xl font-bold tracking-[-0.01em] text-white">
              Delivery address
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                placeholder="Ahmed Khan"
                value={address.name}
                onChange={(e) => setAddress((a) => ({ ...a, name: e.target.value }))}
              />
              <Field
                label="Phone number"
                placeholder="03xx-xxxxxxx"
                value={address.phone}
                onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
              />
              <Field
                label="Street address"
                placeholder="House #, street, area"
                value={address.street}
                onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                className="sm:col-span-2"
              />
              <Field
                label="City"
                placeholder="Hazro"
                value={address.city}
                onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
              />
              <Field
                label="Notes (optional)"
                placeholder="Gate code, landmark..."
                value={address.notes}
                onChange={(e) => setAddress((a) => ({ ...a, notes: e.target.value }))}
              />
            </div>
          </div>

          {/* Payment */}
          <div className="mt-10">
            <h3 className="font-grotesk text-xl font-bold tracking-[-0.01em] text-white">
              Payment method
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives." },
                { id: "card", label: "Debit / Credit Card", desc: "Pay securely online now." },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={`rounded-2xl p-5 text-left ring-1 ring-inset transition-all duration-200 ${
                    payment === opt.id
                      ? "bg-[#ff3b30]/10 ring-[#ff3b30]"
                      : "bg-[#12151a] ring-white/10 hover:ring-white/25"
                  }`}
                >
                  <span className="font-grotesk block text-base font-bold text-white">{opt.label}</span>
                  <span className="font-montserrat mt-1 block text-xs text-gray-400">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!addressValid}
            onClick={handlePlaceOrder}
            className="font-montserrat mt-10 w-full rounded-full bg-[#ff3b30] py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-[#e8342a] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500"
          >
            Place Order — {currency(total)}
          </button>
          {!addressValid && (
            <p className="font-montserrat mt-3 text-center text-xs text-gray-500">
              Fill in name, phone, street and city to continue.
            </p>
          )}
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------- Menu
  return (
    <section className="min-h-screen bg-[#0b0d10] px-6 py-16 text-white sm:px-10 lg:px-14 xl:px-20">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.32em] text-gray-300">
          Build Your Order
        </span>
        <h2 className="font-grotesk mt-5 text-[11vw] font-bold leading-[.88] tracking-[-.055em] sm:text-6xl md:text-7xl">
          Pick &amp;
          <br />
          <span className="text-[#ff3b30]">Checkout.</span>
        </h2>
      </div>

      {/* Category tabs */}
      <div className="mx-auto mb-8 flex max-w-4xl flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-montserrat rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#ff3b30] text-white"
                : "bg-[#12151a] text-gray-400 ring-1 ring-inset ring-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        {/* Item list */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MENU[activeCategory].map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              qty={cart[item.id] || 0}
              onAdd={addItem}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Cart summary */}
        <aside className="h-fit rounded-2xl bg-[#12151a] p-6 ring-1 ring-inset ring-white/10 lg:sticky lg:top-8">
          <h3 className="font-grotesk text-xl font-bold tracking-[-0.01em] text-white">
            Your order
          </h3>

          {cartLines.length === 0 ? (
            <p className="font-montserrat mt-6 text-sm text-gray-500">
              Nothing added yet — pick a dish to get started.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {cartLines.map(({ item, qty }) => (
                <div key={item.id} className="font-montserrat flex justify-between text-sm text-gray-300">
                  <span className="truncate pr-2">{qty}× {item.name}</span>
                  <span className="shrink-0">{currency(item.price * qty)}</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-3">
                <div className="font-montserrat flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>{currency(subtotal)}</span>
                </div>
                <div className="font-montserrat mt-1 flex justify-between text-sm text-gray-400">
                  <span>Delivery fee</span>
                  <span>{currency(DELIVERY_FEE)}</span>
                </div>
                <div className="font-grotesk mt-2 flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span>{currency(total)}</span>
                </div>
              </div>
            </div>
          )}

          <button
            disabled={cartLines.length === 0}
            onClick={() => setStep("checkout")}
            className="font-montserrat mt-6 w-full rounded-full bg-[#ff3b30] py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#e8342a] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500"
          >
            {cartLines.length === 0 ? "Add items to continue" : `Checkout (${itemCount})`}
          </button>
        </aside>
      </div>
    </section>
  );
};

export default OrderNow;
