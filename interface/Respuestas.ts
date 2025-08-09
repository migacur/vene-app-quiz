export interface Respuestas {
  opcion: string;
  respuesta: string;
}

export type ComodinesObj = {
  eliminar: number;
  cambiar: number;
  marcar: number;
  llamar: number;
  audiencia: number;
};

export type Votos = {
  opcion: string;
  votos: number;
};

export interface Buttons {
  [key: string]: boolean;
}
