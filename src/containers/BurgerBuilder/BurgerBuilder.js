import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"

const INGREDIENT_PRICES={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}

class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice : 0,
        purchasing:false
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type]+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        this.setState({
            ingredients:updatedIngredients,
            totalPrice: this.state.totalPrice+priceAddition
        });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount>0) {
            const updatedCount = this.state.ingredients[type]-1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type]=updatedCount;
            const priceReduction = INGREDIENT_PRICES[type];
            this.setState({
                ingredients:updatedIngredients,
                totalPrice: this.state.totalPrice-priceReduction
            });            
        }
    }

    purchaseHandler=()=>{
        this.setState({
            purchasing:true
        });
    };

    purchaseCancelledHandler=()=>{
        this.setState({
            purchasing:false
        })
    }

    render() {
        const disabledInfo={...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return(
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                <OrderSummary ingredients={this.state.ingredients} />
            </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ordered={this.purchaseHandler} ingredientAdded = {this.addIngredientHandler} ingredientRemoved = {this.removeIngredientHandler} disabled = {disabledInfo} price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;