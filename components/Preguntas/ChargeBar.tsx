import { StyleSheet, View } from "react-native";

type Prop = {
  recompensa: number;
};

const Bar = ({ recompensa }: Prop): React.JSX.Element => {
  return (
    <View style={styles.container_bar}>
      <View style={styles.bar}>
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.stick,
              i < recompensa && styles.charged, 
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_bar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,
  },
  bar: {
    width: 250,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    backgroundColor: "#fff",
    borderColor: "#0030AD",
    borderWidth: 2,
    borderRadius: 12,
  },
  stick: {
    flex: 1,
    height: "100%",
    marginHorizontal: 1,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  charged: {
    backgroundColor: "#0030AD",
  },
});

export default Bar;
