// Dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { RootStackParamList } from '../App';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const data = [
  {
    id: '1',
    category: 'Groceries',
    title: 'Egg & veggies',
    amount: -500,
    icon: 'shopping-cart',
    date: 'Today',
  },
  {
    id: '2',
    category: 'Health',
    title: 'Health',
    amount: -352,
    icon: 'heartbeat',
    date: 'Today',
  },
  {
    id: '3',
    category: 'Bar & cafe',
    title: 'Hangouts with Sujay',
    amount: -352,
    icon: 'coffee',
    date: 'Today',
  },
  {
    id: '1',
    category: 'Groceries',
    title: 'Egg & veggies',
    amount: -500,
    icon: 'shopping-cart',
    date: 'Yesterday',
  },
  {
    id: '2',
    category: 'Health',
    title: 'Health',
    amount: -352,
    icon: 'heartbeat',
    date: 'Yesterday',
  },
  {
    id: '3',
    category: 'Bar & cafe',
    title: 'Hangouts with Sujay',
    amount: -352,
    icon: 'coffee',
    date: 'Yesterday',
  },
];

const groupByDate = (data: any) => {
    return data.reduce((groups: any, item: any) => {
      const date = item.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});
  };

  const getIconBackgroundColor = (category: any) => {
    switch (category) {
      case 'Groceries':
        return '#C8E6C9'; // Change the color for Groceries category
      case 'Health':
        return '#F8BBD0'; // Change the color for Health category
      case 'Bar & cafe':
        return '#FFECB3'; // Change the color for Bar & cafe category
      // Add more cases for other categories as needed
      default:
        return '#888'; // Default color
    }
  };

export default function Dashboard() {
    const groupedData = groupByDate(data);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>App</Text>
        <View style={styles.headerRight}>
          <Icon name="search" type="font-awesome" color="#424242" size={14}/>
          <Text>    </Text>
          <Icon name="user" type="font-awesome" color="#424242" size={14}/>
        </View>
      </View>
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
            <Icon type='font-awesome' name='money' color='#757575'/>
          <Text style={styles.expensesAmount}>₹12,000</Text>
          <Text style={styles.summaryTitle}>Expenses</Text>
          
        </View>
        <View style={styles.summaryItem}>
        <Icon type='font-awesome' name='book' color='#757575'/>
          <Text style={styles.balanceAmount}>₹48,000</Text>
          <Text style={styles.summaryTitle}>Balance</Text>
        </View>
        <View style={styles.summaryItem}>
        <Icon type='font-awesome' name='bank' color='#757575'/>
          <Text style={styles.incomeAmount}>₹70,000</Text>
          <Text style={styles.summaryTitle}>Income</Text>
        </View>
      </View>

      {Object.keys(groupedData).map((date) => (
        <View key={date} style={styles.groupContainer}>
          <View style={styles.itemTopic} >
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.total}>₹1125</Text>
          </View>
          <FlatList
            data={groupedData[date]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Icon name={item.icon} type="font-awesome" color='#fff' containerStyle={[styles.icon, { backgroundColor: getIconBackgroundColor(item.category) }]}/>
                  <View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                </View>
                <Text style={styles.itemAmount}>₹{item.amount}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddExpenseIncome')}>
        <Text style={styles.addButtonText}>+ Add new</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#888',
  },
  expensesAmount: {
    color: 'red',
    fontSize: 18,
  },
  balanceAmount: {
    color: 'green',
    fontSize: 18,
  },
  incomeAmount: {
    color: 'blue',
    fontSize: 18,
  },
  itemTopic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  total: {
    marginRight: 1,
    textAlign: 'right',
    marginBottom: 10
  },
  groupContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemCategory: {
    fontSize: 14,
    color: '#888',
  },
  itemAmount: {
    fontSize: 16,
    color: 'red',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BEF',
    padding: 15,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

// // Function to group data by date
// const groupByDate = (data) => {
//   return data.reduce((groups, item) => {
//     const date = item.date;
//     if (!groups[date]) {
//       groups[date] = [];
//     }
//     groups[date].push(item);
//     return groups;
//   }, {});
// };