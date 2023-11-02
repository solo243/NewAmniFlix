import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addVisibilityListener } from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Savescreen = ({ navigation }) => {
  useEffect(() => {
    GetAllItem();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      GetAllItem();
    }, [])
  );

  
  const [RealData, SetRealData] = useState();
  const GetAllItem = async () => {
    const hh = await AsyncStorage.getItem("idforsave");
    const mm = JSON.parse(hh);
    console.log(mm);
    SetRealData(mm);
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#181a20" }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            {/* {
              RealData.length > 0 
          
                 */}
            
            <View
              style={{
                backgroundColor: "#181a20",
                height: height * 0.09,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Main")}
                style={{
                  height: height * 0.09,
                  // backgroundColor: "red",
                  position: "absolute",
                  width: width * 0.15,
                  marginStart: 20,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="arrow-back-sharp" size={35} color="white" />
              </TouchableOpacity>
              <Text
                style={{ color: "white", fontSize: 30, alignSelf: "center" }}
              >
                Save
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                style={{
                  height: height * 0.09,
                  // backgroundColor: "red",
                  position: "absolute",
                  width: width * 0.15,
                  end: -20,
                  justifyContent: "center",
                }}
              >
                <Octicons name="search" size={25} color="white" />
              </TouchableOpacity>
            </View>

           
          
           <View>
              <FlatList
                numColumns={2}
                data={RealData}
                renderItem={({ item }) => {
                  return (
                    <View style={{ justifyContent: "center" }}>
                      <View
                        style={{
                          backgroundColor: "#12181c",
                          height: height * 0.34,
                          width: width * 0.42,
                          alignSelf: "center",
                          margin: 16,
                          borderRadius: 15,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Details", { item })
                          }
                        >

                          {item.img ? 
                        (  <Image
                            source={{ uri: item.img }}
                            style={{
                              height: height * 0.26,
                              width: width * 0.36,
                              resizeMode: "cover",
                              alignSelf: "center",
                              borderRadius: 10,
                              marginTop: 10,
                            }}
                          /> )
                          :(
                            <Image
                            source={require('../assets/bgk.png')}
                            style={{
                              height: height * 0.08,
                              width: width * 0.36,
                              resizeMode: "cover",
                              alignSelf: "center",
                              borderRadius: 10,
                              marginTop: 60,
                            }}
                          />
                          )}
                         
                        </TouchableOpacity>
                        <View
                            style={{
                              height: "18%",
                              width: "80%",
                              alignSelf: "center",
                              position: 'absolute',
                              bottom: 6
                            }}
                          >
                            <Text
                              numberOfLines={2}
                              style={{
                                color: "white",
                              
                                fontSize: 16,
                                marginTop: 7,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                      </View>
                    </View>
                  );
                }}
              />
              </View>
        
          </View>
         
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Savescreen;
