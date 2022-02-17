import styled from 'styled-components'
import { brownColors } from '../style/colors'

export const ProfileDisplay = ({
  closeProfile,
  // user,
  // userState
}) => {

  return (
    <StyledProfileDisplay>
      <div className="close-profile">
        <button onClick={closeProfile}>Close</button>
      </div>
      <div className="container">
        <h1>Profile</h1>
        <p className="profile-body-text">
          Adventurer
        </p>
      </div>
    </StyledProfileDisplay>
  )
}

const StyledProfileDisplay = styled.div`
  position: absolute;
  top: 70px; // 60px + 10px
  bottom: 70px;
  width: 90%;
  left: 5%;
  /* padding: 2rem; */
  background: rgba(255,255,255,.5); // ${brownColors.brown5};
  border-radius: 1px;
  z-index: 1001;
  pointer-events: all !important;

  .close-profile {
    position: fixed;
    top: 70px;
    right: calc(10% + 2rem + 15px);
    padding: 15px;

    button {
      padding: .75rem 1.5rem;
      cursor: pointer;
    }
  }

  .profile-body-text {
    
  }
`