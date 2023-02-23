import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingBag } from '../../assets/115 - shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingBag className='shopping-icon' />
            <span className='item-count'>
                {cartItemsCount}
            </span>
        </div>
    );
}

export default CartIcon;
