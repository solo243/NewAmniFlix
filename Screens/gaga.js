import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import Lottie from "lottie-react-native";
import { SafeAreaView } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { fetchgogorecent } from "../API/gogo";
import { gogotopair } from "../API/gogo";

import { randomstickers } from "../Loidngfile/loding";

const Gaga = ({ navigation, route }) => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const [currentPage, setCurrentPage] = useState(1);
  const [trending, settrending] = useState([]);
  const { source, data } = route.params;
  const [recentani, setrecentani] = useState([]);

  const [gogoload, setgogoload] = useState(true);
  const [loding, setloding] = useState(false);

  const randomimg = randomstickers();
  // rr = randomurls();

  const isfromrecentep = source === "recent";
  const animeData = isfromrecentep
    ? route.params.recentep
    : route.params.result;
  const result = animeData;

  const recentanime = async (item) => {
    // setrecentani([""]);
    // let hh = await fetchrecent(item);
    // let ll = await hh.results;
    // setrecentani(ll);
    // setCurrentPage(item);
    // setloding(false);
  };

  const trendinganime = async (item) => {
    // settrending([""]);
    // let rr = await fetchtrending(item);
    // let nn = await rr.results;
    // settrending(nn);
    // setCurrentPage(item);
    // // setloding(false);
  };

  const recentgogoanime = async (item) => {
    setgogoload(true);
    let gg = await fetchgogorecent(item);
    let tt = await gg.response.jsonDoc.results;
    setCurrentPage(item);
    // console.log(gg);
    setrecentani(tt);
    setgogoload(false);
    // console.log(tt);
  };

  const fromgogotopair = async (item) => {
    setgogoload(true);
    const kk = await gogotopair(item);
    const gg = await kk.response.jsonDoc.results;
    setCurrentPage(item);
    settrending(gg);
    // console.log(gg);
    setgogoload(false);
  };
  useEffect(() => {
    {
      isfromrecentep
        ? recentgogoanime(currentPage)
        : fromgogotopair(currentPage);
    }
  }, []);

  const paginationArray = Array.from({ length: 50 }, (_, index) => index + 1);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* main view for all */}
      <View style={{ backgroundColor: "#181a20" }}>
        <View
          style={{
            backgroundColor: "#181a20",
            justifyContent: "center",
            height: height * 0.07,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: height * 0.03,
              textAlign: "center",
              // fontFamily: "Inter-Black",
            }}
          >
            {isfromrecentep ? "Recent Anime" : "Tranding Anime "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Main");
            }}
            style={{
              right: width * 0.89,
              width: 30,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <Ionicons name="ios-chevron-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
            style={{
              left: width * 0.89,
              width: 30,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <Octicons name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {gogoload ? (
            <View
              style={{ height: height, width: width, justifyContent: "center" }}
            >
              <Image
                source={{ uri: randomimg }}
                style={{
                  height: 200,
                  width: 200,
                  alignSelf: "center",
                  resizeMode: "cover",
                  marginBottom: height * 0.1,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  bottom: height * 0.1,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "white",
                    // fontFamily: "Inter-Black",
                  }}
                >
                  Please wait...
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ marginBottom: 100, marginTop: height * 0.0 }}>
              <FlatList
                data={isfromrecentep ? recentani : trending}
                numColumns={2}
                renderItem={({ item }) => {
                  return (
                    <Animatable.View
                      key={item}
                      animation="fadeInDown"
                      delay={0.3}
                      useNativeDriver
                    >
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Details", { item })}
                      >
                        <View
                          style={{
                            flexDirection: "colum",
                            alignContent: "center",
                            marginBottom: 40,
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              height: height * 0.3,
                              width: width * 0.41,
                              borderRadius: 15,
                              margin: 20,
                              alignSelf: "center",
                            }}
                          />

                          <LinearGradient
                            colors={[
                              "transparent",
                              "rgba(24, 26, 32, 0.2)",
                              "rgba(24, 26, 32, 1)",
                            ]}
                            style={{
                              width,
                              height: height * 0.3,
                              position: "absolute",
                              bottom: 1,
                              margin: 1,
                            }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                          />
                        </View>

                        <Text
                          numberOfLines={1}
                          style={{
                            color: "white",
                            position: "absolute",
                            bottom: height * 0.05,
                            fontSize: 16,
                            alignSelf: "center",
                          }}
                        >
                          {item.title.length > 15
                            ? item.title.slice(0, 16) + "..."
                            : item.title}
                        </Text>
                        <Text
                          style={{
                            color: "grey",
                            alignSelf: "center",
                            bottom: height * 0.01,
                          }}
                        ></Text>
                      </TouchableOpacity>
                    </Animatable.View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />

              <View style={{ height: height * 0.2, marginTop: height * 0.03 }}>
                <View
                  style={{
                    marginTop: 30,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    numColumns={5}
                    data={paginationArray}
                    renderItem={({ item }) => {
                      return (
                        <View
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              borderRadius: 14,
                              justifyContent: "center",
                              backgroundColor:
                                currentPage === item ? "white" : "#b3b3ff",
                              width: width * 0.12,
                              height: height * 0.06,
                              margin: 10,
                              borderRadius: 14,
                              justifyContent: "center",
                              alignSelf: "center",
                              borderColor: "white",
                              borderWidth: 2,
                            }}
                            onPress={() =>
                              isfromrecentep
                                ? recentgogoanime(item)
                                : fromgogotopair(item)
                            }
                          >
                            <View>
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 16,
                                  fontWeight: "700",
                                }}
                              >
                                {item}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: "white",
                  fontSize: 14,
                  alignSelf: "center",
                }}
              >
                Scroll Number buttons for more page
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Gaga;
