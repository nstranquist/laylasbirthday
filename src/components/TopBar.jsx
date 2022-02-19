

export const TopBar = ({
  username,
  gold,
  xp,
  toggleProfile,
  toggleHelp,
  signOut,
}) => {
  const uploadFile = (e) => {
    console.log(e.target.files)
  }
  return (
    <div className="topbar-overlay">
      <ul className="topbar-stats-list topbar-left">
        <li className="topbar-stats-item icon-item">
          <img src={'/ui-icons/coin.png'} height={30} width={30} alt="gold icon" />
          <span className="item-text">Gold: {gold}</span>
        </li>
        <li className="topbar-stats-item icon-item">
          <img src={'/ui-icons/xp-gold.png'} height={30} width={30} alt="xp icon" />
          <span className="item-text">XP: {xp}</span>
        </li>
      </ul>
      <ul className="topbar-stats-list topbar-right">
        <li className="topbar-stats-item topbar-action-item" onClick={() => toggleProfile()}>Welcome, {username || '???'}!</li>
        <li className="topbar-stats-item topbar-action-item" onClick={() => toggleHelp()}>Help</li>
        <li className="topbar-stats-item topbar-action-item" onClick={async () => await signOut()}>Log Out</li>
      </ul>
    </div>
  )
}