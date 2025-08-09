import { Audio } from "expo-av";

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: false,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  playThroughEarpieceAndroid: false,
});

type ShortSounds = "click" | "correcto" | "incorrecto" | "tono";
const shortSoundsCache = new Map<ShortSounds, Audio.Sound>();

export const loadShortSounds = async () => {
  const sounds: Record<ShortSounds, any> = {
    click: require("../assets/audios/click.mp3"),
    correcto: require("../assets/audios/correcto.mp3"),
    incorrecto: require("../assets/audios/incorrecto.mp3"),
    tono: require("../assets/audios/tono.mp3"),
  };

  await Promise.all(
    (Object.keys(sounds) as ShortSounds[]).map(async (key) => {
      const { sound } = await Audio.Sound.createAsync(sounds[key]);
      shortSoundsCache.set(key, sound);
    })
  );
};

export const playSimpleSound = async (nombre: ShortSounds) => {
  const sound = shortSoundsCache.get(nombre);
  if (sound) {
    await sound.replayAsync();
  }
};


let longSound: Audio.Sound | null = null;
let isPlaying = false; 
let isLoading = false; 

export const loadLongSound = async () => {
  if (longSound || isLoading) return;
  
  try {
    isLoading = true;
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audios/timer.mp3"),
      { shouldPlay: false }
    );
    
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        isPlaying = false;
      }
    });
    
    longSound = sound;
    isPlaying = false;
  } catch (error) {
    console.error("Error cargando sonido largo:", error);
    longSound = null;
    isPlaying = false;
  } finally {
    isLoading = false;
  }
};

export const controlLongSound = async (action: "play" | "pause" | "replay" | "stop") => {
  if (!longSound && action !== "stop") {
    await loadLongSound();
    if (!longSound) return;
  }

  try {
    switch (action) {
      case "play":
        if (longSound && !isPlaying) {
          await longSound.playAsync();
          isPlaying = true;
        }
        break;
        
      case "pause":
        if (longSound && isPlaying) {
          await longSound.pauseAsync();
          isPlaying = false;
        }
        break;
        
      case "replay":
        if (longSound) {
          await longSound.stopAsync();
          await longSound.setPositionAsync(0);
          await longSound.playAsync();
          isPlaying = true;
        }
        break;
        
      case "stop":
        if (longSound) {
          try {
            await longSound.stopAsync();
          } catch (stopError) {
            console.log("Error en stopAsync (puede ser normal si no estaba playing):", stopError);
          }
          await longSound.unloadAsync();
          longSound = null;
          isPlaying = false;
        }
        break;
    }
  } catch (error) {
    console.error(`Error en controlLongSound (${action}):`, error);

    if (longSound) {
      try {
        await longSound.unloadAsync();
      } catch (e) {
        console.error("Error durante limpieza:", e);
      }
      longSound = null;
    }
    isPlaying = false;
  }
};


export const unloadAllSounds = async () => {

  shortSoundsCache.forEach(sound => {
    sound.unloadAsync().catch(e => console.error("Error unloading short sound:", e));
  });
  shortSoundsCache.clear();
  
  if (longSound) {
    try {
      await longSound.unloadAsync();
    } catch (e) {
      console.error("Error unloading long sound:", e);
    }
    longSound = null;
    isPlaying = false;
  }
};