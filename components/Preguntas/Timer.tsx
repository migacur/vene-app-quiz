import { StyleSheet, Text, View } from "react-native";
import TimerIcon from "../Icons/Game/TimerIcon";
import { Dispatch, SetStateAction, useEffect } from "react";
import { playSimpleSound } from "@/helpers/audioConfig";


type Prop = {
  seconds: number;
  setIsIncorrect: Dispatch<SetStateAction<boolean>>;
  isIncorrect: boolean;
  setSeconds: Dispatch<SetStateAction<number>>;
  time: boolean;
  bonus:boolean;
};

const Timer = ({
  seconds,
  setIsIncorrect,
  isIncorrect,
  setSeconds,
  time,
  bonus
}: Prop): React.JSX.Element => {
  useEffect(() => {
    if (time || isIncorrect || bonus) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 1) return prevSeconds - 1;
        clearInterval(interval);
        setIsIncorrect(true);
        playSimpleSound("incorrecto");
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isIncorrect,bonus]);

  return (
    <View style={styles.cronometro_container}>
      <TimerIcon />
      <Text style={styles.cronometro_texto}>
        Tiempo Restante: {seconds >= 10 ? `0:${seconds}` : `0:0${seconds}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cronometro_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
    backgroundColor: "#F7D210",
    paddingVertical: 10,
    width: 280,
    height: 55,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#0030AD",
  },
  cronometro_texto: {
    color: "#404040",
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "uppercase",
  },
});

export default Timer;
