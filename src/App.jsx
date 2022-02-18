import { useState, useEffect, lazy, Suspense } from 'react'
import styled from 'styled-components'
import FarmTown from './components/FarmTown'
import { Amplify, Auth } from "aws-amplify"
import { Authenticator, AuthState } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"

import awsExports from "./aws-exports"
import { Loader } from './components/LoaderUI'
Amplify.configure(awsExports)

const LoginFarm = lazy(() => import('./components/LoginFarm'))
const LazyFarmTown = lazy(() => import('./components/FarmTown'))

function App() {
  const [authState, setAuthState] = useState('signIn')
  const [user, setUser] = useState()

  useEffect(() => {
    if(!user) {
      setAuthState('signIn')
    }
  }, [user])

  // Add Custom Header:
  // https://ui.docs.amplify.aws/components/authenticator#customization

  return (
    <StyledApp className="App">
      {authState === 'signIn' && (
        <div className="login-farm-container">
          <Suspense fallback={<></>}>
            <LoginFarm />
          </Suspense>
        </div>
      )}
      <Authenticator loginMechanisms={['username']} hideSignUp initialState={authState}
        components={{
          Header: () => (
            <div className="login-page-header">
              
            </div>
          ),
          SignIn: {
            Header: () => (
              <header className="login-header">
                {/* Render the Farm SVG */}
                <img src={'/farm.svg'} height={100} width={100} alt="farm town logo" />
                <h1 className="login-header-text">Farm Town</h1>
              </header>
            )
          },
          // Footer: () => (
          //   <footer className="login-page-footer">
          //     login footer
          //   </footer>
          // )
        }}
      >
        {({ signOut, user }) => (
          <Suspense fallback={<></>}>
            <LazyFarmTown signOut={signOut} user={user} />
          </Suspense>
        )}
      </Authenticator>
    </StyledApp>
  )
}

const StyledApp = styled.div`
height: 100%;

.login-farm-container {
  height: 100vh;
  width: 100vw;
  position: absolute;
}
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

.login-page-header {
  height: 25vh;
}
.login-header {
  padding-top: 18px;
}
.login-header-text {
  margin: 0;
  margin-top: 9px;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 2rem;
}
.login-page-footer {
  margin-top: auto;

}
`


export default App
