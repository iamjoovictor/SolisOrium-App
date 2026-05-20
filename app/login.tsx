import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import FadeWrapper from "@/components/transitions/FadeWrapper"; 

export default function Login() {
  const [perfil, setPerfil] = useState<"cliente" | "integrador" | "ponto">("cliente");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validação: obriga preencher todos os campos
  const isFormValid = email.trim() !== "" && senha.trim() !== "";

  const handleLogin = () => {
    if (!isFormValid) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs modal)/integradores");
    }, 1500);
  };

  return (
    <FadeWrapper style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      
      <View style={styles.selectorContainer}>
        <TouchableOpacity style={[styles.selectorButton, perfil === "cliente" && styles.activeSelector]} onPress={() => setPerfil("cliente")}>
          <Text style={[styles.selectorText, perfil === "cliente" && styles.activeSelectorText]}>Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.selectorButton, perfil === "integrador" && styles.activeSelector]} onPress={() => setPerfil("integrador")}>
          <Text style={[styles.selectorText, perfil === "integrador" && styles.activeSelectorText]}>Integrador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.selectorButton, perfil === "ponto" && styles.activeSelector]} onPress={() => setPerfil("ponto")}>
          <Text style={[styles.selectorText, perfil === "ponto" && styles.activeSelectorText]}>Ponto</Text>
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        keyboardType="email-address" 
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      
      <TouchableOpacity 
        style={[styles.button, (!isFormValid || isLoading) && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Entrar como {perfil}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => router.push("/cadastro")} disabled={isLoading}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </FadeWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#ffffff" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#111827" },
  selectorContainer: { flexDirection: "row", backgroundColor: "#f3f4f6", borderRadius: 8, padding: 4, marginBottom: 24 },
  selectorButton: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 6 },
  activeSelector: { backgroundColor: "#ffffff", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  selectorText: { fontSize: 14, color: "#4b5563", fontWeight: "500", textTransform: "capitalize" },
  activeSelectorText: { color: "#2563eb", fontWeight: "bold" },
  input: { backgroundColor: "#f3f4f6", padding: 16, borderRadius: 8, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: "#2563eb", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 8, height: 56, justifyContent: "center" },
  buttonDisabled: { backgroundColor: "#93c5fd" },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold", textTransform: "capitalize" },
  linkButton: { marginTop: 24, alignItems: "center" },
  linkText: { color: "#2563eb", fontSize: 14 },
});