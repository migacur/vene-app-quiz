import React from "react";
import { StyleSheet, View } from "react-native";
import SoccerIcon from "../Icons/Home/SoccerIcon";
import GpsIcon from "../Icons/Home/GpsIcon";
import MovieIcon from "../Icons/Home/MovieIcon";
import ArtIcon from "../Icons/Home/ArtIcon";
import ScienceIcon from "../Icons/Home/ScienceIcon";
import MusicIcon from "../Icons/Home/MusicIcon";

const HomeBar = () => {
  return (
    <View style={styles.listado}>
      <GpsIcon />
      <ArtIcon />
      <ScienceIcon />
      <MusicIcon />
      <MovieIcon />
      <SoccerIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  listado: {
    backgroundColor: "#0030AD",
    paddingVertical: 12,
    borderBottomWidth: 5,
    borderBottomColor: "#F7D210",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default HomeBar;
