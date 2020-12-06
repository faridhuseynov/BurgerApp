import axios from "axios";

const instance = axios.create({
    baseURL:'https://burgerbuilder-75846-default-rtdb.firebaseio.com/'
});

export default instance;