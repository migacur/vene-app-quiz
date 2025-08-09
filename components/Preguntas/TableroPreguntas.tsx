import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NumeroPregunta from "./NumeroPregunta";
import { preguntasObj } from "@/data/data";
import { useNavigation } from "@react-navigation/native";
import CargarImagen from "./CargarImagen";
import { sumarPuntos } from "@/helpers/sumarPuntos";
import Comodines from "./Comodines";
import { ComodinesObj, Respuestas } from "@/interface/Respuestas";
import PreguntaCard from "./PreguntaCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Timer from "./Timer";
import { getRandomIndex } from "@/helpers/getNumberRandom";
import Bonus from "./Bonus";
import Bar from "./ChargeBar";
import { controlLongSound, playSimpleSound } from "@/helpers/audioConfig";

const TableroPreguntas = (): React.JSX.Element => {
  const [pregunta, guardarPregunta] = useState<string>("");
  const [respuestas, guardarRespuestas] = useState<Respuestas[]>([]);
  const [imagen, guardarImagen] = useState<string>("");
  const [respuestaCorrecta, guardarRespuestaCorrecta] = useState<any>("");
  const [index, guardarIndex] = useState<null | number>(null);
  const [numeroPreguntas, setNumeroPreguntas] = useState<number>(1);
  const [numAzar, setNumAzar] = useState<number>(2000);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(20);
  const [puntos, setPuntos] = useState<number>(0);
  const [marcarRespuesta, setMarcarRespuesta] = useState<boolean>(false);
  const [mostrarAviso, SetMostrarAviso] = useState<string>("");
  const [time, stopTime] = useState<boolean>(false);
  const [indicesDisponibles, guardarIndicesDisponibles] = useState<number[]>(
    Array.from(Array(preguntasObj.length).keys())
  );
  const [isMaxScore, setIsMaxScore] = useState<number | null>(null);
  const [bonus, setBonus] = useState<boolean>(false);
  const [recompensa, getRecompensa] = useState<number>(0);
  const [comodines, guardarComodines] = useState<ComodinesObj>({
    eliminar: 2,
    cambiar: 2,
    marcar: 2,
    llamar: 2,
    audiencia: 2,
  });
  const navigation = useNavigation();

  const guardarIndices = useCallback(async (array: number[]) => {
    try {
      const jsonValue = JSON.stringify(array);
      await AsyncStorage.setItem("@indices_disponibles", jsonValue);
    } catch (error) {
      console.error("Error al guardar el array", error);
    }
  }, []);

  const crearNuevosIndices = useCallback(() => {
    if (preguntasObj.length > 0) {
      const nuevosIndices = Array.from(Array(preguntasObj.length).keys());
      guardarIndicesDisponibles(nuevosIndices);
      guardarIndices(nuevosIndices);
    }
  }, [preguntasObj, guardarIndices]);

  useEffect(() => {
    let isMounted = true;

    const cargarIndices = async () => {
      const guardados = await AsyncStorage.getItem("@indices_disponibles");

      if (!isMounted) return;

      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (
          Array.isArray(parsed) &&
          parsed.every((i) => typeof i === "number")
        ) {
          guardarIndicesDisponibles(parsed);
        } else {
          crearNuevosIndices();
        }
      } else if (preguntasObj.length > 0) {
        crearNuevosIndices();
      }
    };

    cargarIndices();

    return () => {
      isMounted = false;
    };
  }, [crearNuevosIndices]);

  useEffect(() => {
    if (indicesDisponibles.length > 0) {
      guardarIndices(indicesDisponibles);
    }
  }, [indicesDisponibles, guardarIndices]);

  const eliminarIndiceUsado = useCallback(
    (indice: number) => {
      guardarIndicesDisponibles((prev) => {
        const nuevos = prev.filter((i) => i !== indice);

        if (nuevos.length === 0 && preguntasObj.length > 0) {
          const nuevosIndices = Array.from(Array(preguntasObj.length).keys());
          guardarIndices(nuevosIndices);
          return nuevosIndices;
        }

        return nuevos;
      });
    },
    [preguntasObj, guardarIndices]
  );

  useEffect(() => {
    recompensa === 5 ? setBonus(true) : setBonus(false);

    if (preguntasObj.length > 0 && indicesDisponibles.length > 0) {
      const numeroAleatorio: number = getRandomIndex(indicesDisponibles.length);
      const numero: number = indicesDisponibles[numeroAleatorio];

      setNumAzar(numero);
      eliminarIndiceUsado(numero);
      setSeconds(20);
      stopTime(false);
      marcarRespuesta && setMarcarRespuesta(false);
      guardarIndex(null);
    }

    else if (preguntasObj.length > 0 && indicesDisponibles.length === 0) {
      crearNuevosIndices();
    }
  }, [numeroPreguntas, preguntasObj]);

  useEffect(() => {
    if (
      preguntasObj.length > 0 &&
      numAzar !== null &&
      numAzar < preguntasObj.length
    ) {
      const startAudio = async () => {
        await controlLongSound("play");
      };
      recompensa !== 5 && startAudio();

      const preguntaSeleccionada = preguntasObj[numAzar];
      preguntaSeleccionada.imagen
        ? guardarImagen(preguntaSeleccionada.imagen)
        : guardarImagen("");

      guardarPregunta(preguntaSeleccionada.pregunta);
      mostrarAviso.length > 0 && SetMostrarAviso("");

      let res = [
        preguntaSeleccionada.res_correcta,
        preguntaSeleccionada.res_incorrecta1,
        preguntaSeleccionada.res_incorrecta2,
        preguntaSeleccionada.res_incorrecta3,
      ];

      let newOrden = res.sort(() => Math.random() - 0.5);
      let respuestasObj = [
        { opcion: "A", respuesta: newOrden[0] },
        { opcion: "B", respuesta: newOrden[1] },
        { opcion: "C", respuesta: newOrden[2] },
        { opcion: "D", respuesta: newOrden[3] },
      ];

      guardarRespuestas(respuestasObj);

      let correcta = respuestasObj.filter(
        (res) => res.respuesta === preguntaSeleccionada.res_correcta
      );

      guardarRespuestaCorrecta(correcta[0]);
    }
  }, [numAzar, preguntasObj]);

  const elegirRespuesta = (
    textoCopiado: string,
    seleccionarRes: string,
    indice: number
  ) => {
    if (time) return null;
    const stopAudio = async () => {
      await controlLongSound("stop");
    };
    stopAudio();
    guardarIndex(indice);
    if (textoCopiado === seleccionarRes) {
      stopTime(true);
      playSimpleSound("correcto");
      sumarPuntos(seconds, setPuntos, puntos, getRecompensa, recompensa);
      setTimeout(() => setNumeroPreguntas(numeroPreguntas + 1), 1300);
    } else {
      playSimpleSound("incorrecto");
      setIsIncorrect(true);
      guardarIndices(indicesDisponibles);
      guadarPuntuacion();
      guardarMaxPreguntas();
    }
  };

  const guadarPuntuacion = async () => {
    let scores: number[] = [];
    scores.push(puntos);
    let max_score = Math.max(...scores);

    let getScore = await AsyncStorage.getItem("@max_puntuacion");
    if (!getScore) {
      await AsyncStorage.setItem("@max_puntuacion", max_score.toString());
    }
    let oldScore = Number(getScore);
    if (max_score > oldScore) {
      setIsMaxScore(Number(max_score));
      await AsyncStorage.setItem("@max_puntuacion", max_score.toString());
    }
  };

  const guardarMaxPreguntas = async () => {
    let getScore = await AsyncStorage.getItem("@max_preguntas");
    if (!getScore) {
      await AsyncStorage.setItem("@max_preguntas", numeroPreguntas.toString());
    }
    let oldScore = Number(getScore);
    if (numeroPreguntas > oldScore) {
      let savePreguntas = numeroPreguntas - 1;
      await AsyncStorage.setItem("@max_preguntas", savePreguntas.toString());
    }
  };

  const goToHome = async () => {
    await playSimpleSound("click");
    navigation.navigate("HomeScreen" as never);
  };

  return (
    <ScrollView style={styles.container}>
      <NumeroPregunta numero={numeroPreguntas} recompensa={recompensa} />
      {pregunta.length ? (
        <Text style={styles.pregunta}> {pregunta} </Text>
      ) : (
        <ActivityIndicator size="large" color="#0030AD" />
      )}

      {imagen && (
        <View style={styles.container_image}>
          <CargarImagen name={imagen} />
        </View>
      )}
      <Comodines
        guardarComodines={guardarComodines}
        comodines={comodines}
        setSeconds={setSeconds}
        setMarcarRespuesta={setMarcarRespuesta}
        setNumeroPreguntas={setNumeroPreguntas}
        numeroPreguntas={numeroPreguntas}
        setNumAzar={setNumAzar}
        numAleatorio={getRandomIndex(preguntasObj.length)}
        guardarRespuestas={guardarRespuestas}
        respuestas={respuestas}
        respuestaCorrecta={respuestaCorrecta}
        SetMostrarAviso={SetMostrarAviso}
        SetPuntos={setPuntos}
        puntos={puntos}
        isIncorrect={isIncorrect}
      />
      {bonus && (
        <>
          <View style={styles.modalContainer}>
            <View style={styles.overlay}>
              <Bonus
                setPuntos={setPuntos}
                puntos={puntos}
                setBonus={setBonus}
                getRecompensa={getRecompensa}
                guardarComodines={guardarComodines}
              />
            </View>
          </View>
        </>
      )}
      {isIncorrect && (
        <View style={styles.container_error}>
          <Text style={styles.container_error_aviso}>
            {seconds === 0
              ? "Se agotó el tiempo para responder, ¡perdiste!"
              : "Has elegido la respuesta incorrecta, ¡perdiste!"}
          </Text>

          {isMaxScore && (
            <Text style={styles.container_max_score}>
              ¡Has superado tu puntuación anterior con {isMaxScore} puntos!
            </Text>
          )}

          <TouchableOpacity style={styles.container_button} onPress={goToHome}>
            <Text style={styles.container_button_text}>Ir a inicio</Text>
          </TouchableOpacity>
        </View>
      )}
      {mostrarAviso.length > 0 && (
        <View>
          <Text style={styles.texto_aviso}> {mostrarAviso} </Text>
        </View>
      )}
      <View style={[styles.container_res, isIncorrect && styles.blockgame]}>
        {respuestas.length ? (
          respuestas.map(
            (res, i) =>
              res.respuesta && (
                <PreguntaCard
                  key={i}
                  index={index}
                  i={i}
                  respuesta={res}
                  respuestaCorrecta={respuestaCorrecta}
                  elegirRespuesta={elegirRespuesta}
                  isIncorrect={isIncorrect}
                  marcarRespuesta={marcarRespuesta}
                />
              )
          )
        ) : (
          <ActivityIndicator size="large" color="#F7D210" />
        )}
      </View>
      <Bar recompensa={recompensa} />
      <Timer
        seconds={seconds}
        setIsIncorrect={setIsIncorrect}
        isIncorrect={isIncorrect}
        setSeconds={setSeconds}
        time={time}
        bonus={bonus}
      />
      <View style={styles.points_container}>
        <Text style={styles.points_texto}>Puntos Obtenidos: {puntos}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#620011",
    flex: 1,
    position: "relative",
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "box-none",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(98, 0, 17, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container_res: {
    justifyContent: "center",
    alignItems: "center",
  },
  container_image: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 13,
  },
  pregunta: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#F7D210",
    fontSize: 20,
    textAlign: "center",
    color: "#404040",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  container_error: {
    justifyContent: "center",
    alignItems: "center",
  },
  container_error_aviso: {
    fontSize: 20,
    textTransform: "uppercase",
    color: "#fff",
    backgroundColor: "#D00C27",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    width: "100%",
  },
  container_max_score: {
    fontSize: 20,
    textTransform: "uppercase",
    color: "#fff",
    backgroundColor: "#0cd047",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    width: "100%",
  },
  container_button: {
    padding: 10,
    backgroundColor: "#F7D210",
    marginTop: 20,
    marginBottom: 13,
    borderRadius: 10,
  },
  container_button_text: {
    color: "#404040",
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 10,
  },
  blockgame: {
    pointerEvents: "none",
    opacity: 0.8,
  },
  points_texto: {
    color: "#404040",
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "uppercase",
  },
  points_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    width: 280,
    height: 55,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#0030AD",
    marginBottom: 6,
  },
  texto_aviso: {
    textAlign: "center",
    fontSize: 19,
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 5,
    marginVertical: 5,
    textTransform: "uppercase",
  },
});

export default TableroPreguntas;
