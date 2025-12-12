import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  const goNext = () => router.push("/webView");

  return (
    <LinearGradient colors={["#FF416C", "#FF4B2B"]} style={styles.gradient}>
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* PLAY BUTTON */}
          <TouchableOpacity style={styles.playWrapper} onPress={goNext}>
            <View style={styles.playCircle}>
              <Ionicons name="play" size={40} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* TITLE */}
          <View style={styles.textWrapper}>
            <Text style={styles.bigTitle}>Player</Text>
            <Text style={styles.bigTitle}>
              that <Text style={styles.highlight}>plays</Text>
            </Text>
            <Text style={styles.bigTitle}>All</Text>

            <Text style={styles.subtitle}>
              Ultimate solution to your media capabilities.
            </Text>
          </View>

          {/* ARROW BUTTON */}
          <TouchableOpacity style={styles.arrowButton} onPress={goNext}>
            <Ionicons name="arrow-forward" size={28} color="#fff" />
          </TouchableOpacity>

        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  playWrapper: {
    alignItems: "center",
    marginBottom: 50,
  },

  playCircle: {
    width: 110,
    height: 110,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.20)",
    justifyContent: "center",
    alignItems: "center",
  },

  textWrapper: { marginTop: 10 },

  bigTitle: {
    fontSize: 45,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 52,
  },

  highlight: { color: "#FFDCE8" },

  subtitle: {
    color: "#ffeef5",
    marginTop: 14,
    fontSize: 16,
    opacity: 0.95,
  },

  arrowButton: {
    position: "absolute",
    bottom: 40, 
    right: 30,
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 18,
    borderRadius: 50,
  },
});
