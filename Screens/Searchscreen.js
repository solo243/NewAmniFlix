import {
  View,
  Text,
  Dimensions,
  Button,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import debounce from "lodash.debounce";
import * as Animatable from "react-native-animatable";
import { RFValue } from "react-native-responsive-fontsize";

export default function Searchscreen({ navigation }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [result, setresults] = useState([]);
  const [searchquery, setsearchquery] = useState("");
  const [gaga, setgaga] = useState(true);
  const token = `5zX/2VXijNuKmwQIwaM2mTxLIUcrMw/l8djfBMZyBOklB5bXVUH6+fd+qV8hA0QG0cMfuZKeddg0zztf2o72KCfkU3U+npM8xcBKwFSXdFXMDvzqQ8xx+XlowQzNckqUkm1lHkFdjVQNX5F4NZWaw7JLXVZ9H0aJwWUd1eZYc16gJh//13Pc8m2ehclKNgJJHowWueAFCxxFMOvnXS6T+rwknoJPx0nrLE0+Q23Sis/c6ftZOn8kR3a9SvfoNPk5KoTXO+i0BQWS9zhkF3cbKT8Q8jr7YWZ5NgpnKm6k1ViaY1XiIZsV2Y4+v7Ap4odpnxStaPIqaLEAuIR0oNqO7D29edXPTQA2t8CB4gFeMavzw5LPJdS55TqZY1fvjatKuiqnnnPzuQI4li1NVyQ1ztMiQIMklnDw2nZ7zGle0KDbJDXCuLg8RAWYq3a3yJNhbAbMnE93chHmGiv6pjEVzDXJ80PAn0DICosk/Y1SaaKlmOcwB6g4DX+PLhXVu2SfdgCQqd4o4cK1cDQBgyw8/Q==`;

  const handletext = async (value) => {
    setgaga(true);
    setsearchquery(value);

    const url = `https://cloud.syncloop.com/tenant/borrorw/packages.user.wrapper.api.SearchAnime.main?search=${searchquery}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setresults(data.response?.jsonDoc?.results);
    setgaga(false);

    // console.log(data);
  };

  // const searchanime = async () => {
  //   const url = `https://api.consumet.org/anime/gogoanime/${searchquery}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setresults(data.results);
  //   // console.log(data);
  // };

  // const handledeboundce = useCallback(debounce(handletext, 400), []);
  // const handleSearchsubmit = async () => {
  //   const data = await searchanime();
  //   setresults(data || []);
  // };

  // const handletext = useCallback(debounce(handleSearch, 400), []);

  return (
    <View
      style={{
        backgroundColor: "#181a20",
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            height: height * 0.076,
            marginTop: height * 0.04,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <TextInput
            value={searchquery}
            onChangeText={handletext}
            placeholder=" Search"
            placeholderTextColor={"lightgray"}
            style={{
              backgroundColor: "grey",
              height: "90%",
              width: width * 0.9,
              alignSelf: "center",
              borderRadius: width * 0.04,
              paddingStart: width * 0.14,
              fontSize: 18,
              color: "white",
            }}
          />
          <Octicons
            name="search"
            size={25}
            color="white"
            style={{
              alignSelf: "center",
              position: "absolute",
              marginStart: 20,
            }}
          />
        </View>
        <Text
          style={{
            marginStart: width * 0.09,
            marginTop: height * 0.01,
            color: "#b3b3ff",
            fontSize: 17,
          }}
        >
          
        </Text>
        {/* <Button title="Search" onPress={handleSearchsubmit} /> */}

        <View>
          {gaga ? (
            <View style={{ height: height * 0.5 }}>
              <Image
                source={{
                  uri: "https://media.tenor.com/jcJez4GsTGsAAAAi/ore-no-imouto-ga-konna-ni-kawaii-wake-ga-nai-ruri-gokou.gif",
                }}
                style={{
                  // height: height * 0.2,
                  height: 200,
                  // width: width * 0.4,
                  width: 200,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
            </View>
          ) : (
            <View>
              {result.map((item, index) => {
                return (
                  <Animatable.View
                    animation="fadeInUp"
                    useNativeDriver
                    key={item}
                    delay={2}
                  >
                    <View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Details", { item })}
                      >
                        <View
                          style={{
                            backgroundColor: "#101720",
                            // backgroundColor:  item.color,
                            marginBottom: 20,
                            width: width * 0.96,
                            alignSelf: "center",
                            marginTop: 10,
                            borderRadius: 13,
                            height: height * 0.32,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              height: height * 0.27,
                              width: width * 0.36,
                              marginStart: width * 0.07,
                              borderRadius: height * 0.02,
                            }}
                          />
                          <View
                            style={{
                              position: "absolute",
                              top: height * 0.04,
                              // backgroundColor: "red",
                              left: width * 0.49,
                              height: height * 0.1,
                              width: width * 0.45,
                            }}
                          >
                            <Text
                              numberOfLines={2}
                              style={{
                                color: "white",
                                fontSize: RFValue(17),
                              }}
                            >
                              {item.title}
                            </Text>
                            <View
                              style={{
                                backgroundColor: "grey",
                                height: 1,
                                marginTop: height * 0.02,
                              }}
                            />
                            <Text
                              style={{
                                color: "white",
                                fontSize: 17,
                                marginTop: height * 0.01,
                                marginBottom: height * 0.01,
                              }}
                            >
                              {item.releaseDate || "NA"}
                            </Text>

                            <Text
                              numberOfLines={3}
                              style={{
                                color: "grey",
                                fontSize: 17,
                                marginTop: height * 0.01,
                              }}
                            >
                              Sub / Dub - {item.subOrDub}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </Animatable.View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
