import { createContext } from 'react';

//context allows passing data between any components in the application without using props
// used here for showing logout button when logged in.
export const AuthContext = createContext({ //context object shared between components
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
