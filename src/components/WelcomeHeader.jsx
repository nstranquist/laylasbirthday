import logo from "../logo.svg"

export const WelcomeHeader = ({ user, signOut }) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Hello {user.username}</p>
      <p>
        <button onClick={signOut}>Sign Out</button>
      </p>
    </header>
  )
}
