import { Audio } from "expo-av";

let soundObject: Audio.Sound | null = null;
const audioUrl = require("../assets/audios/timer.mp3");

export const playSound = async (action: string) => {
  if (!soundObject) {
    soundObject = new Audio.Sound();
    await soundObject.loadAsync(audioUrl);
  }

  try {
    if (action === "play") {
      await soundObject.playAsync();
    } else if (action === "pause") {
      await soundObject.pauseAsync();
    } else if (action === "replay") {
      await soundObject.stopAsync();
      await soundObject.setPositionAsync(0);
      await soundObject.playAsync();
    } else if (action === "stop") {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = new Audio.Sound();
      await soundObject.loadAsync(audioUrl);
    }
  } catch (error) {
    console.log(`Error al intentar ${action} el sonido`, error);
  }
};
