import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BombIcon from "../Icons/Game/BombIcon";
import ChangeIcon from "../Icons/Game/ChangeIcon";
import CheckIcon from "../Icons/Game/CheckIcon";
import PhoneIcon from "../Icons/Game/PhoneIcon";
import AudienciaIcon from "../Icons/Game/AudienciaIcon";
import {
  Buttons,
  ComodinesObj,
  Respuestas,
  Votos,
} from "@/interface/Respuestas";
import MyGrafica from "./Grafica";
import { playSimpleSound,controlLongSound } from "@/helpers/audioConfig";


type Props = {
  guardarComodines: Dispatch<SetStateAction<ComodinesObj>>;
  comodines:ComodinesObj;
  setSeconds: Dispatch<SetStateAction<number>>;
  setMarcarRespuesta: Dispatch<SetStateAction<boolean>>;
  setNumeroPreguntas: Dispatch<SetStateAction<number>>;
  numeroPreguntas: number;
  setNumAzar: Dispatch<SetStateAction<number>>;
  numAleatorio: number;
  guardarRespuestas: Dispatch<SetStateAction<Respuestas[]>>;
  respuestas: Respuestas[];
  respuestaCorrecta: Respuestas;
  SetMostrarAviso: Dispatch<SetStateAction<string>>;
  SetPuntos: Dispatch<SetStateAction<number>>;
  puntos: number;
  isIncorrect: boolean;
};

type Data = {
  datasets: [{ data: number[] }];
  labels: string[];
};

