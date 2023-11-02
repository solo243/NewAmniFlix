import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { randomstickers } from "../Loidngfile/loding";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const CatScreen = ({ route, navigation }) => {
  const paginationArray = Array.from({ length: 50 }, (_, index) => index + 1);

  const rt = route.params;
  const mmk = rt?.cate;
  const gen = rt?.genra;
  console.log(mmk);
  const [isTrending, setisTrending] = useState(false);

  const randomimg = randomstickers();
  const [data, setdata] = useState([]);
  const [gogoload, setgogoload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // const MovieFetch = async (page) => {
  //   setgogoload(true);
  //   const call = await cosmetMovie(page);
  //   setdata(call.results);
  //   setgogoload(false);
  // };

  useEffect(() => {
    if (mmk === "Movie") {
      // setisMovie(true);
      FetchMovie(1);
    } else if (mmk === "Trending") {
      FetchTrending(1);
    } else {
      FetchData(1);
    }
  }, [mmk]);

  useEffect(() => {
    // FetchData(1);
  }, []);

  const FetchData = async (item) => {
    setgogoload(true);
    let call = await cosmetGenra(mmk, item);
    setdata(call.results);
    setgogoload(false);
  };

  const FetchMovie = async (item) => {
    setgogoload(true);
    const call = await cosmetMovie(item);
    setdata(call.results);
    setgogoload(false);
  };

  const FetchTrending = async (item) => {
    setgogoload(true);
    const call = await cosmetTrending(item);
    setdata(call.results);
    setgogoload(false);
  };

  const tt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <SafeAreaView style={{ backgroundColor: "#101720" }}>
      <View style={{ backgroundColor: "#101720" }}>
        <View
          style={{
            backgroundColor: "#101720",
            justifyContent: "center",
            height: height * 0.07,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: height * 0.03,
              textAlign: "center",
            }}
          >
            {gen} Anime
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
          //
          <View style={{ marginTop: -20 }}>
            {/* <FlatList
              data={data}
              numColumns={2}
              renderItem={({ item }) => {
                return (
                  <Animatable.View
                    key={item}
                    animation="fadeInDown"
                    delay={0.3}'
                    style={{ backgroundColor: "#101720" }}
                    useNativeDriver
                  >
                    {/* {console.warn(item)} */}
            {/* <TouchableOpacity
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
                        /> */}
            {/* <LinearGradient
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
                        
                        /> */}
            {/* </View>

                      <Text
                        numberOfLines={1}
                        style={{
                          color: "white",
                          position: "absolute",
                          bottom: height * 0.075,
                          fontSize: 16,
                          // backgroundColor: 'red',
                          alignContent: "center",
                          textAlign: "center",
                          width: width * 0.36,
                          alignSelf: "center",
                        }}
                      >
                        {item.title.english || item.title.romaji}
                      </Text>
                      <Text
                        style={{
                          color: "grey",
                          alignSelf: "center",
                          bottom: height * 0.025,
                        }}
                      >
                        {item.type} - Rating - {item.rating}
                      </Text>
                      <Text
                        style={{
                          color: "grey",
                          alignSelf: "center",
                          bottom: height * 0.03,
                        }}
                      ></Text>
                    </TouchableOpacity>
                  </Animatable.View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            /> */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* {console.log(width,height)} */}
              {data.map((item, index) => {
                return (
                  <View
                    style={{
                      height: height < 870 ? 300 : 500,
                      width: width < 430 ? 170 : 200,
                      maxHeight: 300,
                      minHeight: 150,
                      margin: 7,
                      // backgroundColor: 'red',
                      marginBottom: 20, // alignSelf: "center",
                    }}
                    key={index}
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
                            // height: height * 0.3,
                            // width: width * 0.41,
                            // width: 170,
                            backgroundColor: "grey",
                            width: width < 430 ? 160 : 170,
                            height: 250,
                            borderRadius: 15,
                            margin: 20,
                            alignSelf: "center",
                          }}
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            color: "white",
                            position: "absolute",
                            bottom: 10,
                            fontSize: 16,
                            alignContent: "center",
                            textAlign: "center",
                            width: 150,
                            alignSelf: "center",
                          }}
                        >
                          {item.title.english || item.title.romaji}
                        </Text>
                        <Text
                          style={{
                            color: "grey",
                            alignSelf: "center",
                            bottom: -10,
                          }}
                        >
                          {item.type} - Rating - {item.rating}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

<View style={{marginTop: 20}}/>
            <View style={{ height: height * 0.2 }}>
              <View
                style={{
                  marginTop: 40,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <ScrollView>
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
                            onPress={() => {
                              if (mmk === "Movie") {
                                FetchMovie(item);
                                setCurrentPage(item);
                              } else if (mmk === "Trending") {
                                FetchTrending(item);
                                setCurrentPage(item);
                              } else {
                                FetchData(item);
                                setCurrentPage(item);
                              }
                            }}
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
                </ScrollView>
              </View>
            </View>
            <Text
              style={{
                marginTop: 20,
                color: "white",
                fontSize: 14,
                alignSelf: "center",
              }}
            >
              Scroll Number buttons for more page
            </Text>
          </View>
        )}
        <View style={{marginTop: 90}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CatScreen;
