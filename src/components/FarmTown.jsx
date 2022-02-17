import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Farm3d } from './Farm3d'
import styleConstants from '../utils/style_constants'
import { emptyTile } from './Farm3d'
import { brownColors } from '../style/colors'
import classnames from 'classnames'
import { crops } from '../data/cropsWiki'
import { HelpDisplay } from './Help'

const initialUserState = {
  gold: 0,
  xp: 0,
  timeElapsed: 0
}

const FarmTown = ({
  user,
  signOut
}) => {
  const [userState, setUserState] = useState(initialUserState)
  const [selectedTile, setSelectedTile] = useState(emptyTile)
  const [showBottomBar, setShowBottomBar] = useState(true)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    console.log('welcome to farmtown')
  }, [])

  // Active tile actions
  const cancelTileAction = () => setSelectedTile(emptyTile)

  const closeBottomBar = () => setShowBottomBar(false)
  const openBottomBar = () => setShowBottomBar(true)

  const toggleHelp = () => setShowHelp(true)
  const closeHelp = () => setShowHelp(false)

  return (
    <StyledFarmTown className={classnames({'no-pointer-events': showHelp})}>
      {showHelp && <HelpDisplay closeHelp={closeHelp} />}

      {/* <WelcomeHeader user={user} signOut={signOut} /> */}
      <Farm3d selectedTile={selectedTile} setSelectedTile={setSelectedTile} />

      {/* Overlays */}
      <div className="topbar-overlay">
        <ul className="topbar-stats-list topbar-left">
          <li className="topbar-stats-item icon-item">
            <img src={'/ui-icons/coin.png'} height={30} width={30} alt="gold icon" />
            <span className="item-text">Gold: {userState.gold}</span>
          </li>
          <li className="topbar-stats-item">XP: {userState.xp}</li>
        </ul>
        <ul className="topbar-stats-list topbar-right">
          <li className="topbar-stats-item topbar-action-item" onClick={toggleHelp}>Help</li>
        </ul>
      </div>
      <div className="left-actions-overlay">
        <ul>
          <li style={{background:"rgba(255,255,255,0.75)"}}>X</li>
          <li style={{background:"rgba(255,255,255,0.75)"}}>Y</li>
          <li style={{background:"rgba(255,255,255,0.75)"}}>Z</li>
        </ul>
      </div>
      <div className="right-sidebar-overlay">
        <div className="sidebar-layout-container">
          <div className="right-sidebar-profile">
            <div className="profile-container">
              profile
            </div>
          </div>
          <div className="right-sidebar-backpack">
            backpack
          </div>
        </div>
      </div>

      {/* Display Info about the plot selected */}
      {selectedTile.id && (
        <div className={classnames("bottom-bar-overlay", {'bottom-bar-minimized': !showBottomBar})}>
          <div className="container">
            <header className="bottom-bar-header">
              <h3 className="bottom-bar-heading">Plot Information: x: {selectedTile.x} y: {selectedTile.y}</h3>
              {showBottomBar ? <button className="close-button" onClick={closeBottomBar}>Close</button> : <button className="close-button" onClick={openBottomBar}>Show Details</button>}
            </header>
            {showBottomBar && (
              <div className="bottom-bar-body">
                {/* Render Tile Details, even swap out the right SVG */}
                <div className="farm-details-container">
                  <div className="farm-details-left">
                    <div className="farm-details-image">{<crops.carrot.SvgImage />}</div>
                  </div>
                  <div className="farm-details-right">
                    <h6 className="farm-detail-title">Tile Title Here</h6>
                    <p className="farm-detail-desc">A small plot of grass hahaha</p>
                  </div>
                </div>
                <ul className="bottom-bar-actions-list">
                  <li className="bottom-bar-actions-item" onClick={() => cancelTileAction()}>Cancel</li>
                  {/* <li className="bottom-bar-actions-item" onClick={() => cancelTileAction()}>Cancel</li> */}
                </ul>
              </div>
            )}
            {/* ) : (<div className="bottom-bar-actions-item" onClick={() => cancelTileAction()}>Cancel</div>)} */}
          </div>
        </div>
      )}
    </StyledFarmTown>
  )
}

