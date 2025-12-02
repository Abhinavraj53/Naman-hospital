import axiosClient from "./axiosClient";

const paymentApi = {
  createCashfreeOrder(payload) {
    return axiosClient.post("/payments/cashfree/order", payload);
  },
  createCODOrder(payload) {
    return axiosClient.post("/payments/cod/order", payload);
  },
  getOrderStatus(orderId) {
    return axiosClient.get(`/payments/order/${orderId}`);
  }
};

export default paymentApi;


