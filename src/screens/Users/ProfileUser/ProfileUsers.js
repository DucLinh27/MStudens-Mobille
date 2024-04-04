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

  componentDidMount() {
    axios
      .get(`http://192.168.1.178:8080/api/get-order`)
      .then((response) => {
        this.setState({ orders: response.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
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
