import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HeroButton({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, styles[color]]}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  txt: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  primary: {
    backgroundColor: "#3B82F6",
  },
  success: {
    backgroundColor: "#16A34A",
  },
  warning: {
    backgroundColor: "#EAB308",
  },
goToVideo: {
    backgroundColor: "#ea1708ff",
  },
});
