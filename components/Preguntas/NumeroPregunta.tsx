import { controlLongSound } from "@/helpers/audioConfig";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

type Prop = {
  numero: number;
  recompensa:number
};

const NumeroPregunta = ({ numero,recompensa }: Prop): React.JSX.Element => {
  useEffect(() => {
    if(recompensa !== 5){
  const replayAudio = async () => {
          await controlLongSound("replay");
        };
        replayAudio()
    }
   
  }, [numero]);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pregunta N.º{numero}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: "#0030AD",
  },
  texto: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#0030AD",
    fontSize: 23,
    textTransform: "uppercase",
  },
});

export default NumeroPregunta;
