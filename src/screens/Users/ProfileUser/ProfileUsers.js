import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import axios from "axios";

class ProfileUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  async componentDidMount() {
    try {
      const { route } = this.props;
      if (route && route.params && route.params.userId) {
        const { userId } = route.params;
        console.log("UserID", userId);

        // Fetch orders for the specific user
        const response = await axios.get(
          `http://192.168.1.178:8080/api/get-order?userId=${userId}`
        );
        console.log("Orders:", response.data);

        const userOrders = response.data.filter(
          (order) => order.userId === userId
        );
        const ordersArray = Array.isArray(userOrders)
          ? userOrders
          : Object.values(userOrders);

        this.setState({
          orders: ordersArray,
        });
      } else {
        console.error("No user ID provided");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }
  render() {
    const { orders } = this.state;
    console.log("ORDERS", orders);
    return (
      <ScrollView>
        <View>
          {orders.map((order) => (
            <View key={order.id}>
              <Text style={styles.name}>{order.username}</Text>
              <Button
                title="Submit"
                onPress={() =>
                  this.props.navigation.navigate("DetailCourses", {
                    orderId: order.id,
                  })
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  name: {
    flexGrow: 1,
  },
  image: {
    fontWeight: "bold",
    marginBottom: 8,
    width: "100%",
    height: 200,
  },
});

export default ProfileUsers;
