import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/header.jpg")}
      style={styles.background}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.title}>Venezuela</Text>
          <Text style={styles.subtitle}>Quiz!</Text>
          <Image
            source={require("../../assets/images/bandera.webp")}
            style={styles.flag}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 225,
  },
  background: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#F7D210",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "#404040",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    position: "absolute",
    zIndex: 2,
    opacity: 0.78,
  },
  subtitle: {
    fontSize: 23,
    marginLeft: 5,
    fontWeight: "bold",
    color: "#fff",
    opacity: 0.75,
    top: 27,
    left: 59,
    zIndex: 5,
  },
  logo: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  flag: {
    width: 184,
    height: 90,
    borderRadius: 8,
    position: "absolute",
    left: -60,
    opacity: 0.6,
  },
});

export default Header;
