import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const GUEST_CART_KEY = "guest_cart";

const readStoredArray = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const mergeItems = (items = []) => {
  const merged = [];

  items.forEach((item) => {
    const itemKey = `${item._id || item.id || "item"}-${item.waxType || "default"}`;
    const existing = merged.find((entry) => `${entry._id || entry.id || "item"}-${entry.waxType || "default"}` === itemKey);

    if (existing) {
      existing.quantity += Number(item.quantity || 1);
      return;
    }

    merged.push({ ...item, quantity: Number(item.quantity || 1) });
  });

  return merged;
};

function CartProvider({ children }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const storageKey = user?.id ? `cart_${user.id}` : "cart";

  const [cart, setCart] = useState(() => readStoredArray(storageKey));
  const [guestCart, setGuestCart] = useState(() => readStoredArray(GUEST_CART_KEY));
  const [showPopup, setShowPopup] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      setCart([]);
      return;
    }

    const savedUserCart = readStoredArray(storageKey);
    const savedGuestCart = readStoredArray(GUEST_CART_KEY);
    const mergedCart = mergeItems([...savedGuestCart, ...savedUserCart]);

    setCart(mergedCart);
    localStorage.setItem(storageKey, JSON.stringify(mergedCart));
    localStorage.removeItem(GUEST_CART_KEY);
    setGuestCart([]);
  }, [isLoggedIn, user?.id, storageKey]);

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      localStorage.setItem(storageKey, JSON.stringify(cart));
      localStorage.removeItem(GUEST_CART_KEY);
      return;
    }

    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guestCart));
  }, [cart, guestCart, isLoggedIn, user?.id, storageKey]);

  const closePopup = () => {
    setShowPopup(false);
    setLastAddedItem(null);
  };

  const addToCart = (service) => {
    const normalizedService = {
      ...service,
      image: service.image || service.img || "",
    };

    setShowPopup(true);
    setLastAddedItem(normalizedService);

    if (!isLoggedIn) {
      setGuestCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item._id === normalizedService._id && item.waxType === normalizedService.waxType
        );

        if (existingItem) {
          return prevCart.map((item) =>
            item._id === normalizedService._id && item.waxType === normalizedService.waxType
              ? { ...item, quantity: item.quantity + (normalizedService.quantity || 1) }
              : item
          );
        }

        return [...prevCart, { ...normalizedService, quantity: normalizedService.quantity || 1 }];
      });
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === normalizedService._id && item.waxType === normalizedService.waxType
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === normalizedService._id && item.waxType === normalizedService.waxType
            ? { ...item, quantity: item.quantity + (normalizedService.quantity || 1) }
            : item
        );
      }

      return [...prevCart, { ...normalizedService, quantity: normalizedService.quantity || 1 }];
    });
  };

  const updateCart = (updater) => {
    if (!isLoggedIn) {
      setGuestCart((prevCart) => updater(prevCart));
      return;
    }

    setCart((prevCart) => updater(prevCart));
  };

  const increaseQuantity = (id, waxType) => {
    updateCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.waxType === waxType
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, waxType) => {
    updateCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id && item.waxType === waxType
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id, waxType) => {
    updateCart((prevCart) =>
      prevCart.filter((item) => !(item._id === id && item.waxType === waxType))
    );
  };

  const clearCart = () => {
    if (isLoggedIn) {
      setCart([]);
      localStorage.removeItem(storageKey);
      return;
    }

    setGuestCart([]);
    localStorage.removeItem(GUEST_CART_KEY);
  };

  const cartItems = isLoggedIn ? cart : [];
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        cartCount,
        cartTotal,
        showPopup,
        setShowPopup,
        lastAddedItem,
        closePopup,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;