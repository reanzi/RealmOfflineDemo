import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import colors from './app/styles/colors';
import {AuthProvider, useAuth} from './app/context/authContext';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import TaskContext from './app/models/Task';

const {useRealm, RealmProvider} = TaskContext;

const Home = () => {
  const realm = useRealm();
  const {user, signOut} = useAuth();
  console.log('Active User: ', user.id);
  console.log('Realm Path: ', realm.path);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home page</Text>
      <Pressable
        onPress={() => signOut()}
        style={[
          styles.button,
          {
            backgroundColor: 'red',
          },
        ]}>
        <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
          log Out
        </Text>
      </Pressable>
    </View>
  );
};
function App() {
  const {user, signIn, signOut} = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <RealmProvider sync={{user, partitionValue: `${user.id}`}}>
          <Home />
        </RealmProvider>
      ) : (
        <View style={{}}>
          <Text style={styles.text}>Login Page</Text>
          <Pressable
            onPress={() => signIn()}
            style={[
              styles.button,
              {
                backgroundColor: 'indigo',
              },
            ]}>
            <Text style={{fontSize: 18, color: 'white', letterSpacing: 1.3}}>
              Login
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: colors.darkBlue,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function AppWrapper() {
  if (!RealmProvider) {
    return null;
  }
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWrapper;
