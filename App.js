import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
} from "react-native";
import "react-native-gesture-handler";
import { app } from "./config";
// for all navigation import librarys
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import Homescreen from "./Screens/Homescreen";
import Detailscreen from "./Screens/Detailscreen";
import Searchscreen from "./Screens/Searchscreen";
import StreamingPage from "./Screens/StreamingPage";
import Gaga from "./Screens/gaga";
import Savescreen from "./Screens/Savescreen";
import { LinearGradient } from "expo-linear-gradient";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import GenreBlock from "./component/GenreBlock";
import CatScreen from "./Screens/CatScreen";
import Main from "./Screens/News/Main";
import NewsDetails from "./Screens/News/NewsDetails";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={Homescreen} />
      <Stack.Screen name="Details" component={Detailscreen} />
      <Stack.Screen name="Search" component={Searchscreen} />
      <Stack.Screen name="SeeAll" component={Gaga} />
      <Stack.Screen name="Stream" component={StreamingPage} />
      <Stack.Screen name="Genra" component={GenreBlock} />
      <Stack.Screen name="CatScreens" component={CatScreen} />
    </Stack.Navigator>
  );
}

function NewsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="feed" component={Main} />
      <Stack.Screen name="NDetail" component={NewsDetails} />
    </Stack.Navigator>
  );
}
export default function App() {
  const [imageData, SetImagedata] = useState();
  const db = getDatabase(app);
  useEffect(() => {
    gandu();
  }, []);
  const gandu = async () => {
    try {
      const imageref = ref(db, "/image_dar");
      onValue(imageref, async (imageSnapshot) => {
        const imagedata = imageSnapshot.val();
        SetImagedata(imagedata.url);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavigationContainer theme={DarkTheme}>
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: { backgroundColor: "#181a20", width: 260 },
            swipeEdgeWidth: 60,
            headerShown: false,
            drawerItemStyle: {
              marginTop: height * 0.02,
              height: height * 0.06,
              justifyContent: "center",
            },
          }}
          drawerContent={(props) => {
            return (
              <SafeAreaView>
                <View
                  style={{
                    height: 280,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    // source={require("./assets/ohk.png")}
                    source={{
                      uri: imageData,
                    }}
                    style={{ height: "98%", width: 240 }}
                  />
                </View>

                <View style={{ marginBottom: 20 }}></View>

                <DrawerItemList {...props} />
                <View
                  style={{
                    position: "absolute",
                    bottom: -height * 0.35,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", marginStart: "27%" }}>
                    Under Development
                  </Text>
                </View>
              </SafeAreaView>
            );
          }}
        >
          <Drawer.Screen
            name="Main"
            component={StackNavigator}
            options={{
              drawerLabel: "Home",
              title: "Home",
              drawerIcon: () => (
                <Ionicons name="ios-home" size={28} color="white" />
              ),
            }}
          />
          <Drawer.Screen
            name="News"
            component={NewsStack}
            options={{
              drawerLabel: "News",
              title: "News",
              drawerIcon: () => (
                <FontAwesome name="newspaper-o" size={24} color="white" />
              ),
            }}
          />

          <Drawer.Screen
            name="Savescreen"
            component={Savescreen}
            options={{
              drawerLabel: "Favorites",
              title: "Favorites",

              drawerIcon: () => (
                <FontAwesome name="bookmark" size={28} color="white" />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
