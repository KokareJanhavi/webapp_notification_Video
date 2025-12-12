import HeroButton from "@/components/HeroButton";
import { initNotifications, scheduleLocalNotification } from "@/services/notificationService";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  const router = useRouter();

  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={["#FF416C", "#FF4B2B"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>WebView + Notifications</Text>
      </LinearGradient>

      {/* WEB VIEW */}
      <View style={styles.webWrapper}>
        <WebView
          source={{ uri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }}
          style={{ flex: 1 }}
          onLoadEnd={() =>
            scheduleLocalNotification("Page Loaded", "Tap to open Video", "/video")
          }
        />
      </View>

      {/* BOTTOM ACTION BUTTON */}
      <View style={styles.controlsContainer}>
        <View style={styles.buttonStack}>
          <HeroButton
            title="Go To Video Player"
            color="goToVideo"
            onPress={() => router.push("/video")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    paddingTop: 45,
    paddingBottom: 26,
    paddingHorizontal: 20,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
  },

  webWrapper: {
    flex: 1,
    marginTop: 14,
    marginHorizontal: 18,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  controlsContainer: {
    backgroundColor: "#000", 
    paddingVertical: 40,
    paddingHorizontal: 18,

    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
marginBottom:40,
    paddingBottom: 0,
  },

  buttonStack: {
    gap: 14,
    flexDirection: "row",
    justifyContent: "center",
  },
});
