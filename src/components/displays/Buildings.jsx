import styled from 'styled-components'
import { brownColors } from '../../style/colors'

export const BuildingsDisplay = ({
  closeDisplay
}) => {

  return (
    <StyledBuildingsDisplay>
      <div className="close-display">
        <button onClick={closeDisplay}>Close</button>
      </div>
      <div className="container">
        <h1>Buildings</h1>
        <p className="display-body-text">
          Could of, would of, should of...
        </p>
      </div>
    </StyledBuildingsDisplay>
  )
}

const StyledBuildingsDisplay = styled.div`
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

  .close-display {
    position: fixed;
    top: 70px;
    right: calc(10% + 2rem + 15px);
    padding: 15px;

    button {
      padding: .75rem 1.5rem;
      cursor: pointer;
    }
  }

  .display-body-text {
    font-size: 1.4rem;
  }
`