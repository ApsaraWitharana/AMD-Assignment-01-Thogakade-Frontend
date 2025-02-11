import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {CustomerModel} from "../../model/CustomerModel";

const Customer: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddCustomer = () => {
        if (!name || !email || !address) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            if (editingIndex !== null) {
                // Update existing customer
                const updatedCustomers = [...customers];
                updatedCustomers[editingIndex] = new CustomerModel(
                    updatedCustomers[editingIndex].CustomerID,
                    name,
                    address,
                    email
                );
                setCustomers(updatedCustomers);
                setEditingIndex(null);
            } else {
                // Add new customer
                const newCustomerID = customers.length > 0 ? customers[customers.length - 1].CustomerID + 1 : 1;
                const newCustomer = new CustomerModel(newCustomerID, name, address, email);
                setCustomers([...customers, newCustomer]);
            }

            setName('');
            setEmail('');
            setAddress('');
            setLoading(false);
            Alert.alert('Success', 'Customer saved successfully.');
        }, 1000);
    };

    const handleEdit = (index: number) => {
        const customer = customers[index];
        setName(customer.Name);
        setEmail(customer.Email);
        setAddress(customer.Address);
        setEditingIndex(index);
    };

    const handleDelete = (index: number) => {
        const updatedCustomers = customers.filter((_, i) => i !== index);
        setCustomers(updatedCustomers);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{editingIndex !== null ? 'Edit Customer' : 'Add Customer'}</Text>

            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

            {loading ? (
                <ActivityIndicator size="small" color="#007bff" />
            ) : (
                <Button title={editingIndex !== null ? 'Update' : 'Add'} onPress={handleAddCustomer} />
            )}

            <FlatList
                data={customers}
                keyExtractor={(item) => item.CustomerID.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.customerRow}>
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerText}>{item.Name}</Text>
                            <Text style={styles.customerText}>{item.Email}</Text>
                            <Text style={styles.customerText}>{item.Address}</Text>
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
    Button:{
        cursor: 'pointer',
        borderColor: '#054305',
        borderRadius: 25,
        width:'50%',

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
