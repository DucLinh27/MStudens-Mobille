import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import Database from "./Database";
import CoursesView from "./src/screens/Users/Courses/CoursesView";
import DetailCourses from "./src/screens/Users/Courses/DetailCourses";
import ProfileUsers from "./src/screens/Users/ProfileUser/ProfileUsers";
import Orders from "./src/screens/Users/Orders/Orders";
import Login from "./src/screens/Auth/Login";
import Register from "./src/screens/Auth/Register";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const CoursesStack = createStackNavigator();

const HomeNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen name="MSTUDENTS" component={CoursesStackScreen} />
    <Tab.Screen name="Your Profile" component={ProfileUsers} />
  </Tab.Navigator>
);
const CoursesStackScreen = () => (
  <CoursesStack.Navigator>
    <CoursesStack.Screen name="MSTUDENTS" component={CoursesView} />
    <CoursesStack.Screen name="DetailCourses" component={DetailCourses} />
  </CoursesStack.Navigator>
);
const UnAuthNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen name="Login" component={Login} />
    <Tab.Screen name="Register" component={Register} />
  </Tab.Navigator>
);
const RootNavigator = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UnAuthNavigation" component={UnAuthNavigation} />
      <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
    </Stack.Navigator>
  );
};
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Database.initDatabase();
    // TODO: Check if the user is authenticated
    // setIsAuthenticated(true or false based on the authentication status)
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator isAuthenticated={isAuthenticated} />
    </NavigationContainer>
  );
};

export default App;
