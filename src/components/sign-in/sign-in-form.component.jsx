import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    // console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password.');
                    break;
                case 'user-not-found':
                    alert('No user associated with this email.');
                    break;
                case 'auth/network-request-failed':
                    alert('Could not connect to server. Check your internet connection.');
                    break;
                default:
                    console.log(error);
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({...formFields, [name]: value});  // keep the state of the unmodified input fields except the one being changed
    }


    return (
        <div className="sign-up-form-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;