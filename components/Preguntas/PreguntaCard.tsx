import { Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native";

type RespuestaObj = {
  opcion: string;
  respuesta: string;
};

type Props = {
  index: number | null;
  i: number;
  respuesta: RespuestaObj;
  respuestaCorrecta: RespuestaObj;
  elegirRespuesta: (a: string, b: string, c: number) => void;
  isIncorrect: boolean;
  marcarRespuesta: boolean;
};

const PreguntaCard = ({
  index,
  i,
  respuesta,
  respuestaCorrecta,
  elegirRespuesta,
  isIncorrect,
  marcarRespuesta,
}: Props): React.JSX.Element => {
  return (
    <Pressable
      key={i}
      style={[
        styles.respuesta,
        index === i &&
          respuesta.respuesta === respuestaCorrecta.respuesta &&
          styles.respuesta_correcta,
        index === i &&
          respuesta.respuesta !== respuestaCorrecta.respuesta &&
          styles.respuesta_incorrecta,
        index !== i &&
          isIncorrect &&
          respuesta.respuesta === respuestaCorrecta.respuesta &&
          styles.respuesta_correcta,
        index !== i &&
          marcarRespuesta &&
          respuesta.respuesta === respuestaCorrecta.respuesta &&
          styles.respuesta_correcta,
      ]}
      onPress={() =>
        elegirRespuesta(respuesta.respuesta, respuestaCorrecta.respuesta, i)
      }
    >
      <View style={styles.respuesta_seccion}>
        <Text style={styles.opcion}> {respuesta.opcion} </Text>
        <Text
          style={
            respuesta.respuesta.length > 20
              ? styles.respuesta_texto_grande
              : styles.respuesta_texto
          }
        >
          {respuesta.respuesta}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  respuesta: {
    width: "97%",
    backgroundColor: "#0030AD",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: "#F7D210",
  },
  respuesta_texto: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: "bold",
  },
  respuesta_texto_grande: {
     color: "#fff",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
  },
  container_error: {
    justifyContent: "center",
    alignItems: "center",
  },
  container_error_aviso: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#D00C27",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    width: "100%",
  },
  respuesta_seccion: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  opcion: {
    color: "#F7D210",
    padding: 3,
    borderRadius: 5,
    width: 30,
    height: 25,
    fontWeight: "bold",
    marginRight: 5,
  },
  respuesta_correcta: {
    backgroundColor: "green",
  },
  respuesta_incorrecta: {
    backgroundColor: "red",
  },
});

export default PreguntaCard;
