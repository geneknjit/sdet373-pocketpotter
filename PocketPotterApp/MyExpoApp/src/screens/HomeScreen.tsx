import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Starter ✅</Text>
      <Text style={styles.subtitle}>TypeScript + React Navigation</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Details", { message: "Hello from Home!" })}
      >
        <Text style={styles.buttonText}>Go to Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, opacity: 0.7, marginBottom: 24, textAlign: "center" },
  button: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, borderWidth: 1 },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
