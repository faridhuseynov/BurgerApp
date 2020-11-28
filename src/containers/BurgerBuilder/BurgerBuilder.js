import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:1,
            bacon:1,
            cheese:2,
            meat:2
        },
        totalPrice : 5.4
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

    render() {
        const disabledInfo={...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded = {this.addIngredientHandler} ingredientRemoved = {this.removeIngredientHandler} disabled = {disabledInfo} price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;