import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FadeWrapper from "@/components/transitions/FadeWrapper";

export default function Welcome() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento inicial de recursos
    const timer = setTimeout(() => setIsAppLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Tela de carregamento
  if (isAppLoading) {
    return (
      <FadeWrapper style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F59E0B" />
      </FadeWrapper>
    );
  }

  // Tela normal
  return (
    <FadeWrapper style={styles.container}>
      <View style={styles.brandContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="sunny" size={50} color="#F59E0B" />
        </View>
        <Text style={styles.brandName}>Solis Orium</Text>
        <Text style={styles.tagline}>
          Incentivando a Mobilidade Elétrica e a Energia Solar por Meio da Tecnologia
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/login")}>
          <Text style={styles.primaryButtonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </FadeWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  brandContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  brandName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});