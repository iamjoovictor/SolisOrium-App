import React from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FadeWrapper from "@/components/transitions/FadeWrapper";

// Dados fictícios baseados no Banco de Dados (Tabela integrador)
const INTEGRADORES = Array.from({ length: 9 }).map((_, i) => ({
  id: i.toString(),
  nome: `Integrador Solar ${i + 1}`,
  preco: "R$ 20.000,00",
  icon: i % 2 === 0 ? "leaf-outline" : "sunny-outline",
}));

export default function Integradores() {
  const renderItem = ({ item }: { item: typeof INTEGRADORES[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={24} color="#F59E0B" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.integradorNome}>{item.nome}</Text>
        <Text style={styles.integradorPreco}>{item.preco}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <FadeWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orçamento Solar</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput 
            placeholder="Buscar integradores..." 
            style={styles.searchInput}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <FlatList
        data={INTEGRADORES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </FadeWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEF3C7", // Laranja bem claro
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  integradorNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  integradorPreco: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 2,
  },
});