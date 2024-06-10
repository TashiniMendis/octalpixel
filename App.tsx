// import { useState, useEffect } from 'react'
// import { supabase } from './lib/supabase'
// import Auth from './components/Auth'
// import Account from './components/Account'
// import { View } from 'react-native'
// import { Session } from '@supabase/supabase-js'


// export default function App() {
//   const [session, setSession] = useState<Session | null>(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   return (
//     <View>
//       {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
//     </View>
//   )
// }


import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Account from './components/Account';
import Dashboard from './components/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import AddExpenseIncome from './components/AddExpenseIncome';

// Define your stack parameter list
export type RootStackParamList = {
  Auth: undefined;
  Account: { session: Session };
  Expenses: undefined;
  AddExpense: undefined;
  Dashboard: undefined;
  AddExpenseIncome: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? (
          <>
            {/* <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} /> */}
            <Stack.Screen name="Account" options={{ title: 'Account' }}>
              {() => <Account key={session.user.id} session={session} />}
            </Stack.Screen>
            <Stack.Screen name="Expenses" component={ExpenseList} options={{ title: 'Expenses' }} />
            <Stack.Screen name="AddExpense" component={AddExpense} options={{ title: 'Add Expense' }} />
            <Stack.Screen name="Dashboard" options={{ title: 'Dashboard' }} component={Dashboard} />
            <Stack.Screen name="AddExpenseIncome" component={AddExpenseIncome} options={{ title: 'Add new' }}/>
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} options={{ title: '' }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
