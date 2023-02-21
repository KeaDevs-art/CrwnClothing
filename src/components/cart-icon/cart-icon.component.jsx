import { ReactComponent as ShoppingBag } from '../../assets/115 - shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {

    return (
        <div className='cart-icon-container'>
            <ShoppingBag className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    );
}

export default CartIcon;
