import {Alert, Button, StyleSheet, Text, TextInput,View, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


function Customer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddCustomer = () => {
        if (!name || !email || !address) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        Alert.alert("Customer added successfully.");

        setLoading(true);

        setTimeout(() => {
            if (editingIndex !== null) {
                // Update existing customer
                const updatedCustomers = [...customers];
                updatedCustomers[editingIndex] = { name, email, address };
                setCustomers(updatedCustomers);
                setEditingIndex(null);
            } else {
                // Add new customer
                setCustomers([...customers, { name, email, address }]);
            }

            setName('');
            setEmail('');
            setAddress('');
            setLoading(false);
        }, 1000);
    };

    const handleEdit = (index) => {
        setName(customers[index].name);
        setEmail(customers[index].email);
        setAddress(customers[index].address);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedCustomers = customers.filter((_, i) => i !== index);
        setCustomers(updatedCustomers);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{editingIndex !== null ? "Edit Customer" : "Add Customer"}</Text>

            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <Button title={editingIndex !== null ? "Update" : "Add"} onPress={handleAddCustomer} />
            )}

            <FlatList
                data={customers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.customerRow}>
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerText}>{item.name}</Text>
                            <Text style={styles.customerText}>{item.email}</Text>
                            <Text style={styles.customerText}>{item.address}</Text>
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
    customerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
    },
    customerInfo: {
        flex: 1,
    },
    customerText: {
        fontSize: 16,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});

export default Customer;
