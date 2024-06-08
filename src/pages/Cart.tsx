import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "hdjdbdba",
    photo:
      "https://eu.tech21.com/cdn/shop/products/092b9032-1142-4fbb-9b12-1968405186b2.jpg?v=1688676661&width=1600",
    name: "Macbook",
    price: 80000,
    quantity: 4,
    stock: 10,
  },
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 200;
const total = subtotal + tax + shippingCharges - discount;

function Cart() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 1000);

    if (Math.random() > 0.5) {
      setIsValidCouponCode(true);
    } else {
      setIsValidCouponCode(false);
    }
    return () => {
      setIsValidCouponCode(false);
      clearTimeout(timeoutId);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.map((item, i) => (
          <CartItem key={i} cartItem={item} />
        ))}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: -<em>₹{discount}</em>
        </p>
        <p>
          <strong>Total :₹{total}</strong>
        </p>

        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        <Link to="/shipping">Ship Order</Link>
      </aside>
    </div>
  );
}

export default Cart;
