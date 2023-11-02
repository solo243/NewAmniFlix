import { View, Text, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { NewsFetch } from "../../API/gogo";
import { randomstickers } from "../../Loidngfile/loding";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Main = ({ navigation }) => {
  useEffect(() => {
    FetchNews();
  }, []);
  const [data, setdata] = useState([]);
  const [loading, setload] = useState(true);
  const FetchNews = async () => {
    setload(true);
    const jj = await NewsFetch();
    setdata(jj?.response?.jsonDoc);
    console.log(data);
    setload(false);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#1c2639" }}>
      <View
        style={{
          backgroundColor: "#101720",
          height: height * 0.07,
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
          paddingLeft: 20,
          flexDirection: "row",
        }}
      >
        <View>
          {/* TODO: hamberger menu icon at the top  */}
          <TouchableOpacity
            onPress={() => openDrawer()}
            style={{
              width: 40,
              alignSelf: "center",
            }}
          >
            <Octicons name="three-bars" size={28} color="white" />
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
              paddingRight: 25,
              fontWeight: "400",
            }}
          >
            News
          </Text>
        </View>
        <View></View>
      </View>

      <View>
        {loading ? (
          <View style={{ height: "90%", justifyContent: "center" }}>
            <Image
              source={{ uri: randomstickers() }}
              style={{
                alignSelf: "center",
                resizeMode: "contain",
                height: responsiveHeight(50),
                width: responsiveWidth(50),
              }}
            />
          </View>
        ) : (
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flexWrap: "wrap",
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate("NDetail", { item })}
                    >
                      <View
                        style={{
                          height: responsiveHeight(42),
                          width: responsiveWidth(95),
                          margin: 10,
                          borderRadius: 10,
                          backgroundColor: "#101720",
                        }}
                      >
                        <Image
                          source={{ uri: item.thumbnail }}
                          style={{
                            height: responsiveHeight(25),
                            width: responsiveWidth(95),
                            resizeMode: "contain",
                          }}
                        />

                        <View
                          style={{
                            width: "96%",
                            backgroundColor: "#1c2639",
                            alignSelf: "center",
                            borderRadius: 10,
                            height: responsiveHeight(14),
                            justifyContent: "center",
                            paddingStart: 10,
                            paddingEnd: 10,
                            marginTop: 10,
                          }}
                        >
                          <Text
                            numberOfLines={2}
                            style={{ fontSize: RFValue(15), color: "white" }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            numberOfLines={3}
                            style={{ color: "grey", marginTop: 10 }}
                          >
                            {item.preview.full}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Main;
