// import React, { createContext, useState } from "react";
import React, { createContext, useReducer, useEffect } from "react";
import "./Cart.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { products } from "./products";
import ContextCart from "./ContextCart";
import { reducer } from "./Reducer";

// It has provider and consumer
export const CartContext = createContext();

const initialState = {
    item: products,
    totalAmount: 0,
    totalItem: 0,
}

const Cart = () => {
    // const [item, setItem] = useState(products);


    // => initialState data goes to state data, 
    // => dispatch is used to triger the action that is define in reducer function, it contain two parameters (state, action).
    // we'll pass some type in dispatch and action will check which type is it and perform the action on that.
    const [state, dispatch] = useReducer(reducer, initialState);

    // To remove individual item or element from cart with the help of dispatch function,will contain type and payload, payload is extra value, we are just defining something is going to remove, so now goto reducer and perform some actions  
    const removeItem = (id) => {
        return dispatch({
            type: "REMOVE_ITEM",
            payload: id,
        });
    };

    // Clear the Cart
    const clearCart = () => {
        return dispatch({ type: "CLEAR_CART" });
    }

    // Increment the items
    const increment = (id) => {
        return dispatch(
            {
                type: "INCREMENT_ITEM",
                payload: id,
            });
    }
    // Decrement the items
    const decrement = (id) => {
        return dispatch(
            {
                type: "DECREMENT_ITEM",
                payload: id,
            });
    }

    // We will use the useEffect to update the data for shopping to cart increment and decrement.It will run only when any change in item and state.

    useEffect(() => {
        dispatch({ type: "GET_TOTAL" });
        // console.log("Awesome");
    }, [state.item]);

    return (
        <>
            {/* This is ContextApi method, now to use item globally we'll use provider here, now we don't need useState anymore, CartContext is our global state */}
            {/* instead of value={products}, we'll use ...state here that we just create with the help of reducer, so */}
            <CartContext.Provider value={{ ...state, removeItem, clearCart, increment, decrement }}>
                <ContextCart />
            </CartContext.Provider>




            {/* This is our Props Method, passing data without seperate contextcart component */}
            {/* <header>
                <div className="continue-shopping">
                    <img src="./images/arrow.png" alt="arrow" className="arrow-icon" />
                    <h3>Continue Shopping</h3>
                </div>
                <div className="cart-icon">
                    <img src="./images/cart.png" alt="cart" />
                    <p>7</p>
                </div>
            </header>

            <section className="main-cart-section">
                <h1>Shopping Cart</h1>
                <p className="total-items">You have <span className="total-items-count">7</span> items in Shopping cart</p>

                <div className="cart-items">
                    <div className="cart-items-container">
                        <PerfectScrollbar>
                            {
                                item.map((curItem) => {
                                    return <Items key={curItem.id} {...curItem}></Items>
                                })

                            }
                        </PerfectScrollbar>
                    </div>
                </div>

                <div className="card-total">
                    <h3>Cart Total : <span>RS.2200</span></h3>
                    <button>Checkout</button>
                </div>
            </section> */}
        </>
    )
}

export default Cart;
