import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useFonts } from "expo-font";
// get device all width and height
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const FlatListView = ({ navigation, item }) => {
  const [loaded] = useFonts({
    // font: require('../assets/fonts/Montserrat-Regular.ttf'),
    ll: require("../assets/fonts/Inter-Regular.ttf")
  })

  return (
    <View
      style={{
        // backgroundColor: "red",
        // height: height * 0.378,
        maxHeight: 320,
        // borderRadius: 10,
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { item })}
        >
          <Image
            source={{ uri: item.image || item.Image }}
            style={{
              width: 170,
              backgroundColor: "grey",
              height: 260,
              maxWidth: responsiveWidth(39),
              maxHeight: responsiveHeight(30),
              margin: responsiveWidth(1),
              borderRadius: 12,
              resizeMode: "cover",
            }}
          />
          <View
            style={{
              width: width * 0.3,
              width: 120,
              maxWidth: 200,
              alignSelf: "center",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: "white",
                // fontSize: width * 0.033,
                fontSize: RFValue(12),
                textAlign: "center",
                fontFamily: "ll",
                fontWeight: '500'
              }}
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlatListView;
