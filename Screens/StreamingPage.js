import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { hide } from "expo-splash-screen";
import { setStatusBarHidden } from "expo-status-bar";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function StreamingPage({ route, navigation }) {
  const isfocus = useIsFocused();

  const [textshow, settextshow] = useState(true);
  // const[selectedepid,setselectedepid] = useState();

  // useEffect(()=> {
  //   // saveData(DataObject)
  //   // removeAllData()
  //   GetAllaSave()
  // })

  const selected = route.params.item;
  const fromHistory = route.params.item;
  const gg = fromHistory.id;

  // this all is for history
  const title = route.params.title;
  // const poster = route.params.poster;
  const quality = selected.quality;

  const DataObject = {
    title: title,
    // poster: poster,
    id: selected.url,
    quality: quality,
  };
  const [AvailableInHis, SetAvailableInHis] = useState(false);

  const GetAllaSave = async () => {
    try {
      const newgg = await AsyncStorage.getItem("history");

      if (newgg === null) {
        console.log("newgg is null "), saveData(DataObject);
      } else {
        // setFf(JSON.parse(newgg));
        const dataArray = JSON.parse(newgg);
        // const isSaved = dataArray.some((item) => item.id === selected.url || fromHistory.id);
        //   console.log(isSaved)
        //  {isSaved === false ?
        // saveData(DataObject ) : null}
        saveData(DataObject);
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const [mm, setmm] = useState([]);
  const [ff, setff] = useState([]);

  const saveData = async (data) => {
    try {
      // Get existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem("history");
      // console.log("this is a available  " ,existingData)
      const parsedData = existingData ? JSON.parse(existingData) : [];
      setff(parsedData);
      // Add the new data to the array
      // parsedData.unshift(data);

      setmm(data, ff);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("history", JSON.stringify(parsedData));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const removeAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      console.log("All data removed from AsyncStorage.");
    } catch (error) {
      console.error("Error removing data from AsyncStorage:", error);
    }
  };

  let backButtonPressCount = 0;

  const handleBackButtonPress = () => {
    if (backButtonPressCount === 0) {
      // First press: Show a message or perform some action
      backButtonPressCount += 1;
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      return true; // Prevent default back action
    } else if (backButtonPressCount === 1) {
      // Second press: Navigate back
      navigation.goBack();
      return true; // Prevent default back action
    }
  };

  const [load, setload] = useState(true);

  useEffect(() => {
 
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    return () => {
      backHandler.remove();
    };
  }, [isfocus]);

  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar hidden={true} />
      <Video
        source={{ uri: selected.url || gg }}
        useNativeControls // Remote video URL
        rate={1.0}
        volume={1.0}
        isMuted={false}
        onFullscreenUpdate={setOrientation}
        resizeMode="contain"
        shouldPlay
        isLooping
        usePoster={true}
        posterSource={{
          uri: "https://media.tenor.com/JlPZldv5YBQAAAAi/lordzebax.gif",
        }}
        posterStyle={{
          height: responsiveHeight(50),
          alignItems: "center",
          // backgroundColor: "red",
          width: responsiveWidth(40),
          alignSelf: "center",
          marginTop: "30%",
          marginStart: "25%",
          justifyContent: "center",
        }}
        style={{
          height: responsiveHeight(95),
          width: responsiveWidth(100),
        }}
      />
      {textshow && (
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 17,
            marginTop: 16,
          }}
        >
          {" "}
          Maximize the experience – tap on full-screen!
        </Text>
      )}
    </View>
  );
}
