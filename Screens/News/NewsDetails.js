import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { randomstickers } from "../../Loidngfile/loding";




const NewsDetails = ({ route, navigation }) => {
  const selected = route.params.item;
  const selectedID = selected.id;
  // console.log(selectedID)

  useEffect(() => {
    FetchDetails(selectedID);
  }, [selectedID]);


  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const FetchDetails = async (id) => {
    setloading(true);
    const url = `https://cosmet.vercel.app/news/ann/info?id=${id}`;
    const hh = await fetch(url);
    const ll = await hh.json();
    const mm = ll;
    setdata(mm);
    setloading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1c2639" }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: randomstickers() }}
            style={{ height: 200, width: 200, alignSelf: "center" }}
          />
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: RFValue(20),
              marginTop: 20,
            }}
          >
            Loading ....
          </Text>
        </View>
      ) : (
        <ScrollView>
          <Image
            source={{ uri: selected.thumbnail }}
            style={{
              height: responsiveHeight(40),
              resizeMode: "contain",
              width: responsiveWidth(100),
              marginTop: responsiveHeight(4),
            }}
          />
          <View
            style={{
              backgroundColor: "#b3b3ff",
              // height: height * 0.05,
              height: 45,

              width: 45,
              borderRadius: 10,
              marginStart: responsiveWidth(3),
              justifyContent: "center",
              position: "absolute",
              marginTop: responsiveHeight(3),
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("feed")}>
              <Ionicons
                name="ios-chevron-back"
                size={27}
                color="white"
                style={{ alignSelf: "center", end: 1 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: responsiveWidth(95),
              backgroundColor: "#101720",
              paddingTop: 30,
              borderRadius: 10,
              alignSelf: "center",
              paddingStart: 20,
              paddingEnd: 20,
              marginBottom: 30,
              paddingBottom: 30,
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: RFValue(19), color: "white" }}>
              {data.title}
            </Text>
            <Text style={{ color: "white", marginTop: 30 }}>{data.intro}</Text>
            <Text
              style={{ color: "grey", fontSize: RFValue(15), marginTop: 20 }}
            >
              {data.description}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default NewsDetails;
