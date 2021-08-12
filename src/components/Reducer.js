export const reducer = (state, action) => {
    // don't want to return or perform any action just return the state
    // action will check which type of data i'm receiving, if match then return whole state b/c we don't want to remove everything from cart and also return item and apply filter on that state check current element that is inside the item if doesnot match then return whole state.
    if (action.type === "REMOVE_ITEM") {
        return {
            ...state,
            item: state.item.filter((curElem) => {
                return curElem.id !== action.payload;
            }),
        };
    }
    // this is for clear cart
    if (action.type === "CLEAR_CART") {
        return { ...state, item: [] };
    }
    // This is for Item Increment
    if (action.type === "INCREMENT_ITEM") {
        // to check which element we are selecting to increment
        let IncrementCart = state.item.map((curElem) => {
            if (curElem.id === action.payload) {
                // if we pass ...state here then every item will be incremented, so to avoid this pass curElem here to increment only one item.
                return { ...curElem, quantity: curElem.quantity + 1 };
            }
            return curElem;
        });
        return { ...state, item: IncrementCart };
    }

    // This is for Decrement item
    if (action.type === "DECREMENT_ITEM") {
        let DecrementCart = state.item.map((curElem) => {
            if (curElem.id === action.payload) {
                return { ...curElem, quantity: curElem.quantity - 1 };
            }
            return curElem;
            // this filter will remove item from cart when item become 0.
        }).filter((curElem) => curElem.quantity !== 0);
        return { ...state, item: DecrementCart };
    }

    // TO execute reduce method that you produce on each element of the array, resulting in single output value.
    // The reduce fun takes 4 arguments .1.accumelator, 2.Current Value, 3. Current Index, 4. Source Array.
    // use when you need to sum, avg, total, this type of results.
    // This will give us how many total items in our cart and how much cost they have(Total Cast).

    if (action.type === "GET_TOTAL") {
        let { totalItem , totalAmount} = state.item.reduce((accum, curVal) => {
            let { quantity , price  } = curVal;
            accum.totalItem += quantity;
            accum.totalAmount += price*quantity;
            return accum;
        },
        {
                // this is for initial value of the state, and that'll be total amount and total item.
                totalItem: 0,
                totalAmount: 0,
        }
    );
        // now return previous state as it is,so
        return { ...state, totalItem, totalAmount };
    }
    return state;
};