import * as SplashScreen from "expo-splash-screen";
import Home from "@/components/Home/Home";
import TableroPreguntas from "@/components/Preguntas/TableroPreguntas";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar, View, Image } from "react-native";
import {
  loadLongSound,
  loadShortSounds,
  unloadAllSounds,
} from "@/helpers/audioConfig";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const logoSize = width * 0.5;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [mostrar, setMostrar] = useState(false);
  useEffect(() => {
    const preparar = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMostrar(true);
      await SplashScreen.hideAsync();
    };

    preparar();

    const initSounds = async () => {
      await loadShortSounds();
      await loadLongSound();
    };
    initSounds();

    return () => {
      unloadAllSounds();
    };
  }, []);

  if (!mostrar) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#620011",
        }}
      >
        <Image
          source={require("../assets/images/splash.png")}
          style={styles.splash}
        />
      </View>
    );
  }

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle="light-content" backgroundColor="#620011" />
      <SafeAreaView style={styles.background}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="HomeScreen"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TableroScreen"
            component={TableroPreguntas}
            options={{
              title: "Pregunta",
              headerShown: false,
              headerStyle: { backgroundColor: "#0030AD" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#620011",
    flex: 1,
  },
  splash: {
    resizeMode: "contain",
    width: logoSize,
    height: logoSize,
  },
});
