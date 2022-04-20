import React from 'react';
import {Realm} from '@realm/react';
import {APP_ID} from '../../constants';

// ?instance of Realm app
const appId = APP_ID;
const appConfig = {id: appId, timeout: 10000};

const app = new Realm.App(appConfig);

const AuthContext = React.createContext(null);

const AuthProvider = props => {
  const [user, setUser] = React.useState(app.currentUser);
  const realmRef = React.useRef(null);

  React.useEffect(() => {
    if (!user) {
      console.log('No user found, Please Login');
      return;
    }

    const config = {
      sync: {
        user,
        partitionValue: `user=${user.id}`,
      },
    };

    Realm.open(config).then(userRealm => {
      realmRef.current = userRealm;
    });

    return () => {
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
      }
    };
  }, [user]);

  //   Functions
  const signIn = (email = 'raymond@inc.com', password = '12345678') => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    app
      .logIn(credentials)
      .then(newUser => setUser(newUser))
      .catch(err => console.error('Errored: ', err));
  };
  const signUp = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser({email, password});
    } catch (error) {
      console.warn('Failed to signup: ', error.message);
    }
  };

  const signOut = async () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    await user.logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{signIn, signUp, signOut, user}}>
      {props.children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const auth = React.useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() was called outside of AuthProvider');
  }
  return auth;
};

export {AuthProvider, useAuth};
