import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ModifyFlatlist = ({ navigation, item }) => {
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { item })}
        >
          <Image
            source={{ uri: item.image || item.Image }}
            style={{
              // width: width * 0.43,
              width: 210,
              height: 320,
              maxHeight: 320,
              maxWidth: 210,
              backgroundColor: "grey",
              // height: height * 0.34,
              margin: 9,
              borderRadius: 12,
              resizeMode: "cover",
            }}
          />
          <View
            style={{
              width: width * 0.42,

              alignSelf: "center",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: "white",
                // fontSize: width * 0.031,
                fontSize: RFValue(13),
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
          </View>
          {/* <Text
            style={{
              color: "grey",
              alignSelf: "center",
              marginBottom: 20,
              fontSize: RFValue(13),
            }}
          >
            {item.releaseDate ? item.releaseDate : "NA" } 
           S    {item.subOrDub ? item.subOrDub : "NA"}
          </Text> */}
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10 }} />
    </View>
  );
};

export default ModifyFlatlist;
