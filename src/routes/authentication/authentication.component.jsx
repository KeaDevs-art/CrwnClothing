// import { useEffect } from "react";
// import { getRedirectResult } from 'firebase/auth';

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in/sign-in-form.component";

import { Authentication } from "./authentication.styles.jsx";

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

  return (
    <Authentication>
      <SignInForm />
      <SignUpForm />
    </Authentication>
  );
};

export default SignIn;
