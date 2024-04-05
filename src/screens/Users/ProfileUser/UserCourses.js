import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";

class UserCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    const { userId } = this.props.route.params; // Get the user ID here
    axios
      .get(`http://192.168.1.178:8080/api/get-orders-by-id?id=${userId}`) // Use the user ID here
      .then((response) => {
        this.setState({ orders: response.data.data });
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }
  render() {
    const { orders } = this.state;
    console.log("ORDERS", courses);
    return (
      <ScrollView>
        <View>
          {orders.map((order) => (
            <View key={order.id}>
              <Text style={styles.name}>{order.name}</Text>
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

export default UserCourses;
