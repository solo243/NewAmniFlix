import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
// get device all width and height
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const HeroSlider = ({ data, navigation }) => {
  const [currentindex, setcurrentindex] = useState(0);

  return (
    <View>
      <View>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={true}
          horizontal
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setcurrentindex((x / width).toFixed(0));
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navigation.navigate("Details", { item })}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: height * 0.45,
                      resizeMode: "cover",
                      width: width,
                    }}
                  />
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(16, 23, 32, 0.4)",
                      "rgba(16, 23, 32, 1)",
                    ]}
                    style={{
                      width,
                      height: height * 0.7,
                      position: "absolute",
                      bottom: 0,
                    }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                  />

                  <Text
                    numberOfLines={2}
                    style={{
                      position: "absolute",
                      bottom: 25,
                      color: "white",
                      fontWeight: "500",
                      fontSize: RFValue(20),
                      // fontSize: width*0.05,
                      marginStart: 20,
                      width: 250,
                    }} 
                  >
                    {item.title.english || item.title.romaji} {"\n"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          {data.map((item, index) => {
            return (
              <View
                style={{
                  backgroundColor: currentindex == index ? "#b3b3ff" : "grey",
                  height: 10,
                  width: 10,
                  marginLeft: 10,
                  borderRadius: 30,
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default HeroSlider;
