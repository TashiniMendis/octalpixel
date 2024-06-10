// import React, { useState } from 'react'
// import { Alert, StyleSheet, View, AppState } from 'react-native'
// import { supabase } from '../lib/supabase'
// import { Button, Input } from '@rneui/themed'

// // Tells Supabase Auth to continuously refresh the session automatically if
// // the app is in the foreground. When this is added, you will continue to receive
// // `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// // if the user's session is terminated. This should only be registered once.
// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh()
//   } else {
//     supabase.auth.stopAutoRefresh()
//   }
// })

// export default function Auth() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   async function signInWithEmail() {
//     setLoading(true)
//     const { error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     })

//     if (error) Alert.alert(error.message)
//     setLoading(false)
//   }

//   async function signUpWithEmail() {
//     setLoading(true)
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     })

//     if (error) Alert.alert(error.message)
//     if (!session) Alert.alert('Please check your inbox for email verification!')
//     setLoading(false)
//   }

//   return (
//     <View style={styles.container}>
//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Input
//           label="Email"
//           leftIcon={{ type: 'font-awesome', name: 'envelope' }}
//           onChangeText={(text) => setEmail(text)}
//           value={email}
//           placeholder="email@address.com"
//           autoCapitalize={'none'}
//         />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <Input
//           label="Password"
//           leftIcon={{ type: 'font-awesome', name: 'lock' }}
//           onChangeText={(text) => setPassword(text)}
//           value={password}
//           secureTextEntry={true}
//           placeholder="Password"
//           autoCapitalize={'none'}
//         />
//       </View>
//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     padding: 12,
//   },
//   verticallySpaced: {
//     paddingTop: 4,
//     paddingBottom: 4,
//     alignSelf: 'stretch',
//   },
//   mt20: {
//     marginTop: 20,
//   },
// })

import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@rneui/themed';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('signin'); // Default mode is Sign In
  const [showPassword, setShowPassword] = useState(false);
  // const navigation = useNavigation();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const isInputValid = email.trim() !== '' && password.trim() !== '';

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else navigation.navigate('Dashboard');
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's {mode === 'signin' ? 'sign you in' : 'sign you up'}.</Text>
      <Text style={styles.subtitle}>Welcome back to your workspace!</Text>
      
      <View style={styles.verticallySpaced}>
        <Input
          label="Email"
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Phone, email or username"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword} // Use secureTextEntry based on showPassword state
          placeholder="Password"
          autoCapitalize={'none'}
          rightIcon={{ type: 'font-awesome', name: showPassword ? 'eye-slash' : 'eye', size: 20, onPress: () => setShowPassword(!showPassword) }} // Toggle showPassword state
        />
      </View>
      
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          <TouchableOpacity onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
            <Text style={styles.registerLink}>{mode === 'signin' ? 'Register' : 'Sign In'}</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={mode === 'signin' ? 'Sign In' : 'Sign Up'}
          buttonStyle={[styles.button, !isInputValid && { backgroundColor: '#ccc' }]} // Disable button if input is not valid
          titleStyle={styles.buttonTitle}
          disabled={!isInputValid || loading} // Disable button if input is not valid or loading
          onPress={mode === 'signin' ? signInWithEmail : signUpWithEmail}
        />
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 32,
    color: '#888',
    marginBottom: 20,
  },
  verticallySpaced: {
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    color: '#888',
  },
  inputContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  forgotPassword: {
    color: '#554AF0',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 10
  },
  button: {
    backgroundColor: '#554AF0',
    borderRadius: 10,
  },
  buttonTitle: {
    color: '#fff',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    
  },
  registerText: {
    color: '#888',
    fontSize: 14,
    
  },
  registerLink: {
    color: '#554AF0',
    fontSize: 14,
    
  },
});
