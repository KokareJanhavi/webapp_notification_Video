import { initNotifications, scheduleLocalNotification } from "@/services/notificationService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const STREAM_LIST = [
  { title: "Mux Stream", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
  { title: "Big Buck Bunny", url: "https://test-streams.mux.dev/bbb-360p/bbb-360p.m3u8" },
  { title: "Tears of Steel", url: "https://test-streams.mux.dev/tears-of-steel/playlist.m3u8" },
];

export default function SimpleVideoScreen() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [streamIndex, setStreamIndex] = useState(0);

  useEffect(() => {
    initNotifications();
  }, []);

  const switchStream = async (index) => {
    setStreamIndex(index);
    if (!videoRef.current) return;
    await videoRef.current.stopAsync();
    await videoRef.current.loadAsync({ uri: STREAM_LIST[index].url }, { shouldPlay: true });
    scheduleLocalNotification("Stream Changed", STREAM_LIST[index].title, "/video"); 
  };

  return (
    <View style={styles.container}>
  <LinearGradient
        colors={["#FF416C", "#FF4B2B"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Video player</Text>
      </LinearGradient>
      {/* Video Player */}
      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          source={{ uri: STREAM_LIST[streamIndex].url }}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={setStatus}
          style={styles.video}
        />
      </View>

      {/* Stream Switcher */}
      <View style={styles.streamList}>
        {STREAM_LIST.map((s, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => switchStream(i)}
            style={[styles.streamButton, i === streamIndex && styles.activeStream]}
          >
            <Text style={styles.streamText}>{s.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => {
            if (status?.isPlaying) {
              videoRef.current.pauseAsync();
              scheduleLocalNotification("Paused", STREAM_LIST[streamIndex].title, "/video"); // ✅ notify pause
            } else {
              videoRef.current.playAsync();
              scheduleLocalNotification("Playing", STREAM_LIST[streamIndex].title, "/video"); // ✅ notify play
            }
          }}
        >
          <Ionicons name={status?.isPlaying ? "pause" : "play"} size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() =>
            videoRef.current?.setPositionAsync((status?.positionMillis || 0) - 10000)
          }
        >
          <MaterialIcons name="replay-10" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() =>
            videoRef.current?.setPositionAsync((status?.positionMillis || 0) + 10000)
          }
        >
          <MaterialIcons name="forward-10" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => {
            const newMuted = !status?.isMuted;
            videoRef.current.setIsMutedAsync(newMuted);
            scheduleLocalNotification(
              newMuted ? "Muted" : "Unmuted",
              STREAM_LIST[streamIndex].title,
              "/video"
            ); // ✅ notify mute toggle
          }}
        >
          <Ionicons name={status?.isMuted ? "volume-mute" : "volume-high"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1,backgroundColor: "#000", padding: 20 },
  
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

  videoWrapper: {
    height: 220,
    backgroundColor: "#222",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  streamList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  streamButton: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
  },
  activeStream: {
    backgroundColor: "#E50914",
    borderColor: "#E50914",
  },
  streamText: {
    color: "#fff",
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#111",
    borderRadius: 12,
  },
  controlBtn: {
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 50,
  },
});
