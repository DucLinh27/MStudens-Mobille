import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import Database from "./Database";
import CoursesView from "./src/screens/Users/Courses/CoursesView";
import DetailCourses from "./src/screens/Users/Courses/DetailCourses";
import ProfileUsers from "./src/screens/Users/ProfileUser/ProfileUsers";
import UserCourses from "./src/screens/Users/ProfileUser/UserCourses";
import Orders from "./src/screens/Users/Orders/Orders";
import Login from "./src/screens/Auth/Login";
import Register from "./src/screens/Auth/Register";
import { Button } from "react-native";
import Teacher from "./src/screens/Users/Teachers/Teacher";
import DetailTeacher from "./src/screens/Users/Teachers/DetailTeacher";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="MSTUDENTS"
      component={CoursesView}
      options={({ navigation }) => ({
        headerRight: () => (
          <Button
            title="Logout"
            onPress={() => {
              // Perform logout operation here
              // Then navigate to the login screen
              navigation.navigate("Login");
            }}
          />
        ),
      })}
    />
    <Tab.Screen name="Our  Teacher" component={Teacher} />
    <Tab.Screen name="Your Order" component={ProfileUsers} />
  </Tab.Navigator>
);
const CoursesStacks = () => (
  <Stack.Navigator>
    <Stack.Screen name="MSTUDENTS" component={CoursesView} />
    <Stack.Screen name="DetailCourses" component={DetailCourses} />
  </Stack.Navigator>
);
const TeacherStacks = () => (
  <Stack.Navigator>
    <Stack.Screen name="Our Teacher" component={Teacher} />
    <Stack.Screen name="DetailTeacher" component={DetailTeacher} />
  </Stack.Navigator>
);
const OrderStacks = () => (
  <Stack.Navigator>
    <Stack.Screen name="DetailCourses" component={DetailCourses} />
    <Stack.Screen name="Orders" component={Orders} />
  </Stack.Navigator>
);
const UserStacks = () => (
  <Stack.Navigator>
    <Stack.Screen name="Your Order" component={ProfileUsers} />
    <Stack.Screen name="Your Courses" component={UserCourses} />
  </Stack.Navigator>
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
      <Stack.Screen
        name="UnAuthNavigation"
        component={UnAuthNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoursesStacks"
        component={CoursesStacks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeacherStacks"
        component={TeacherStacks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserStacks"
        component={UserStacks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderStacks"
        component={OrderStacks}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator isAuthenticated={isAuthenticated} />
    </NavigationContainer>
  );
};

export default App;
