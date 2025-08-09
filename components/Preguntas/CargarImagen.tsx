import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";

type Imagen = {
  [key: string]: ImageSourcePropType;
};

const images: Imagen = {
  animal: require("../../assets/images/img/animal.jpg"),
  aqtr: require("../../assets/images/img/aqtr.jpg"),
  bailven: require("../../assets/images/img/baileven.jpg"),
  banda60: require("../../assets/images/img/banda60.jpg"),
  banderaedo: require("../../assets/images/img/banderaedo.jpg"),
  banderaestado: require("../../assets/images/img/banderaestado.jpg"),
  banderamin: require("../../assets/images/img/banderamin.jpg"),
  banderapais: require("../../assets/images/img/banderapais.jpg"),
  banderaven: require("../../assets/images/img/banderaven.jpg"),
  banderavene: require("../../assets/images/img/banderavene.jpg"),
  basilica: require("../../assets/images/img/basilica.jpg"),
  batalla: require("../../assets/images/img/batalla.jpg"),
  bdp: require("../../assets/images/img/bdp.jpg"),
  beisbolistave: require("../../assets/images/img/beisbolistave.jpg"),
  cabo: require("../../assets/images/img/cabo.jpg"),
  capa: require("../../assets/images/img/capa.jpg"),
  catedral: require("../../assets/images/img/catedral.jpg"),
  cerro: require("../../assets/images/img/cerro.jpg"),
  cf: require("../../assets/images/img/cf.jpg"),
  chinita: require("../../assets/images/img/chinita.jpg"),
  ciudad: require("../../assets/images/img/ciudad.jpg"),
  coach: require("../../assets/images/img/coach.jpg"),
  comany: require("../../assets/images/img/comany.jpg"),
  comercial: require("../../assets/images/img/comercial.jpg"),
  comercialviejo: require("../../assets/images/img/comercialviejo.jpg"),
  comida: require("../../assets/images/img/comida.jpg"),
  dc: require("../../assets/images/img/dc.jpg"),
  defensavino: require("../../assets/images/img/defensavino.jpg"),
  domino: require("../../assets/images/img/domino.jpg"),
  edocci: require("../../assets/images/img/edocci.jpg"),
  escudo: require("../../assets/images/img/escudo.jpg"),
  esfera: require("../../assets/images/img/esfera.jpg"),
  estadio: require("../../assets/images/img/estadio.jpg"),
  estado: require("../../assets/images/img/estado.jpg"),
  estado2: require("../../assets/images/img/estado2.jpg"),
  estado3: require("../../assets/images/img/estado3.jpg"),
  estado4: require("../../assets/images/img/estado4.jpg"),
  estadonew: require("../../assets/images/img/estadonew.jpg"),
  estadoven: require("../../assets/images/img/estadoven.jpg"),
  estatua: require("../../assets/images/img/estatua.jpg"),
  ez: require("../../assets/images/img/ez.jpg"),
  flag: require("../../assets/images/img/flag.jpg"),
  flor: require("../../assets/images/img/flor.jpg"),
  foto: require("../../assets/images/img/foto.jpg"),
  fotografia: require("../../assets/images/img/fotografia.jpg"),
  fotoquiz: require("../../assets/images/img/fotoquiz.jpg"),
  fruta: require("../../assets/images/img/fruta.jpg"),
  fruta2: require("../../assets/images/img/fruta2.jpg"),
  futven: require("../../assets/images/img/futven.jpg"),
  fvf: require("../../assets/images/img/fvf.jpg"),
  grandeliga: require("../../assets/images/img/grandeliga.jpg"),
  hamaca: require("../../assets/images/img/hamaca.jpg"),
  hermano: require("../../assets/images/img/hermano.jpg"),
  jb: require("../../assets/images/img/jb.jpg"),
  jugadorvino: require("../../assets/images/img/jugadorvino.jpg"),
  laespinga: require("../../assets/images/img/laespinga.jpg"),
  mango: require("../../assets/images/img/mango.jpg"),
  mapa: require("../../assets/images/img/mapa.jpg"),
  mapa2: require("../../assets/images/img/mapa2.jpg"),
  mapa3: require("../../assets/images/img/mapa3.jpg"),
  mapaedo: require("../../assets/images/img/mapaedo.jpg"),
  mascota: require("../../assets/images/img/mascota.jpg"),
  medano: require("../../assets/images/img/medano.jpg"),
  miranda: require("../../assets/images/img/miranda.jpg"),
  miss: require("../../assets/images/img/miss.jpg"),
  monumento: require("../../assets/images/img/monumento.jpg"),
  monumentofede: require("../../assets/images/img/monumentofede.jpg"),
  movie: require("../../assets/images/img/movie.jpg"),
  movieven: require("../../assets/images/img/movieven.jpg"),
  mural: require("../../assets/images/img/mural.jpg"),
  obelisco: require("../../assets/images/img/obelisco.jpg"),
  obra: require("../../assets/images/img/obra.jpg"),
  obra19: require("../../assets/images/img/obra19.jpg"),
  otrabandera: require("../../assets/images/img/otrabandera.jpg"),
  ov: require("../../assets/images/img/ov.jpg"),
  paseo: require("../../assets/images/img/paseo.jpg"),
  peli: require("../../assets/images/img/peli.jpg"),
  pelibeisbol: require("../../assets/images/img/pelibeisbol.jpg"),
  pelicula: require("../../assets/images/img/pelicula.jpg"),
  peliculachyno: require("../../assets/images/img/peliculachyno.jpg"),
  peliven: require("../../assets/images/img/peliven.jpg"),
  pelotero: require("../../assets/images/img/pelotero.jpg"),
  person: require("../../assets/images/img/person.jpg"),
  persona: require("../../assets/images/img/persona.jpg"),
  personaje: require("../../assets/images/img/personaje.jpg"),
  personaje2: require("../../assets/images/img/personaje2.jpg"),
  platotipico: require("../../assets/images/img/platotipico.jpg"),
  playervino: require("../../assets/images/img/playervino.jpg"),
  plaza: require("../../assets/images/img/plaza.jpg"),
  pmve: require("../../assets/images/img/pmve.jpg"),
  pcar: require("../../assets/images/img/pcar.jpg"),
  portenazo: require("../../assets/images/img/portenazo.jpg"),
  portero: require("../../assets/images/img/portero.jpg"),
  porterovino: require("../../assets/images/img/porterovino.jpg"),
  presentador2: require("../../assets/images/img/presentador2.jpg"),
  procer: require("../../assets/images/img/procer.jpg"),
  procer2: require("../../assets/images/img/procer2.jpg"),
  procerven: require("../../assets/images/img/procerven.jpg"),
  programa: require("../../assets/images/img/programa.jpg"),
  programatv: require("../../assets/images/img/programatv.jpg"),
  programavene: require("../../assets/images/img/programavene.jpg"),
  programavv: require("../../assets/images/img/programavv.jpg"),
  rd: require("../../assets/images/img/rd.jpg"),
  rojo: require("../../assets/images/img/rojo.jpg"),
  salto: require("../../assets/images/img/salto.jpg"),
  sm: require("../../assets/images/img/sm.jpg"),
  solnaciente: require("../../assets/images/img/solnaciente.jpg"),
  sopa: require("../../assets/images/img/sopa.jpg"),
  telenovela: require("../../assets/images/img/telenovela.jpg"),
  tlnovela: require("../../assets/images/img/tlnovela.jpg"),
  toro: require("../../assets/images/img/toro.jpg"),
  tripode: require("../../assets/images/img/tripode.jpg"),
  venezolano: require("../../assets/images/img/venezolano.jpg"),
};

type Prop = {
  name: string;
};

const DynamicImage = ({ name }: Prop): React.JSX.Element => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#F7D210" />}
      <Image source={images[name]} style={styles.image} onLoad={handleLoad} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 250,
    borderWidth: 4,
    borderColor: "#F7D210",
    borderRadius: 10,
  },
});

export default DynamicImage;
