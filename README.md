# RealmOfflineDemo
A demo application to test offline capability with Realm while offline (airplane mode), Indented behavior is "Re-Authenticate the last active user on App restart"


1. Create Realm App using the Realm UI in Mongodb to get the APP_ID,
2. Enable sync
3. For Authentication enable ```Email/Password```
4. Just create a test user, using the Realm UI for testing
5. For demo, I've hardcoded ```email='raymond@inc.com' / password='12345678'```, as a test user

```
<app/context/AuthContext.js>
const signIn = (email = 'raymond@inc.com', password = '12345678') => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    app
      .logIn(credentials)
      .then(newUser => setUser(newUser))
      .catch(err => console.error('Errored: ', err));
  };
  ```
  
### You can clone as it is, just change the ```APP_ID```  and the ```test user``` with yours
