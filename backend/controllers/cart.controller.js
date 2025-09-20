import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "User not authenticated" });

    // normalize cartItems: convert strings to objects
    user.cartItems = user.cartItems.map(item =>
      typeof item === "string" ? { id: item, quantity: 1 } : item
    );

    const productIds = user.cartItems.map(item => item.id);
    const products = await Product.find({ _id: { $in: productIds } });

    const cartItems = products.map(product => {
      const item = user.cartItems.find(
        cartItem => cartItem.id.toString() === product._id.toString()
      );
      return { ...product.toJSON(), quantity: item ? item.quantity : 0 };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ message: "User not authenticated" });

    const existingItem = user.cartItems.find(
      item => item?.id?.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ id: productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        item => item.id.toString() !== productId.toString()
      );
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      item => item.id.toString() === productId.toString()
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          item => item.id.toString() !== productId.toString()
        );
      } else {
        existingItem.quantity = quantity;
      }
      await user.save();
    }

    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteAllFromCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "User not authenticated" });

    user.cartItems = [];
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in deleteAllFromCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
