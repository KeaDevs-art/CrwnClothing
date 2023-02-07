// import { useEffect } from "react";
// import { getRedirectResult } from 'firebase/auth';

import {signInWithGooglePopup, 
        createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {

    /*
    we figured when we leave the page/redirect to another page, the whole instance of our page gets discarded and we lose all auth states
    called in getRedirectResult() method to aid against this problem - to help retain the state and track app auth state
    useEffect(() => {
        async function redirectResponse() {
            const response = await getRedirectResult(auth);  // method gets auth factor for identification
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }

        redirectResponse();
    }, []);
    */

    const logGooglePopupUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>I am the sign in page!</h1>
            <button onClick={logGooglePopupUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;
