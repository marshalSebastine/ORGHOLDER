import { createContext } from 'react';

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

export default function userReducer(user, action) {
    switch (action.type) {
      case 'setuser': {
        return {...action.user}
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
}
