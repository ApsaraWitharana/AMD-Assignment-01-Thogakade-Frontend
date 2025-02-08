import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

function Item() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddItem = () => {
    if (!name || !price || !qty) {
      Alert.alert("Error", 'All fields are required');
      return;
    }

    const newItem = { name, price, qty};

    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = newItem;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setName('');
    setPrice('');
    setQty('');

  };

  const handleEdit = (index) => {
    setName(items[index].name);
    setPrice(items[index].price);
    setQty(items[index].qty);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };


  return (
      <View style={styles.container}>
        <Text style={styles.title}>{editingIndex !== null ? "Edit Item" : "Add Item"}</Text>

        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} />
        <TextInput style={styles.input} placeholder="QTY" value={qty} onChangeText={setQty} />

        <Button title={editingIndex !== null ? "Update" : "Add"} onPress={handleAddItem} />

        <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>Price: {item.price}</Text>
                    <Text style={styles.itemText}>QTY: {item.qty}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => handleEdit(index)}>
                      <Ionicons name="create-outline" size={24} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(index)}>
                      <Ionicons name="trash-outline" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
            )}
        />

        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    fontSize: 16,
    color: "#333",
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default Item;
