import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { BottomSheet } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../App';
import Modal from 'react-native-modal';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const categories = [
  { name: 'Grocery', icon: 'shopping-cart', color: '#C8E6C9' },
  { name: 'Gifts', icon: 'gift', color: '#E1BEE7' },
  { name: 'Bar & Cafe', icon: 'coffee', color: '#FFECB3' },
  { name: 'Health', icon: 'heartbeat', color: '#F8BBD0' },
  { name: 'Commute', icon: 'car', color: '#B2EBF2' },
  { name: 'Electronics', icon: 'tv', color: '#FFCDD2' },
  { name: 'Laundry', icon: 'tint', color: '#B3E5FC' },
  { name: 'Liquor', icon: 'beer', color: '#DCEDC8' },
  { name: 'Restaurant', icon: 'cutlery', color: '#C5CAE9' },
];

export default function AddExpenseIncome() {
  const [type, setType] = useState(null);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isCategoryPickerVisible, setCategoryPickerVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ key: 'form' }]}
        renderItem={() => (
          <View>
            <RNPickerSelect
              onValueChange={(value) => setType(value)}
              items={[
                { label: 'Expense', value: 'Expense' },
                { label: 'Income', value: 'Income' },
              ]}
              placeholder={{ label: 'Choose', value: null }}
              style={pickerSelectStyles}
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setCategoryPickerVisible(true)}
            >
              <Text style={styles.inputText}>{category || 'Category name'}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description (Optional)"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Dashboard')}>
              <Text style={styles.addButtonText}>Add new expense</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />

<Modal
        isVisible={isCategoryPickerVisible}
        onBackdropPress={() => setCategoryPickerVisible(false)}
        style={styles.bottomSheet}
      >
        <View style={styles.modalContent}>
          <Text style={styles.chooseCategoryText}>CHOOSE CATEGORY</Text>
          <FlatList
            data={categories}
            numColumns={3}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryOption}
                onPress={() => {
                  setCategory(item.name);
                  setCategoryPickerVisible(false);
                }}
              >
                <Icon name={item.icon} size={20} color="#555" style={[styles.icon, { backgroundColor: item.color }]} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setCategoryPickerVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%'
  },
  icon: {
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  chooseCategoryText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  categoryOption: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  categoryText: {
    fontSize: 16,
    marginTop: 5,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
});
