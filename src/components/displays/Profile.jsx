import styled from 'styled-components'
import { brownColors } from '../../style/colors'

export const ProfileDisplay = ({
  userImages,
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
        <div className="pictures-container">
          {userImages.map((image, index) => (
            <img key={`picture-${image.key}`} src={image.file} style={{maxHeight: 300, width:'auto'}} alt={`user-${image.key}`} />
          ))}
        </div>
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
  background: rgba(255,255,255,.65); // ${brownColors.brown5};
  border-radius: 1px;
  z-index: 1001;
  pointer-events: all !important;
  overflow-y: auto;
  padding-bottom: 2rem;

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