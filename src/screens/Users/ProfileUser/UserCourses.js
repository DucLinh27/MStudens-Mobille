import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";
class UserCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    const { orderId } = this.props.route.params.orderId; // Get the user ID here
    console.log("orderId", orderId);
    axios
      .get(`http://192.168.1.178:8080/api/get-orders-by-id?id=${52}`) // Use the user ID here
      .then((response) => {
        this.setState({ orders: response.data.data });
        console.log("orderId", response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }
  render() {
    const { orders } = this.state;
    if (!orders || !orders.courses) {
      return <Text>Loading...</Text>; // Or some other placeholder
    }
    let videoUrls;
    if (orders && orders.courses && orders.courses.videos) {
      videoUrls = orders.courses.videos.map((videoObject) => ({
        url: videoObject.video,
        name: videoObject.name,
      }));
    }
    console.log("USERVIDEOS", videoUrls);
    console.log("USERORDERS", orders.courses.videos.name);
    return (
      <ScrollView>
        <View>
          {videoUrls.map((videoUrl, index) => (
            <View key={index}>
              <Text style={styles.name}>{videoUrl.name}</Text>
              <WebView
                key={index}
                style={styles.image}
                javaScriptEnabled={true}
                source={{ uri: videoUrl.url }}
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
    fontSize: 20,
    color: "#333",
    marginTop: 20,
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 10,
  },
  image: {
    fontWeight: "bold",
    marginBottom: 8,
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginLeft: 20,
  },
});

export default UserCourses;
