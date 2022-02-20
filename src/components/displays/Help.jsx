import styled from 'styled-components'
import { brownColors } from '../../style/colors'

export const HelpDisplay = ({
  closeHelp,
  username
}) => {

  return (
    <StyledHelpDisplay>
      <div className="close-help">
        <button onClick={closeHelp}>Close</button>
      </div>
      <div className="container">
        <h1>Help!!</h1>
        <p className="help-body-text not-left">
          You look lost, follow me ;)
        </p>
        <p className="help-body-text not-left">
          To win the game, you basically keep planting crops until you unlock level... 14!!!
        </p>
        {username && username === 'layla' && (
          <>
            <p className="help-body-text" style={{fontSize: '1.1rem',marginTop:'2rem',marginBottom:'1.2rem'}}>
              Now, a word from the author....
            </p>
            <p className="help-body-text">
              Layla!! Happy 14th birthday! I hope it is as fantastic and special as you are {'<3\n'}
            </p>
            <p className="help-body-text">
              I started building this game in December, when we were at home and I saw you playing on your phone.
              It was my inspiration, and I am so happy to share this with you.
              I built it pretty much in this last week, so there definitely WILL be some bugs.
              However, I can almost assure you that if you persist, you will make it to the other side and win your prize!!
            </p>
            <p className="help-body-text">
              Why am I doing this? Well, for one thing, we don't get to see each other that often, and that makes me kind of sad.
              I really wanted to show you with this project that I care a lot about you, and that you can come to me anytime you need help, like building a web game!
            </p>
            <p className="help-body-text">
              Eric helped write the funny af crop names and descriptions
            </p>
            <p className="help-body-text">
              I really had intended on writing more here, something heartfelt and sincere.
              However, I spent most of my time building the game :p
              I hope you enjoy. You deserve the world and more.
            </p>
            <p className="help-body-text">
              Love, Nico
            </p>
          </>
        )}
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
  background: rgba(255,255,255,.65); // ${brownColors.brown5};
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
    font-size: 1.3rem;
    font-family: sans-serif;
    margin: 0;
    margin-top: 0.2rem;
    margin-bottom: 0.8rem;
    line-height: 1.25;
    line-break: break-word;
    text-align: left;

    &.not-left {
      text-align: center;
    }
  }
`