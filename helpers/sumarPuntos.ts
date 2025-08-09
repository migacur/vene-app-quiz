import { Dispatch, SetStateAction } from "react";

export const sumarPuntos = (
  seconds: number,
  setPuntos: Dispatch<SetStateAction<number>>,
  puntos: number,
  getRecompensa: Dispatch<SetStateAction<number>>,
  recompensa: number
) => {
  if (seconds >= 15) {
    setPuntos(puntos + 500);
    getRecompensa(recompensa + 1);
  }
  if (seconds >= 10 && seconds < 15) {
    setPuntos(puntos + 400);
    getRecompensa(recompensa + 1);
  }
  if (seconds < 10 && seconds >= 5) {
    setPuntos(puntos + 250);
  }
  if (seconds < 5) {
    setPuntos(puntos + 150);
  }
};
