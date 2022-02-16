import create from "zustand"

const defaultAuthState = "signIn"

const store = create(() => ({
  authState: defaultAuthState, // signUp, signIn, confirmSignUp, signedIn
}))

export default store