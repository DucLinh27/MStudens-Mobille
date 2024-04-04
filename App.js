import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Database from "./Database";
import AddScreen from "./src/screens/AddScreen";
import DetailScreen from "./src/screens/DetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import EditScreen from "./src/screens/EditScreen";
import CoursesView from "./src/screens/Courses/CoursesView";
import DetailCourses from "./src/screens/Courses/DetailCourses";
import ProfileUsers from "./src/screens/ProfileUser/ProfileUsers";
import Orders from "./src/screens/Orders/Orders";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen name="MSTUDENTS" component={CoursesView} />
    {/* <Tab.Screen name="Add Hike" component={EntryScreen} /> */}
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
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
