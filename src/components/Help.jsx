import styled from 'styled-components'
import { brownColors } from '../style/colors'

export const HelpDisplay = ({
  closeHelp
}) => {

  return (
    <StyledHelpDisplay>
      <div className="close-help">
        <button onClick={closeHelp}>Close</button>
      </div>
      <div className="container">
        <h1>Help!!</h1>
        <p className="help-body-text">
          You look lost, follow me ;)
        </p>
      </div>
    </StyledHelpDisplay>
  )
}

const StyledHelpDisplay = styled.div`
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

  .close-help {
    position: fixed;
    top: 70px;
    right: calc(10% + 2rem + 15px);
    padding: 15px;

    button {
      padding: .75rem 1.5rem;
      cursor: pointer;
    }
  }

  .help-body-text {
    
  }
`