const Comodines = ({
  guardarComodines,
  comodines,
  setSeconds,
  setMarcarRespuesta,
  setNumeroPreguntas,
  numeroPreguntas,
  setNumAzar,
  numAleatorio,
  guardarRespuestas,
  respuestas,
  respuestaCorrecta,
  SetMostrarAviso,
  SetPuntos,
  puntos,
  isIncorrect,
}: Props): React.JSX.Element => {

  const [bloquear, setBloquear] = useState<Buttons>({
    eliminar: false,
    cambiar: false,
    marcar: false,
    llamar: false,
    audiencia: false,
  });

  const [showGrafica, setShowGrafica] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any | null>(null);

  useEffect(() => {
    const actualizarEstado = () => {
      setBloquear((prevEstado) => {
        const nuevoEstado: Buttons = { ...prevEstado };
        for (const key in nuevoEstado) {
          if (nuevoEstado[key] === true) {
            nuevoEstado[key] = false;
          }
        }
        return nuevoEstado;
      });
    };

    actualizarEstado();
    chartData && setChartData(null);
    showGrafica && setShowGrafica(false);
  }, [numeroPreguntas]);

  const eliminarRespuestas = () => {
    if (comodines.eliminar === 0 || isIncorrect) return;
    playSimpleSound("click");
    let verificarLongitud = respuestas.filter((res) =>
      res.respuesta.includes("Verdadero")
    );
    if (verificarLongitud.length > 0) return;
    let newRespuestas: Respuestas[] = [];
    let filtrar = respuestas.filter(
      (res) => res.respuesta !== respuestaCorrecta.respuesta
    );
    let extraerRespuesta = filtrar[0];
    newRespuestas.push(respuestaCorrecta, extraerRespuesta);
    let ordernarRes: Respuestas[] = newRespuestas.sort((a, b) =>
      a.opcion.localeCompare(b.opcion)
    );
    guardarRespuestas(ordernarRes);
    guardarComodines((prevState) => ({
      ...prevState,
      eliminar: prevState.eliminar - 1,
    }));
    setBloquear((prevState) => ({
      ...prevState,
      eliminar: !prevState.eliminar,
    }));
  };
  const cambiarRespuesta = () => {
    if (comodines.cambiar === 0 || isIncorrect) return;
  const replayAudio = async () => {
        await controlLongSound("replay");
      };
      replayAudio();
    setNumAzar(numAleatorio);
    setSeconds(20);

    guardarComodines((prevState) => ({
      ...prevState,
      cambiar: prevState.cambiar - 1,
    }));
    setBloquear((prevState) => ({
      ...prevState,
      cambiar: !prevState.cambiar,
    }));
  };
  const marcarResCorrecta = () => {
    if (comodines.marcar === 0 || isIncorrect) return;
    playSimpleSound("correcto");
    setMarcarRespuesta(true);
    SetPuntos(puntos + 200);
    setTimeout(() => setNumeroPreguntas(numeroPreguntas + 1), 1300);

    guardarComodines((prevState) => ({
      ...prevState,
      marcar: prevState.marcar - 1,
    }));
    setBloquear((prevState) => ({
      ...prevState,
      marcar: !prevState.marcar,
    }));
  };

  function generarNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const llamarAmigo = () => {
    if (comodines.llamar === 0 || isIncorrect) return;
    playSimpleSound("tono");
    let porcentaje: number = generarNumeroAleatorio(25, 90);

    let filtrar = respuestas.filter(
      (res) => res.respuesta !== respuestaCorrecta.respuesta
    );
    let generarNum: number = Math.floor(Math.random() * filtrar.length);
    if (porcentaje >= 75) {
      SetMostrarAviso(
        `Te han dicho que la respuesta correcta es: "${filtrar[generarNum].opcion}"...`
      );
    }
    SetMostrarAviso(
      `Te han dicho que la respuesta correcta es: "${respuestaCorrecta.opcion}"...`
    );

    guardarComodines((prevState) => ({
      ...prevState,
      llamar: prevState.llamar - 1,
    }));
    setBloquear((prevState) => ({
      ...prevState,
      llamar: !prevState.llamar,
    }));
  };

  const consultarAudiencia = () => {
    if (comodines.audiencia === 0 || isIncorrect) return;
    playSimpleSound("click");
    let generarNum: number = generarNumeroAleatorio(25, 80);
    let porcentajeRestante: number = 100 - generarNum;
    let repartir: number;
    let newArr: Votos[] = [];
    let filtrarRes = respuestas.filter((res) => res.respuesta !== "");

    filtrarRes.forEach((res) => {
      repartir = generarNumeroAleatorio(0, porcentajeRestante);

      if (res.respuesta === respuestaCorrecta.respuesta) {
        newArr.push({ opcion: res.opcion, votos: generarNum });
      } else {
        newArr.push({ opcion: res.opcion, votos: repartir });
      }
      porcentajeRestante = porcentajeRestante - repartir;
    });

    const sumarVotos = newArr.reduce((previous, current) => {
      return previous + current.votos;
    }, 0);

    if (sumarVotos < 100) {
      let calcularFaltante: number = 100 - sumarVotos;
      let resCorrecta = newArr.filter(
        (res) => res.opcion === respuestaCorrecta.opcion
      );
      resCorrecta[0].votos += calcularFaltante;
    }
    let resultadoVotos: Votos[] = newArr.sort((a, b) => b.votos - a.votos);

    guardarComodines((prevState) => ({
      ...prevState,
      audiencia: prevState.audiencia - 1,
    }));
    setBloquear((prevState) => ({
      ...prevState,
      audiencia: !prevState.audiencia,
    }));

    let labels = resultadoVotos.map((res) => res.opcion);
    let data = resultadoVotos.map((res) => res.votos);

    SetMostrarAviso(
      "Espere que la gente vote por la respuesta que crea correcta..."
    );
    setTimeout(() => {
      SetMostrarAviso("");
      setShowGrafica(true);
    }, 1200);

    return {
      labels: labels,
      datasets: [
        {
          data: data,
        },
      ],
    };
  };

  return (
    <>
      <View style={styles.container_comodines}>
        <TouchableOpacity
          onPress={eliminarRespuestas}
          style={[styles.button, bloquear.eliminar && styles.block_button]}
        >
          <BombIcon />
        </TouchableOpacity>
        <Text style={styles.texto_comodines}> {comodines.eliminar} </Text>

        <TouchableOpacity
          onPress={cambiarRespuesta}
          style={[styles.button, bloquear.cambiar && styles.block_button]}
        >
          <ChangeIcon />
        </TouchableOpacity>
        <Text style={styles.texto_comodines}> {comodines.cambiar} </Text>

        <TouchableOpacity
          onPress={marcarResCorrecta}
          style={[styles.button, bloquear.marcar && styles.block_button]}
        >
          <CheckIcon />
        </TouchableOpacity>
        <Text style={styles.texto_comodines}> {comodines.marcar} </Text>

        <TouchableOpacity
          onPress={llamarAmigo}
          style={[styles.button, bloquear.llamar && styles.block_button]}
        >
          <PhoneIcon />
        </TouchableOpacity>
        <Text style={styles.texto_comodines}> {comodines.llamar} </Text>

        <TouchableOpacity
          onPress={() => setChartData(consultarAudiencia)}
          style={[styles.button, bloquear.audiencia && styles.block_button]}
        >
          <AudienciaIcon />
        </TouchableOpacity>
        <Text style={styles.texto_comodines}> {comodines.audiencia} </Text>
      </View>
      {showGrafica && chartData && <MyGrafica data={chartData} />}
    </>
  );
};

const styles = StyleSheet.create({
  container_comodines: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 13,
  },
  button: {
    padding: 3,
    borderRadius: 30,
    width: 50,
    height: 50,
    backgroundColor: "#ebe8e8",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  texto_comodines: {
    backgroundColor: "#404040",
    color: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginTop: 20,
    borderRadius: 30,
  },
  block_button: {
    opacity: 0.5,
    pointerEvents: "none",
  },
});

export default Comodines;
