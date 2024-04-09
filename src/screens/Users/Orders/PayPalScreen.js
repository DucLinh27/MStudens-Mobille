import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import PayPal from "react-native-paypal-wrapper";

const PayPalScreen = () => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const payment = await PayPal.createPayment({
        // Chi tiết thanh toán (số tiền, loại tiền tệ, mô tả, v.v.)
      });
      const confirmPayment = await PayPal.confirmPayment(payment.payment.id);
      // Xử lý xác nhận thanh toán thành công
      Alert.alert("Thành công", "Thanh toán thành công!");
    } catch (error) {
      // Xử lý lỗi thanh toán
      Alert.alert("Lỗi", "Thanh toán thất bại. Vui lòng thử lại sau.");
    }
    setLoading(false);
  };

  return (
    <View>
      <Button
        title="Thanh toán bằng PayPal"
        onPress={initiatePayment}
        disabled={loading}
      />
    </View>
  );
};

export default PayPalScreen;
