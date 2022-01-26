import firebase, { auth } from "../Services/Firebase";

import React, { useContext, useState, useEffect } from "react"

// Creates a React context which are useful when data needs to be passed to multiple components such as our firebase
// functionality.
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

// children is how you pass all props to a component even if not directly passed to a variable.
// Example:
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function FancyBorder(props) {
//   return (
//     <div className={'FancyBorder FancyBorder-' + props.color}>
//       {props.children}
//     </div>
//   );
// }
//
// function WelcomeDialog() {
//   return (
//     <FancyBorder color="blue">
//       <h1 className="Dialog-title">
//         Welcome
//       </h1>
//       <p className="Dialog-message">
//         Thank you for visiting our spacecraft!
//       </p>
//     </FancyBorder>
//   );
// }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Will have FancyBorder display all the html even though it is not passed as an argument/prop directly.
export function AuthProvider({ children }){
    // Checks if there is a user signed in and if not then null.
    const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser | null);

    // Loading gets set to true to prevent automatic kick-out to login screen.
    const [loading, setLoading] = useState(true);

    function deleteAccount(UID) {
        return auth.currentUser.delete();
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    // Whenever we do anything that could change our user or such we are going to set the currentUser.
    // Now currentUser can either be null(no user signed in) or the user so handle null case.
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, []);


    const value = {
        currentUser,
        deleteAccount,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    // Allows for Components below to be kept up to date when changes are made to the context(i.e. data).
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}