import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Database from "./Database";
import CoursesView from "./src/screens/Users/Courses/CoursesView";
import DetailCourses from "./src/screens/Users/Courses/DetailCourses";
import ProfileUsers from "./src/screens/Users/ProfileUser/ProfileUsers";
import Orders from "./src/screens/Users/Orders/Orders";
import Login from "./src/screens/Auth/Login";
import Register from "./src/screens/Auth/Register";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigation = () => (
  <Tab.Navigator>
    {/* <Tab.Screen name="MSTUDENTS" component={CoursesView} /> */}
    <Tab.Screen name="MSTUDENTS" component={Login} />
    {/* <Tab.Screen name="MSTUDENTS" component={Register} /> */}
    <Tab.Screen name="Your Profile" component={ProfileUsers} />
  </Tab.Navigator>
);

const App = () => {
  // TODO: Implement Bottom Tab navigation
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Back"
          component={HomeNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddCourses" component={ProfileUsers} />
        <Stack.Screen name="CoursesView" component={CoursesView} />

        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="DetailCourses" component={DetailCourses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
