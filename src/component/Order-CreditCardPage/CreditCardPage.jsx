import React from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { cartItemsSelect, favoriteItemsSelect } from '../../redux/cart/cart-selector';
import { withRouter } from 'react-router-dom';
import './CreditCardPage.scss'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';


class CreditCardPage extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="PaymentForm">
                <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <div className="creditcard-main">
                    <form >
                        <input
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            maxLength="16"
                            required

                        />
                        <input
                            type="tel"
                            name="cvc"
                            placeholder="CVC"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            maxLength="3"
                            required

                        />
                        <input
                            type="tel"
                            name="name"
                            placeholder="name"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            maxLength="6"
                            required
                        />
                        <input
                            type="tel"
                            name="expiry"
                            placeholder="Card Number"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            maxLength="4"
                            required
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    cartItems: cartItemsSelect,
    cartFavoriteItems: favoriteItemsSelect,
});

export default withRouter(connect(mapStateToProps)(CreditCardPage))