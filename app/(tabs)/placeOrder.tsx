import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: `Item ${items.length + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
      qty: 1,
    };
    setItems([...items, newItem]);
    setTotal(total + newItem.price);
  };

  const incrementQty = (id) => {
    setItems(items.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item));
    setTotal(total + items.find((item) => item.id === id).price);
  };

  const decrementQty = (id) => {
    setItems(
        items.map((item) =>
            item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
        )
    );
    setTotal(total - items.find((item) => item.id === id).price);
  };

  const removeItem = (id) => {
    const itemToRemove = items.find((item) => item.id === id);
    setItems(items.filter((item) => item.id !== id));
    setTotal(total - itemToRemove.price * itemToRemove.qty);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Place Order Screen</Text>
        <Button title="Add Item" onPress={addItem} />

        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  <Text style={styles.itemText}>{item.name} - ${item.price}</Text>
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={() => decrementQty(item.id)}>
                      <Ionicons name="remove-circle" size={24} color="red" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => incrementQty(item.id)}>
                      <Ionicons name="add-circle" size={24} color="green" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
            )}
        />

        <Text style={styles.totalText}>Total: ${total}</Text>
        <Button title="Proceed to Payment" onPress={() => alert("Payment Gateway Coming Soon!")} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 16,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});
export default Page;