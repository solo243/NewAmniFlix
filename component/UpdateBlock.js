import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

// get device all width and height
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const UpdateBlock = () => {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginTop: "50%",
        }}
      >
        <View
          style={{
            // height: height * 0.44,
            height: height * 0.35,
            borderRadius: 15,
            borderColor: "white",
            borderWidth: 1,
            width: width * 0.6,
            backgroundColor: "#181a20",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              marginTop: 30,
              width: width * 0.5,
              fontSize: 15,
              alignSelf: "center",
            }}
          >
            ! Update is available. To enjoy our latest features, enhanced
            security, and a smoother experience, please update your app.
            {"\n"}
            {"\n"} Thank you,{"\n"}
            AmniFlix Team
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://houseofhopes.itch.io/amniflix")
            }
            style={{
              backgroundColor: "#b3b3ff",
              height: height * 0.06,
              width: width * 0.5,
              alignSelf: "center",
              position: "absolute",
              // bottom: 94,
              bottom: 30,
              borderRadius: 30,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 19,
                fontWeight: "600",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdateBlock;
