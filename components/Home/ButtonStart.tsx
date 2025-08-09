import { playSimpleSound } from "@/helpers/audioConfig";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ButtonStart = () => {
  const navigation = useNavigation();

  const goToRute = async () => {
    await playSimpleSound("click");
    navigation.navigate("TableroScreen" as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goToRute}>
        <Text style={styles.texto}>Jugar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 30,
    width: 180,
    padding: 12,
    backgroundColor: "#0030AD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#F7D210",
  },
  play_icon: {
    width: 30,
    height: 30,
  },
  texto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default ButtonStart;
