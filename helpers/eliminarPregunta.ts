import { Preguntas } from "@/interface/Preguntas";
import { Dispatch, SetStateAction } from "react";

export const eliminarPregunta = (
  nombreEstado: Dispatch<SetStateAction<Preguntas[]>>,
  numAleatorio: number
) => {
  nombreEstado((prevData) => {
    if (prevData.length === 0) return prevData;
    const nuevoArray = prevData.filter((_, index) => index !== numAleatorio);
    console.log(nuevoArray.length);
    return nuevoArray;
  });
};
