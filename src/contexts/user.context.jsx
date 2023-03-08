import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// the actual context value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


// the contextual component that will wrap around any component that will use the context
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // generating the value to pass as the value att
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        // returns a func that allows us to stop the listener when the comp unmounts
        const unsubscribe = onAuthStateChangedListener((user) => {
            user && createUserDocumentFromAuth(user);

            setCurrentUser(user)
        });

        return unsubscribe;
    }, []);

    return (
        // value att holds the actual contextual value
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
