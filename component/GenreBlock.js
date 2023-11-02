import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useFonts } from "expo-font";
// get device all width and height
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const GenreBlock = ({ navigation, genra, seealldata }) => {
  const [loaded] = useFonts({
    // font: require('../assets/fonts/Montserrat-Regular.ttf'),
    ll: require("../assets/fonts/Inter-Regular.ttf")
  })

  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: "row",
            width: width,
            alignContent: "center",
            justifyContent: "space-between",

            paddingLeft: 29,
            paddingRight: 10,
            marginTop: height * 0.055,
            marginBottom: height * 0.01,
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              position: "absolute",
              flexDirection: "row",
              marginStart: 10,
              width: 10,
              height: responsiveHeight(3.9),
            }}
          />

          <Text
            style={{
              color: "white",
              // fontSize: width * 0.06,
              fontSize: RFValue(21),
              fontFamily: "ll",
              fontWeight: '600'
            }}
          >
            {genra} Anime
          </Text>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("CatScreens", {
                cate: seealldata,
                genra: genra,
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                // width: width * 0.15,
                // backgroundColor: "red",
                alignSelf: "center",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#41a5f3",
                  marginTop: height * 0.01,
                  // paddingEnd: 10,
                  // marginEnd: 10,
                }}
              >
                See All
              </Text>
              <AntDesign
                name="arrowright"
                size={20}
                color="#41a5f3"
                style={{ marginTop: height * 0.01, marginStart: width * 0.01 }}
              />
            </View>
          </TouchableOpacity> */}  
        </View>
      </View>
    </View>
  );
};

export default GenreBlock;
