import React, {useState} from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {ItemModel} from "../../model/ItemModel";

const ItemComponent: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [qty, setQty] = useState<string>('');
    const [items, setItems] = useState<ItemModel[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddItem = () => {
        if (!name || !price || !qty) {
            Alert.alert("Error", 'All fields are required');
            return;
        }

        const newItem = new ItemModel(
            items.length + 1,
            name,
            parseInt(qty),
            parseFloat(price)
        );

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

    const handleEdit = (index: number) => {
        const item = items[index];
        setName(item.Name);
        setPrice(item.Price.toString());
        setQty(item.Quantity.toString());
        setEditingIndex(index);
    };

    const handleDelete = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{editingIndex !== null ? "Edit Item" : "Add Item"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="QTY"
                value={qty}
                onChangeText={setQty}
                keyboardType="numeric"
            />

            <Button
                title={editingIndex !== null ? "Update" : "Add"}
                onPress={handleAddItem}
            />

            <FlatList
                data={items}
                keyExtractor={(item) => item.ItemID.toString()}
                renderItem={({item, index}) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.itemText}>{item.Name}</Text>
                            <Text style={styles.itemText}>Price: {item.Price}</Text>
                            <Text style={styles.itemText}>QTY: {item.Quantity}</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => handleEdit(index)}>
                                <Ionicons name="create-outline" size={24} color="blue"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(index)}>
                                <Ionicons name="trash-outline" size={24} color="red"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

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

export default ItemComponent;
