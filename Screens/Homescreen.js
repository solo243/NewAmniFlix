import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Button,
  FlatList,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import React, { useEffect, useState, useRef, useCallback } from "react";
// for all apis
// for all icons in code
import AsyncStorage from "@react-native-async-storage/async-storage";

// import all loding from
import { ManinscreenTop, Trendinglo } from "../Loidngfile/loding";
import { app } from "../config";
// import fonts from out sides

import { useFonts } from "expo-font";
import { Octicons } from "@expo/vector-icons";

// get device all width and height
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// import gogo anime apis

// starting of the code execution
import { getDatabase, ref, set, onValue } from "firebase/database";

import GenreBlock from "../component/GenreBlock";
import UpdateBlock from "../component/UpdateBlock";
import HeroSlider from "../component/HeroSlider";
import FlatListView from "../component/FlatListView";
import ModifyFlatlist from "../component/ModifyFlatlist";
import { fetchgogorecent, gogotopair } from "../API/gogo";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const Homescreen = ({ navigation }) => {
  //TODO:  main use effect

  const [loaded] = useFonts({
    // font: require('../assets/fonts/Montserrat-Regular.ttf'),
    ll: require("../assets/fonts/Inter-Regular.ttf"),
  });

  // if(!loaded) {
  //   return null
  // }

  const openDrawer = () => {
    navigation.openDrawer(); // Call openDrawer to open the drawer
  };

  useEffect(() => {
    verstioncheck();
    UpdateCheck();
    gandu();
    GetVerstion();
  }, []);

  //TODO: loding check
  const [loding, setloding] = useState(true);
  const [gogorecent, setgogorecent] = useState([]);

  const [IsMatch, SetIsMatch] = useState(true);
  const verstioncheck = async () => {
    await AsyncStorage.setItem("current", "0.1.0");
  };

  const GetVerstion = async () => {
    const ff = await AsyncStorage.getItem("current");
    return ff;
  };

  const UpdateCheck = async () => {
    const db = getDatabase(app);
    try {
      const VerstionRef = ref(db, "/app_id");
      const postersRef = ref(db, "/posters/poster1");
      onValue(postersRef, async (posterSnapshot) => {
        const posterdata = posterSnapshot.val();
        setposter1(posterdata.immg);
      });
      onValue(VerstionRef, async (VerstionSnapshot) => {
        const VerstionData = VerstionSnapshot.val();
        const tt = await GetVerstion();
        mm = VerstionData.AppId === tt;
        // console.log(mm);
        SetIsMatch(mm);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // all loding stats are here

  const [poster1, setposter1] = useState();

  //TODO: getting a recent anime ep from api

  const db = getDatabase(app);
  const [gogo, setgogo] = useState([]);
  const [actionData, setactionData] = useState([]);
  const [movieData, setmovieData] = useState([]);
  const [romanceData, setromanceData] = useState([]);

  const [gogotrending, setgogotrending] = useState([]);
  const [trendingloading, settrendingloading] = useState(true);
  const [mloading, setmloading] = useState(true);
  const [acationloading, setactionloading] = useState(true);
  const [thrillerloading, setthrillerloading] = useState(true);
  const [romanceloadind, setromnceloading] = useState(true);
  // getting data from firebase
  const gandu = async () => {
    try {
      // db refrance for database
      const thrillerRef = ref(db, "/results/thriller");
      const actionRef = ref(db, "/results/action");
      const moviesRef = ref(db, "/results/movies");
      const romanticRef = ref(db, "/results/romantic");

      onValue(thrillerRef, async (thrillerSnapshot) => {
        const thrillerData = thrillerSnapshot.val();
        onValue(actionRef, async (actionSnapshot) => {
          const actionData = actionSnapshot.val();
          onValue(moviesRef, async (moviesSnapshot) => {
            const movieData = moviesSnapshot.val();
            onValue(romanticRef, async (romanticSnapshot) => {
              const romanceData = romanticSnapshot.val();

              if (
                isvaliddata(thrillerData) &&
                isvaliddata(actionData) &&
                isvaliddata(movieData) &&
                isvaliddata(romanceData)
              ) {
                //  getting the thriller anime
                setgogo(thrillerData);
                setthrillerloading(false);
                // console.log( thrillerData);

                // getting the action anime
                setactionData(actionData);
                setactionloading(false);
                // console.log( actionData);

                setmovieData(movieData);
                setmloading(false);
                // console.log(movieData)

                setromanceData(romanceData);
                setromnceloading(false);
                // console.log(movieData)
              } else {
                console.log("Fetching data again...");
                await gandu();
              }
            });
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trendinganime(1);

    RecentAnime("1");
  }, []);

  // TODO: This is for Trending anime Fetch
  const trendinganime = async (page) => {
    settrendingloading(true);
    // let rr = await cosmetTrending(page);
    let rr = await gogotopair(page);
    console.log(rr);
    let hh = rr;
    setgogotrending(hh.response?.jsonDoc?.results);
    settrendingloading(false);
  };

  // TODO: This is For Recent Anime Section
  const [recentdata, setrecentdata] = useState([]);
  const [recentload, setrecentload] = useState(true);
  const RecentAnime = async (page) => {
    const hh = await fetchgogorecent(page);
    setrecentload(true);
    setrecentdata(hh.response?.jsonDoc?.results);
    setrecentload(false);
  };

  const isvaliddata = (data) => {
    return Array.isArray(data) && data.length > 0;
  };

  //FIXME:  array of the 10 for bottom page button
  // const paginationArray = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar showHideTransition={false} />
      {/* <View style={{ flex: 1, backgroundColor: "#1c2639" }}> */}
      <View style={{ flex: 1, backgroundColor: "#101720" }}>
        {!IsMatch ? (
          // callinng Update Block fromthe Componennt
          <View style={{ height: height, backgroundColor: "white" }}>
            <UpdateBlock />
          </View>
        ) : null}
        <View
          style={{
            backgroundColor: "#101720",
            // backgroundColor: '#1c2639',
            height: height * 0.07,
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 23,
            paddingLeft: 23,
            flexDirection: "row",
          }}
        >
          <View>
            {/* <View style={{}}> */}
            {/* TODO: hamberger menu icon at the top  */}
            <TouchableOpacity
              onPress={() => openDrawer()}
              style={{
                width: 30,
                alignSelf: "center",
              }}
            >
              <Octicons name="three-bars" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            {/*TODO: main AmnFlix header at the top  */}
            <Text
              style={{
                fontSize: RFValue(27),
                color: "white",
                textAlign: "center",
                alignSelf: "center",
                fontWeight: "400",
                fontFamily: "ll",
              }}
            >
              Amni
            </Text>
            <Text
              style={{
                fontSize: RFValue(27),
                color: "red",
                textAlign: "center",
                alignSelf: "center",
                fontWeight: "400",
                fontFamily: "ll",
              }}
            >
              Flix
            </Text>
          </View>
          <View>
            {/* TODO: serach icon at the top  */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
              style={{
                // left: width * 0.85,
                alignSelf: "center",
              }}
            >
              <Octicons name="search" size={25} color="white" />
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>

        {/* this is for slider drawer  */}

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <View>
            <View>
              <View style={{ marginTop: height * 0.001 }}>
                {/* check the main homescreen slider  */}
                {trendingloading ? (
                  <View>
                    <ManinscreenTop />
                  </View>
                ) : (
                  <View>
                    <HeroSlider navigation={navigation} data={gogotrending} />
                  </View>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    width: width,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SeeAll", {
                      cate: "Trending",
                      genra: "Trending",
                    })
                  }
                  style={{
                    width: width * 0.3,
                    height: 25,
                    alignSelf: "center",
                    top: height * 0.01,
                  }}
                >
                  <Text
                    style={{
                      color: "#41a5f3",
                      textAlign: "center",
                    }}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* TODO: Recent anime BLock  */}
            </View>

            <GenreBlock genra={"Recent"} navigation={navigation} />
            <View>
              {recentload ? (
                <Trendinglo />
              ) : (
                <FlatList
                  data={recentdata}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <FlatListView item={item} navigation={navigation} />
                  )}
                />
              )}
            </View>

            {/* TODO: Popular Movie List  */}
            <GenreBlock
              genra={"Popular Movie"}
              seealldata={"Movie"}
              // data={Moviesdata}
              navigation={navigation}
            />
            <View>
              {mloading ? (
                <Trendinglo />
              ) : (
                <FlatList
                  data={movieData}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <FlatListView item={item} navigation={navigation} />
                  )}
                />
              )}
            </View>

            <View>
              <Image
                source={{ uri: poster1 }}
                style={{
                  height: responsiveHeight(25),
                  width: responsiveWidth(94),
                  resizeMode: "cover",
                  borderRadius: 10,
                  marginTop: 35,
                  marginBottom: 30,
                  alignSelf: "center",
                }}
              />
            </View>

            {/* TODO: Action Anime lisr */}
            <GenreBlock
              genra={"Action"}
              // data={Actiondata}
              seealldata={"Action"}
              navigation={navigation}
            />
            <View>
              {acationloading ? (
                <Trendinglo />
              ) : (
                <FlatList
                  data={actionData}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <FlatListView item={item} navigation={navigation} />
                  )}
                />
              )}
            </View>

            {/* TODO: Romace ANime List  */}
            <View>
              <GenreBlock
                genra={"Romance"}
                seealldata={"Romance"}
                navigation={navigation}
              />
              <View>
                {romanceloadind ? (
                  <Trendinglo />
                ) : (
                  <FlatList
                    data={romanceData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <ModifyFlatlist item={item} navigation={navigation} />
                    )}
                  />
                )}
              </View>
            </View>

            <View>
              <GenreBlock
                genra={"Thriller"}
                seealldata={"Horror"}
                navigation={navigation}
              />
              <View>
                {thrillerloading ? (
                  <Trendinglo />
                ) : (
                  <FlatList
                    data={gogo}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <FlatListView item={item} navigation={navigation} />
                    )}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Homescreen;
