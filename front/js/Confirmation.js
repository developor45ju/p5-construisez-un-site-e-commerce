export default class Confirmation {
    constructor() {
        this.getOrderId = new URLSearchParams(document.location.search);
        this.orderId = this.getOrderId.get('orderId')
    }

    message() {
        const orderIdDOM = document.getElementById('orderId');
        orderIdDOM.textContent = this.orderId;
    }

    
}