const StyledFarmTown = styled.main`
  height: 100vh;
  width: 100vw;
  position: relative;

  .bottom-bar-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border: 1px solid #000;
    min-height: 60px;
    color: #fff;
    background: ${brownColors.brown4};

    &.bottom-bar-minimized {
      
    }

    /* .bottom-bar-body { */
    .farm-details-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      border: 1px solid #fff;

      .farm-details-left {
        .farm-details-image {
          text-align: center;
          vertical-align: center;
          align-self: center;
          width: 6rem;
          height: 6rem;
          padding: .4rem;
          margin: auto;
          border: 1px solid #fff;
        }
      }
      .farm-details-right {
        flex: 1;

        .farm-detail-title {
          margin: 0;
          margin-bottom: 1rem;
        }
        .farm-detail-desc {
          margin: 0;
        }
      }
    }

    .bottom-bar-header {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      
      .bottom-bar-heading {
        flex: 1;
        margin: 0;
        margin-bottom: .75rem;
        margin-top: .75rem;
        text-align: left;
        padding-left: 1rem;
        color: #fff;
        font-size: 2.1rem;
        font-family: sans-serif;
      }

      .close-button {
        padding: 0.35rem 1rem;
        margin: 5px;
        font-size: 1rem;
        cursor: pointer;
      }
    }

    .bottom-bar-actions-list {
      list-style: none;
      margin: 0;
      margin-top: 1rem;
      padding-left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      height: 100%;

      .bottom-bar-actions-item {
        height: 100%;
        border: 1px solid #fff;
        display: inline-block;
        cursor: pointer;
        padding: 0.7rem 1rem;
        font-size: 1.2rem;
        margin: 4px .5rem;
        border-radius: 8px;
        transition: .05s ease-in-out;

        &:hover {
          background: #fff;
          color: ${brownColors.brown10};
          transition: .1s ease-in-out;
        }
      }
    }
  }
  .right-sidebar-overlay {
    position: absolute;
    right: 0;
    top: ${styleConstants.topbarHeight}px;
    height: calc(100% - ${styleConstants.topbarHeight}px);

    .sidebar-layout-container {
      display: flex;
      height: 100%;
      flex-direction: column;
      align-items: center;
      padding: 4px;
      background: #281b0d;

      .right-sidebar-profile {
        
        .profile-container {
          border-radius: 50%;
          width: 50px;
          height: 50px;
          color: #fff;
          background: #0a0703;
        }
      }
      .right-sidebar-backpack {
        flex: 1;
      }
    }
  }
  .left-actions-overlay {
    position: absolute;
    left: 0;
    top: ${styleConstants.topbarHeight}px;
    height: calc(100% - ${styleConstants.topbarHeight}px);

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    li {
      text-align: center;
      width: 100%;
      padding: 16px 22px;
      border: 1px solid black;
      background: rgba(255,255,255,.0.75);
      cursor: pointer;
    }
  }
  .topbar-overlay {
    position: absolute;
    top: 0;
    height: ${styleConstants.topbarHeight}px;
    left: 0;
    width: 100%;
    padding: 0 6px;
    background: ${brownColors.brown10};
    color: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .topbar-stats-list {
      display: flex;
      flex-direction: row;
      align-items: center;  
      list-style: none;
      padding: 0;
      margin: 0;
      height: ${styleConstants.topbarHeight}px;
      
      .topbar-stats-item {
        padding: 4px 8px;
        margin: 0 4px;
        border: 1px solid #fff;
        text-align: center;
        cursor: pointer;
      }
      .icon-item {
        display: flex;
        align-items: center;

        .item-text {
          display: inline-block;
          margin-left: 3px;
        }
      }
      .topbar-action-item {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`

export default FarmTown
