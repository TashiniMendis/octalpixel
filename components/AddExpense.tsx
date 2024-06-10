import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

export default function AddExpense() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function handleAddExpense() {
    setLoading(true);
    const { error } = await supabase.from('expenses').insert({ title, amount: parseFloat(amount) });
    if (error) Alert.alert(error.message);
    else navigation.goBack();
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Input label="Title" value={title} onChangeText={setTitle} />
      <Input label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Button title="Add Expense" onPress={handleAddExpense} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
