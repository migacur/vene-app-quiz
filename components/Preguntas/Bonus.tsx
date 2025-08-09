import { controlLongSound, playSimpleSound } from "@/helpers/audioConfig";
import { ComodinesObj } from "@/interface/Respuestas";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";

type Prop = {
  setPuntos: Dispatch<SetStateAction<number>>;
  puntos: number;
  setBonus: Dispatch<SetStateAction<boolean>>;
  getRecompensa: Dispatch<SetStateAction<number>>;
  guardarComodines: Dispatch<SetStateAction<ComodinesObj>>;
};

const Bonus = ({
  setPuntos,
  puntos,
  setBonus,
  getRecompensa,
  guardarComodines,
}: Prop): React.JSX.Element => {
  let bonus = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const aleatorio = [...bonus].sort(() => Math.random() - 0.5);
  const [opcion, guardarOpcion] = useState<number | null>(null);
  const [mensaje, guardarMensaje] = useState<string>("");
  const [lost, setLost] = useState<boolean>(false);

  const seleccionarArepa = (valor: number, i: number) => {
    if (opcion) return null;
    getRecompensa(0);
    guardarOpcion(i);
    const reproducir = async() =>  await playSimpleSound("click");
    reproducir();
    switch (valor) {
      case 0:
        guardarComodines((prevState) => ({
          ...prevState,
          llamar: prevState.llamar + 1,
        }));
        guardarMensaje("Ganaste 1 comodín de llamada!");
        break;
      case 1:
        guardarComodines((prevState) => ({
          ...prevState,
          cambiar: prevState.cambiar + 1,
        }));
        guardarMensaje("¡Ganaste 1 comodín de cambiar pregunta!");
        break;
      case 4:
        setPuntos(puntos + 1000);
        guardarMensaje("¡Ganaste 1000 puntos!");
        break;
      case 6:
        guardarComodines((prevState) => ({
          ...prevState,
          eliminar: prevState.eliminar + 1,
        }));
        guardarMensaje("¡Ganaste 1 comodín para eliminar opciones!");
        break;
      case 7:
        setPuntos(puntos + 2000);
        guardarMensaje("¡Ganaste 2000 puntos!");
        break;
      case 9:
        guardarComodines((prevState) => ({
          ...prevState,
          audiencia: prevState.audiencia + 1,
        }));
        guardarMensaje("¡Ganaste 1 comodín de consulta al público!");
        break;
      case 11:
        guardarComodines((prevState) => ({
          ...prevState,
          marcar: prevState.marcar + 1,
        }));
        guardarMensaje(
          "¡Ganaste 1 comodín para obtener la respuesta correcta!"
        );
        break;
      default:
        guardarMensaje("¡No ganaste puntos, ¡sigue jugando!");
        setLost(true);
        break;
    }
  };

  const cerrarBonus = () => {
    setBonus(false);
    const playAudio = async () => {
      await controlLongSound("play");
    };
    playAudio();
  };

  return (
    <View style={styles.box}>
      <View style={styles.bonus_box}>
        <Text style={styles.bonus_title}>Elige una</Text>
        <View style={styles.arepas}>
          {aleatorio.map((valor, i) => (
            <Pressable
              key={i}
              style={[styles.item, i === opcion && styles.eleccion]}
              onPress={() => seleccionarArepa(valor, i)}
            >
              <Image
                source={require("../../assets/images/arepa.png")}
                style={{ width: 60, height: 60 }}
              />
            </Pressable>
          ))}
          {mensaje.length > 0 ? (
            <Text style={lost ? styles.lost : styles.msj}>{mensaje}</Text>
          ) : null}
          {mensaje !== "" && typeof opcion === "number" && (
            <Pressable style={styles.continue} onPress={cerrarBonus}>
              <Text style={styles.continue_text}>Continuar</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "rgba(98, 0, 17, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bonus_box: {
    borderRadius: 15,
    position: "absolute",
    width: "98%",
    zIndex: 100,
    height: 520,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 10,
    elevation: 10,
  },
  bonus_title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    textAlign: "center",
    color: "#620011",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  arepas: {
    marginTop: 7,
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 10,
  },
  item: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  msj: {
    width: "100%",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 6,
    padding: 8,
    backgroundColor: "#0cd047",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 10,
  },
  lost: {
    width: "100%",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 6,
    padding: 8,
    backgroundColor: "#D00C27",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 10,
  },
  continue: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "#0030AD",
    borderRadius: 10,
  },
  continue_text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  eleccion: {
    backgroundColor: "#0030AD",
  },
});

export default Bonus;
