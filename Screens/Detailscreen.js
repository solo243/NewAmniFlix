import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { app } from "../config";
import { getDatabase, ref, onValue } from "firebase/database";
// import * as FileSystem from 'expo-file-system';
import { FileSystem } from "expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";

// icons for project
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";

// api calls
// import { fetchwatch } from "../API/api";

import { randomstickers } from "../Loidngfile/loding";
import Modal from "react-native-modal";
import NewENV from "../NewENV";
import { gogoinfo } from "../API/gogo";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { AntDesign } from "@expo/vector-icons";

const Detailscreen = ({ route, navigation }) => {
  const selected = route.params.item;
  const ani = selected.id;
  

  const randomimg = randomstickers();

  const isfocus = useIsFocused();

  const [saftyload, setsafetyload] = useState(true);
  useEffect(() => {
    if (!focus) {
      seteps([]);
    }
    GetAllaSave();

    if (isfocus) {
      // getanimeinfo(ani);
      fetchData(ani);
    } else {
      console.log("do nothing ");
      isfocus ? null : setclickdata([]);
    }
  }, [ani]);

  let focus = useIsFocused();

  const [eps, seteps] = useState([]);
  // const getanimeinfo = async (ani) => {
  //   const url = `https://cloud.syncloop.com/tenant/borrorw/packages.user.wrapper.api.Cosmet.main?id=${ani}`;
  //   console.log(url);
  //   setloding(false);
  //   const ii = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer 5zX/2VXijNuKmwQIwaM2mTxLIUcrMw/l8djfBMZyBOklB5bXVUH6+fd+qV8hA0QG0cMfuZKeddg0zztf2o72KCfkU3U+npM8xcBKwFSXdFXMDvzqQ8xx+XlowQzNckqUkm1lHkFdjVQNX5F4NZWaw7JLXVZ9H0aJwWUd1eZYc16gJh//13Pc8m2ehclKNgJJHowWueAFCxxFMOvnXS6T+rwknoJPx0nrLE0+Q23Sis/c6ftZOn8kR3a9SvfoNPk5KoTXO+i0BQWS9zhkF3cbKT8Q8jr7YWZ5NgpnKm6k1ViaY1XiIZsV2Y4+v7Ap4odpn0Pe6odPVJEVB1g5Sy3j6j29edXPTQA2t8CB4gFeMauzWAxoxxvtVpEyQJ/raxf2uiqnnnPzuQI4li1NVyQ1ztMiQIMklnDw2nZ7zGle0KDCmVa72IoJJcwW8O//tFqUey1iYfTxVhQLVIBxAdxCgMAaEt27KYgMcmMm/7jaB5sU1LOAJfi/J6Qs0/Yj8GX5BC36wkmAbMcswjCu1/NjomJJ25y5FfPdigxVMyRVMVo=`,
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const ll = await ii.json();
  //   console.log(ll);
  //   setdata(ll.response.jsonDoc);
  //   setloding(false);
  //   console.log(data);
  //   seteps(ll.episodes);
  // };
  const [realToken, SetRealToken] = useState([]);

  const fetchData = async (ani) => {
    try {
      let CallForToken = await fetch(
        `https://64cbcf1f2eafdcdc851958af.mockapi.io/api/V1/Movie/token`
      );
      let TokenConvert = await CallForToken.json();
      let FinalToken = await TokenConvert[0].id;

      const response = await fetch(
        `https://cloud.syncloop.com/tenant/borrorw/packages.user.wrapper.api.Cosmet.main?id=${ani}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${FinalToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setdata(data.response.jsonDoc);
      setloding(false);
      seteps(data.response?.jsonDoc?.episodes);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [loding, setloding] = useState(true);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [data, setdata] = useState();

  const [save, setsava] = useState(false);
  const [currentid, setcurrentid] = useState();

  const togglesave = () => {
    setIsSaved(!isSaved);
    isSaved ? removeData() : saveData(dataObject);
  };

  const [isSaved, setIsSaved] = useState(false);

  const [ff, setFf] = useState();

  const GetAllaSave = async () => {
    try {
      const newgg = await AsyncStorage.getItem("idforsave");
      if (newgg) {
        // setFf(JSON.parse(newgg));
        const dataArray = JSON.parse(newgg);
        const isSaved = dataArray.some((item) => item.id === ani);

        setIsSaved(isSaved);
      } else {
        console.log("No saved IDs found.");
        setIsSaved(false);
        setFf([]);
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const dataObject = {
    id: ani,
    title: selected.title,
    img: selected.image,
  };

  // console.log(dataObject);

  const saveData = async (data) => {
    try {
      const existingData = await AsyncStorage.getItem("idforsave");
      const parsedData = existingData ? JSON.parse(existingData) : [];

      parsedData.unshift(data);

      await AsyncStorage.setItem("idforsave", JSON.stringify(parsedData));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const removeData = async () => {
    const storedData = await AsyncStorage.getItem("idforsave");
    if (storedData) {
      const dataArray = JSON.parse(storedData);

      const filteredDataArray = dataArray.filter((item) => item.id !== ani);

      await AsyncStorage.setItem(
        "idforsave",
        JSON.stringify(filteredDataArray)
      );
    } else {
      console.log("No data found in AsyncStorage.");
    }
  };

  //   handle press to go another screen
  const handlepress = (item) => {
    setloding(true);
    navigation.navigate("Details", { item });
  };

  const [expendindex, setexpendindex] = useState(-1);
  const [clickdata, setclickdata] = useState([]);
  const [loadfetch, setloadfetch] = useState(true);

  const showqmodel = async (index, item) => {
    setexpendindex(expendindex === index ? -1 : index);
    console.log(ani);
    setloadfetch(true);
    // Fetch data only when expanding a different item
    let ff = await fetch(
      `https://cosmet.vercel.app/anime/gogoanime/watch/${item.id}`
    );
    let gg = await ff.json();
    let mm = gg;

    setclickdata(mm);
    setloadfetch(false);
  };

  const [reverseload, setreverceload] = useState(false);
  const reversecallFilter = () => {
    setreverceload(true);
    const reversedEps = eps.slice().reverse();
    seteps(reversedEps);
    setreverceload(false);
  };

  const [savedItems, setSavedItems] = useState([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {loding && saftyload ? (
          <View
            style={{
              height: height,
              width: width,
              flex: 1,
              justifyContent: "center",
              backgroundColor: "#181a20",
            }}
          >
            <Image
              source={{
                uri: randomimg,
              }}
              style={{
                height: height * 0.25,
                width: width * 0.48,
                alignSelf: "center",
                resizeMode: "cover",
                marginBottom: height * 0.15,
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
                }}
              >
                Loding .....
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ backgroundColor: "rgba(24, 26, 32, 1)" }}>
            {/* horizontal bar for back and search */}

            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: data.image }}
                style={{
                  // height: height * 0.6,
                  height: 550,
                  maxHeight: 550,
                  width: width * 1,
                  opacity: 0.3,
                  marginTop: 0,
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
                  height: height * 0.5,
                  position: "absolute",
                  bottom: 0,
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <Animatable.View
                key={data.image}
                animation="fadeInDown"
                useNativeDriver
                delay={1}
                style={{
                  position: "absolute",
                  alignSelf: "center",
                }}
              >
                <Image
                  source={{ uri: data.image }}
                  style={{
                    // width: width * 0.5,
                    // height: height * 0.4,
                    // width: 220,
                    width: width,
                    maxWidth: 220,
                    minWidth: 180,

                    height: 350,
                    maxHeight: 400,
                    minHeight: 200,
                    position: "absolute",
                    alignSelf: "center",
                    borderRadius: 15,
                    marginTop: 40,
                    borderColor: "black",
                    borderWidth: 0,
                  }}
                />
              </Animatable.View>
              <View
                style={{
                  backgroundColor: "#b3b3ff",
                  // height: height * 0.05,
                  height: 45,
                  // width: width * 0.1,
                  width: 45,
                  borderRadius: 10,
                  marginStart: width * 0.03,
                  justifyContent: "center",
                  position: "absolute",
                  marginTop: height * 0.02,
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
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
                  height: height * 0.05,
                  width: width * 0.1,
                  borderRadius: 13,
                  marginStart: width * 0.85,
                  justifyContent: "center",
                  position: "absolute",
                  marginTop: height * 0.02,
                }}
              >
                <TouchableOpacity onPress={togglesave}>
                  {isSaved ? (
                    <Ionicons
                      name="bookmark"
                      size={33}
                      color="white"
                      style={{ left: width * 0.02 }}
                    />
                  ) : (
                    <Ionicons
                      name="bookmark-outline"
                      size={33}
                      color="white"
                      style={{ left: width * 0.02 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ backgroundColor: "#101720" }}>
              <View style={{ height: height * 0.09, width: width * 0.86 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: "white",
                    // fontSize: width*0.07,
                    fontSize: RFValue(26),
                    marginStart: width * 0.06,
                    bottom: height * 0.1,
                  }}
                >
                  {data.title}
                </Text>

                <Text
                  style={{
                    color: "grey",
                    marginStart: width * 0.07,
                    bottom: height * 0.09,
                  }}
                >
                  <AntDesign name="star" size={18} color="yellow" />
                  {"  "}
                  {data.rating} Releasedate - {data.releaseDate + " " || "NA"}{" "}
                  {data.subOrDub}
                </Text>
              </View>
              <Text></Text>
              <Animatable.View
                animation="fadeInRight"
                useNativeDriver
                delay={1}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: RFValue(20),
                    marginStart: width * 0.07,
                    bottom: height * 0.07,
                    marginTop: height * 0.015,
                  }}
                >
                  Description
                </Text>
                <Text
                  numberOfLines={6}
                  style={{
                    color: "white",
                    fontSize: 15,
                    marginStart: width * 0.07,
                    bottom: height * 0.05,
                    width: width * 0.88,
                  }}
                >
                  {data.description || "NA"}
                </Text>
              </Animatable.View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // backgroundColor:'red',
                  start: 30,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: RFValue(22),
                    marginTop: height * 0.03,
                    marginBottom: height * 0.04,
                  }}
                >
                  Watch Episodes
                </Text>

                <TouchableOpacity
                  onPress={() => reversecallFilter()}
                  style={{ flexDirection: "row", paddingEnd: width * 0.086 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      marginEnd: width * 0.03,
                      // paddingEnd: width * 0.1,
                    }}
                  >
                    Reverse
                  </Text>

                  <Ionicons name="filter" size={25} color="white" style={{}} />
                </TouchableOpacity>
              </View>
              <View>
                {data || data.episodes > 0 ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={eps}
                    renderItem={({ item, index }) => {
                      return (
                        <View>
                          <View>
                            <TouchableOpacity
                              onPress={() =>
                                // navigation.navigate("Link", { item, data })
                                showqmodel(index, item)
                              }
                            >
                              <View
                                style={{
                                  height: height * 0.13,
                                  alignSelf: "center",
                                  flexDirection: "row",
                                  borderRadius: 14,
                                  backgroundColor: "#12181c",
                                  marginBottom: 20,
                                  width: width * 0.9,
                                }}
                              >
                                <Image
                                  source={{ uri: data.image }}
                                  style={{
                                    height: height * 0.13,
                                    resizeMode: "cover",
                                    borderRadius: 14,
                                    width: width * 0.42,
                                    opacity: 0.6,
                                  }}
                                />
                                <Ionicons
                                  name="play-sharp"
                                  size={40}
                                  color="white"
                                  style={{
                                    position: "absolute",
                                    alignSelf: "center",
                                    marginStart: "20%",
                                  }}
                                />

                                <View
                                  style={{
                                    width: width * 0.4,
                                    marginStart: width * 0.04,
                                    marginTop: height * 0.02,

                                    height: height * 0.065,
                                  }}
                                >
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      color: "white",
                                      fontSize: 17,
                                      marginTop: height * 0.0,
                                    }}
                                  >
                                    Episode - {item.number || "NA"}
                                  </Text>

                                  {/* <Text
                                    numberOfLines={1}
                                    style={{
                                      color: "white",
                                      fontSize: 13,
                                      color: "grey",
                                      marginTop: height * 0.006,
                                    }}
                                  >
                                    Episodes {item.number}
                                  </Text> */}
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>

                          {expendindex === index && (
                            <Animatable.View useNativeDriver delay={2}>
                              <View
                                style={{
                                  backgroundColor: "#12181c",
                                  marginBottom: 20,
                                  width: width * 0.9,
                                  alignSelf: "center",
                                  borderRadius: 13,
                                  height:
                                    expendindex === index ? height * 0.15 : 0, // Set height based on expanded state
                                  flexDirection: "row",
                                  marginBottom: width * 0.16,
                                  overflow: "hidden", // Hide the content when collapsed
                                }}
                              >
                                <View
                                  style={{
                                    flexWrap: "wrap",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    marginStart: width * 0.036,
                                  }}
                                >
                                  {loadfetch ? (
                                    <View
                                      style={{
                                        justifyContent: "center",
                                        marginStart: width * 0.35,
                                      }}
                                    >
                                      <ActivityIndicator
                                        size={60}
                                        color={"red"}
                                        style={{
                                          justifyContent: "center",
                                          marginTop: 30,
                                          alignSelf: "center ",
                                        }}
                                      />
                                    </View>
                                  ) : (
                                    <FlatList
                                      numColumns={3}
                                      data={clickdata.sources}
                                      renderItem={({ item }) => {
                                        return (
                                          <Animatable.View
                                            animation="fadeInDown"
                                            useNativeDriver
                                            delay={2}
                                          >
                                            <View>
                                              <TouchableOpacity
                                                onPress={() =>
                                                  navigation.navigate(
                                                    "Stream",
                                                    { item }
                                                  )
                                                }
                                              >
                                                <View
                                                  style={{
                                                    backgroundColor: "#b3b3ff",
                                                    height: height * 0.05,
                                                    width: width * 0.23,
                                                    borderRadius: 18,
                                                    margin: 10,
                                                    justifyContent: "center",
                                                  }}
                                                >
                                                  <Text
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    {item.quality}
                                                  </Text>
                                                </View>
                                              </TouchableOpacity>
                                            </View>
                                          </Animatable.View>
                                        );
                                      }}
                                    />
                                  )}
                                </View>

                                {/* Display additional data when expanded */}
                              </View>
                            </Animatable.View>
                          )}
                        </View>
                      );
                    }}
                  />
                ) : (
                  // print data is not availbale print ohk a
                  <View>
                    <Image
                      source={require("../assets/piga.png")}
                      style={{
                        height: height * 0.3,
                        width: width * 0.94,
                        alignSelf: "center",
                        marginTop: height * 0.06,
                      }}
                    />
                  </View>
                )}
              </View>

              <View style={{ height: 100, marginTop: 20 }}>
                {/* <TouchableOpacity onPress={clearAllItems}> */}
                <Text style={{ color: "white", textAlign: "center" }}>
                  Currently Under Development - In Progress
                </Text>
                {/* </TouchableOpacity> */}

                <FlatList
                  data={savedItems}
                  renderItem={({ item }) => {
                    return (
                      <View
                        tyle={{
                          backgroundColor: "black",
                          width: width,
                          height: height,
                        }}
                      >
                        <Text
                          style={{ color: "white", backgroundColor: "black" }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detailscreen;
