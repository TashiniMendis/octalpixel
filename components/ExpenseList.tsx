import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<{ id: string; title: string; amount: number }[]>([]);
  
  // Get the navigation object
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const { data, error } = await supabase.from('expenses').select('*');
    if (error) console.error(error);
    else setExpenses(data);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.amount}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
