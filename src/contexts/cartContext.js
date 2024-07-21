import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const ACTIONS = {
    ADD_ITEM: "add-item",
    DELETE_ITEM: "delete-item",
    TOGGLE: "toggle",
    CLEAR: "clear",
    GET_TOTAL: "get-total",
}

const initialState = {
    cart: [],
    amount: 0,
    total: 0
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_ITEM: {
            const { cartItem, quantity } = payload;
            const { id } = cartItem;
            const existingItem = state.cart.find((item) => item.id === id);
            if (existingItem) {
                const newCart = state.cart.map((item) => {
                    if (item.id === id) {
                        if (!existingItem.maxOrderQty || existingItem.qty + quantity <= existingItem.maxOrderQty) {
                            return { ...item, qty: item.qty + quantity };
                        } else {
                            return { ...item, qty: existingItem.maxOrderQty };
                        }
                    }
                    return item;
                });
                return { ...state, cart: newCart };
            } else {
                return { ...state, cart: [...state.cart, { ...cartItem, qty: quantity }] };
            }
        }
        case ACTIONS.DELETE_ITEM: {
            const { id } = payload;
            const newCart = state.cart.filter((item) => item.id !== id);
            return { ...state, cart: newCart };
        }
        case ACTIONS.TOGGLE: {
            const { id, instruction } = payload;
            const newCart = state.cart.map((item) => {
                if (item.id === id) {
                    if (instruction === "inc") {
                        return { ...item, qty: item.qty + 1 };
                    } else if (instruction === "dec") {
                        return { ...item, qty: item.qty - 1 };
                    }
                }
                return item;
            }).filter((item) => item.qty !== 0);
            return { ...state, cart: newCart };
        }
        case ACTIONS.CLEAR: {
            return { ...state, cart: [] };
        }
        case ACTIONS.GET_TOTAL: {
            const { amount, total } = state.cart.reduce((cartTotal, item) => {
                const { qty, price } = item;
                cartTotal.amount += qty;
                cartTotal.total += (price * qty);
                return cartTotal;
            }, {
                amount: 0,
                total: 0
            });
            return {
                ...state,
                amount,
                total: parseFloat(total.toFixed(2))
            };
        }
        default: {
            return state
        }
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function addItem(cartItem, quantity) {
        dispatch({ type: ACTIONS.ADD_ITEM, payload: { cartItem, quantity } });
        toast.success("تم إضافة المنتج لعربة التسوق");
    }
    function deleteItem(id) {
        dispatch({ type: ACTIONS.DELETE_ITEM, payload: { id } });
        toast.success("تم إزالة المنتج من عربة التسوق");
    }
    function toggleQTY(id, instruction) {
        dispatch({ type: ACTIONS.TOGGLE, payload: { id, instruction } });
    }
    function clearCart() {
        dispatch({ type: ACTIONS.CLEAR });
        toast.success("تم إزالة جميع المنتجات من عربة التسوق");
    }

    useEffect(() => {
        dispatch({ type: ACTIONS.GET_TOTAL });
        console.log(state.cart[0]);
    }, [state.cart]);

    return (
        <CartContext.Provider value={{
            amount: state.amount,
            total: state.total,
            cart: state.cart,
            addItem,
            deleteItem,
            toggleQTY,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext);
}