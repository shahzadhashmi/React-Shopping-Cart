// import React,{useState} from 'react';
import React, { useContext } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import { CartContext } from './Cart';
import Items from "./Items";


const ContextCart = () => {
    // To takle item error we'll paste this line here for shot time 
    // const [item, setItem] = useState(products);

    // now we'll use useContext instead of consumer b/c consumer is lengthy.
    // TO solve the error item.map is not a fun destructure the data here and that will be {item}
    // const item = useContext(CartContext);
    const {item, clearCart, totalItem, totalAmount} = useContext(CartContext);

    return (
        <>
            <header>
                <div className="continue-shopping">
                    <img src="./images/arrow.png" alt="arrow" className="arrow-icon" />
                    <h3>Continue Shopping</h3>
                </div>
                <div className="cart-icon">
                    <img src="./images/cart.png" alt="cart" />
                    <p>{totalItem}</p>
                </div>
            </header>

            <section className="main-cart-section">
                <h1>Shopping Cart</h1>
                <p className="total-items">You have <span className="total-items-count">{totalItem}</span> items in Shopping cart</p>

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
                    <h3>Cart Total : <span>RS.{totalAmount}</span></h3>
                    <button>Checkout</button>
                    <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                </div>
            </section>
        </>
    )
}

export default ContextCart
