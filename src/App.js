import { useState, useEffect } from 'react'
import styled from 'styled-components'
import FarmTown from './components/FarmTown'
import { Amplify, Auth } from "aws-amplify"
import { Authenticator, AuthState } from "@aws-amplify/ui-react"
import "./App.css"
import "@aws-amplify/ui-react/styles.css"

import awsExports from "./aws-exports"
Amplify.configure(awsExports)

// const components = {
//   Header,
//   SignIn: {
//     Header: SignInHeader,
//     Footer: SignInFooter
//   },
//   Footer
// };

// components={components}

function App() {
  const [authState, setAuthState] = useState()
  const [user, setUser] = useState()

  // Add Custom Header:
  // https://ui.docs.amplify.aws/components/authenticator#customization

  return (
    <StyledApp className="App">
      <Authenticator loginMechanisms={['username']} hideSignUp initialState='signIn'
        // components={{
        //   SignIn: {
        //     Header: (
        //       .login
        //     )
        //   }
        // }}
      >
        {({ signOut, user }) => (
          <FarmTown signOut={signOut} user={user} />
        )}
      </Authenticator>
    </StyledApp>
  )
}

const StyledApp = styled.div`
.amplify-tabs {
  display: none;
}
.amplify-button[data-variation='primary'] {
  background: linear-gradient(
    to right,
    var(--amplify-colors-green-80),
    var(--amplify-colors-orange-40)
  );
}
`


export default App
