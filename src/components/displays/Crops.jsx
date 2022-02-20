import styled from 'styled-components'
import { brownColors } from '../../style/colors'
import { crops } from '../../data/cropsWiki'

export const CropsDisplay = ({
  closeDisplay
}) => {

  return (
    <StyledCropsDisplay>
      <div className="close-display">
        <button onClick={closeDisplay}>Close</button>
      </div>
      <div className="container">
        <h1>Crops</h1>
        {crops.map(crop => (
          <div className="crop-display-item">
            <h3 className="crop-title">{crop.name}</h3>
            <p className="display-body-text">
              {crop.desc}
            </p>
            <p style={{margin:0,marginBottom:'.35rem'}}>LOL, did not get this far</p>
          </div>
        ))}
      </div>
    </StyledCropsDisplay>
  )
}

const StyledCropsDisplay = styled.div`
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
  .crop-display-item {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 1rem;
    background: #fff;
    border-radius: 5%;
    border: 1px solid rgba(33,33,33,.3);

    h3 {
      margin: 0;
      margin-bottom: 0.75rem;
    }
  }

  .display-body-text {
    
  }
`