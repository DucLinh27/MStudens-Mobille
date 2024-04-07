import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import axios from "axios";
import Video from "react-native-video";
import Constants from "expo-constants";
import { Image } from "react-native";
class ProfileUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  async componentDidMount() {
    try {
      const userId = 2;

      if (!userId) {
        console.error("No user ID provided");
        return;
      }
      console.log("UserID", userId);
      // Fetch orders for the specific user
      const response = await axios.get(
        `http://192.168.1.178:8080/api/get-order?userId=${userId}`
      );
      console.log("Orders:", response.data);
      this.setState({ orders: response.data });
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
              <Text style={styles.name}>{order.courses.name}</Text>
              <Image
                style={styles.image}
                source={{ uri: order.courses.image }}
              />
              <Button
                title="See Coures"
                onPress={() =>
                  this.props.navigation.navigate("UserStacks", {
                    screen: "UserCourses",
                    params: { orderId: order.id },
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
  video: {
    fontWeight: "bold",
    marginBottom: 8,
    width: "100%",
    height: 200,
  },
});

export default ProfileUsers;
