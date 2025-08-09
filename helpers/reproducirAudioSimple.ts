import { Audio } from "expo-av";

type Audios = {
  [key: string]: Audio.Sound;
};

const listadoAudios: Audios = {
  click: require("../assets/audios/click.mp3"),
  correcto: require("../assets/audios/correcto.mp3"),
  incorrecto: require("../assets/audios/incorrecto.mp3"),
  tono: require("../assets/audios/tono.mp3"),
};

export const playSimpleSound = async (nombreAudio: string) => {
  const audioUrl = listadoAudios[nombreAudio];
  if (!audioUrl) {
    console.error("Audio no encontrado");
    return;
  }

  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(audioUrl);
    await soundObject.playAsync();
  } catch (error) {
    console.log("Error al reproducir el sonido", error);
  }
};
