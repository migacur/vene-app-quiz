import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonStart from "./ButtonStart";
import Header from "../Header/Header";
import HomeBar from "./HomeBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Home = () => {
  const [puntos, mostrarPuntos] = useState<number>();
  const [preguntas, maxPreguntas] = useState<number>();
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    if (isFocused) {
      obtenerPuntuacion();
      obtenerMaxPreguntas();
    }
  }, [route.name, isFocused]);

  const obtenerPuntuacion = async () => {
    try {
      const valor = await AsyncStorage.getItem("@max_puntuacion");
      console.log(`Cargando puntos...${valor}`);
      return valor != null ? mostrarPuntos(parseInt(valor, 10)) : null;
    } catch (error) {
      console.error("Error al recuperar el número", error);
    }
  };

  const obtenerMaxPreguntas = async () => {
    try {
      const valor = await AsyncStorage.getItem("@max_preguntas");
      console.log(`Cargando preguntas max...${valor}`);
      return valor != null ? maxPreguntas(parseInt(valor, 10)) : null;
    } catch (error) {
      console.error("Error al recuperar el número", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <HomeBar />
      <View style={styles.contenido}>
        <Text style={styles.descripcion}>
          Responde preguntas aleatorias relacionadas en su mayoría a Venezuela,
          podrás ayudarte de comodines y tendrás{" "}
          <Text style={styles.marcar}>20 segundos</Text> para responder cada una
          de ellas, <Text style={styles.marcar}>¡a jugar!</Text>
        </Text>
      </View>
      {puntos && preguntas && (
        <>
          <View style={styles.score_box}>
            <Text style={styles.best_score}>Mejor Puntuación</Text>
            <Text style={styles.points}> {puntos} </Text>
          </View>
          <View style={styles.score_box}>
            <Text style={styles.best_score}>Récord de preguntas</Text>
            <Text style={styles.points}> {preguntas} </Text>
          </View>
        </>
      )}
      <ButtonStart />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#620011",
  },
  contenido: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  descripcion: {
    color: "#fff",
    fontSize: 19.5,
    textAlign: "center",
  },
  marcar: {
    color: "#F7D210",
  },
  score_box: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#50020f",
  },
  best_score: {
    color: "#F7D210",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
    textAlign: "center",
  },
  points: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Home;
