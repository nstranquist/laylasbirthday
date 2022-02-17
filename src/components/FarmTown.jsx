import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Farm3d } from './Farm3d'
import styleConstants from '../utils/style_constants'
import { emptyTile, generateMockTiles } from './Farm3d'
import { brownColors } from '../style/colors'
import classnames from 'classnames'
import { crops } from '../data/cropsWiki'
import { HelpDisplay } from './Help'
import { ProfileDisplay } from './Profile'

const initialUserState = {
  gold: 0,
  xp: 0,
  timeElapsed: 0,
  clicks: 0 // lol
}

const INVENTORY_SLOTS = 20 // 4x5

const generateInventory = (slots) => {
  let arr = []
  for(let i=0; i<slots; i++) {
    arr[i] = 0
  }
  return arr
}

const FarmTown = ({
  user,
  signOut
}) => {
  const [mockTiles, setMockTiles] = useState(generateMockTiles(9, 3, 3))

  const [userState, setUserState] = useState(initialUserState)
  const [selectedTile, setSelectedTile] = useState(emptyTile)
  const [showBottomBar, setShowBottomBar] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showInventory, setShowInventory] = useState(true)
  const [selectedInventorySlot, setSelectedInventorySlot] = useState(-1)

  const [inventory, setInventory] = useState(generateInventory(INVENTORY_SLOTS))

  useEffect(() => {
    console.log('welcome to farmtown')
  }, [])

  // Active tile actions
  const cancelTileAction = () => setSelectedTile(emptyTile)

  const closeBottomBar = () => setShowBottomBar(false)
  const openBottomBar = () => setShowBottomBar(true)

  const toggleHelp = () => setShowHelp(true)
  const closeHelp = () => setShowHelp(false)

  const toggleProfile = () => setShowProfile(true)
  const closeProfile = () => setShowProfile(false)

  const toggleInventory = () => setShowInventory(true)
  const closeInventory = () => setShowInventory(false)

  const buildCarrot = () => {
    if(!selectedTile?.id) return;
    if(selectedTile.plotCode === 1) return;

    setMockTiles(prevTiles => {
      return prevTiles.map(tile => {
        if(tile.id === selectedTile.id) {
          tile.plotCode = 1
          tile.plotType = 'carrot'
        }

        return tile;
      })
    })
  }

  const clearPlot = () => {
    if(!selectedTile?.id) return;
    if(selectedTile.plotCode === 0) return;

    setMockTiles(prevTiles => {
      return prevTiles.map(tile => {
        if(tile.id === selectedTile.id) {
          tile.plotCode = 0
          tile.plotType = 'empty'
        }

        return tile;
      })
    })
  }

  const selectInventorySlot = index => {
    if(index !== selectedInventorySlot)
      setSelectedInventorySlot(index)
    else
      setSelectedInventorySlot(-1)
  }

  return (
    <StyledFarmTown className={classnames({'no-pointer-events': showHelp})}>
      {showHelp && <HelpDisplay closeHelp={closeHelp} />}
      {showProfile && <ProfileDisplay closeProfile={closeProfile} />}

      <Farm3d selectedTile={selectedTile} setSelectedTile={setSelectedTile} mockTiles={mockTiles} setMockTiles={setMockTiles} />

      {/* Overlays */}
      <div className="topbar-overlay">
        <ul className="topbar-stats-list topbar-left">
          <li className="topbar-stats-item icon-item">
            <img src={'/ui-icons/coin.png'} height={30} width={30} alt="gold icon" />
            <span className="item-text">Gold: {userState.gold}</span>
          </li>
          <li className="topbar-stats-item icon-item">
            <img src={'/ui-icons/xp-gold.png'} height={30} width={30} alt="xp icon" />
            <span className="item-text">XP: {userState.xp}</span>
          </li>
        </ul>
        <ul className="topbar-stats-list topbar-right">
          <li className="topbar-stats-item topbar-action-item" onClick={() => toggleProfile()}>Welcome, {user?.username || '???'}!</li>
          <li className="topbar-stats-item topbar-action-item" onClick={() => toggleHelp()}>Help</li>
          <li className="topbar-stats-item topbar-action-item" onClick={async () => await signOut()}>Log Out</li>
        </ul>
      </div>
      <div className="left-actions-overlay">
        <ul>
          <li style={{background:"rgba(255,255,255,0.75)"}}>Buildings</li>
          <li style={{background:"rgba(255,255,255,0.75)"}}>Crops</li>
          <li style={{background:"rgba(255,255,255,0.75)"}}>Edit Farm</li>
        </ul>
      </div>
      <div className="right-sidebar-overlay">
        {showInventory ? (
          <div className="sidebar-layout-container">
            <div className="right-sidebar-header">
              <button className="right-sidebar-toggle-button hide-button" onClick={closeInventory}>Hide Inventory</button>
              <div className="right-sidebar-profile">
                <div className="profile-container">
                  profile
                </div>
              </div>
            </div>
            <div className="right-sidebar-backpack">
              <h3 className="right-sidebar-backpack-heading">Items</h3>

              <div className="right-sidebar-inventory-container">
                {inventory.map((slot, index) => (
                  <div className={classnames("inventory-item-group", {'selected-slot': selectedInventorySlot === index})} key={`slot-${index}`} onClick={() => selectInventorySlot(index)}>
                    {slot}
                    {inventory[index] !== 0 && (
                      <div className="inventory-slot-item">
                        {inventory[index].toString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="right-sidebar-footer">
              {selectedInventorySlot >= 0 && (
                <p className="right-sidebar-footer-text">
                  Selected slot #{inventory[selectedInventorySlot]}:
                  {'\n'}
                  {/* TODO: Get item by its code */}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="right-sidebar-toggle">
            <button className="right-sidebar-toggle-button" onClick={toggleInventory}>Show Inventory</button>
          </div>
        )}
      </div>

      {/* Display Info about the plot selected */}
      {selectedTile.id && (
        <div className={classnames("bottom-bar-overlay", {'bottom-bar-minimized': !showBottomBar})}>
          <div className="container">
            <header className="bottom-bar-header">
              <h3 className="bottom-bar-heading">Plot: {selectedTile.plotType}</h3>
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
                    <p className="farm-detail-desc">x: {selectedTile.x} y: {selectedTile.y}</p>
                  </div>
                </div>
                <ul className="bottom-bar-actions-list">
                  <li className="bottom-bar-actions-item" onClick={() => cancelTileAction()}>Cancel</li>
                  {selectedTile?.plotCode === 0 ? (
                    <li className={"bottom-bar-actions-item noselect"} onClick={() => buildCarrot()}>Build Carrot</li>
                  ) : (
                    <li className={"bottom-bar-actions-item noselect"} onClick={() => clearPlot()}>Reset Plot</li>
                  )}
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

  .disabled-button {
    cursor: not-allowed !important;
    &:hover {
      background: transparent !important;
      color: #fff !important;
    }
  }

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
          font-size: 1.2rem;
        }
        .farm-detail-desc {
          margin: 0;
          font-size: 1.05rem;
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
    min-width: 200px;

    .right-sidebar-toggle {
      text-align: center;
      margin: 1rem;
    }
    .right-sidebar-toggle-button {
      cursor: pointer;

      &.hide-button {
        margin-bottom: 1rem;
        margin-top: 0.5rem;
      }
    }
    
    .sidebar-layout-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      background: #281b0d;
      /* opacity: 0.96; */
      color: #fff;

      .right-sidebar-header {
        background: ${brownColors.brown9};
        margin: 0; padding: 0;
        width: 100%;
      }

      .right-sidebar-profile {
        margin-bottom: 2rem;

        .profile-container {
          border-radius: 50%;
          width: 175px;
          height: 175px;
          color: #eee;
          background: #0a0703;
          line-height: 175px;
          margin-left: auto;
          margin-right: auto;
        }
      }
      
      .right-sidebar-backpack {
        padding: 4px;
        flex: 1;

        .right-sidebar-backpack-heading {
          text-align: center;
          font-size: 1.9rem;
          margin-bottom: .85rem;
          font-family: sans-serif;
        }
        .right-sidebar-inventory-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 10px 5px;
          padding: 1rem;

          .inventory-item-group {
            height: 75px;
            width: 75px;
            border-radius: 25%;
            cursor: pointer;
            background: ${brownColors.brown9};
            border: 1px solid ${brownColors.brown10};
            transition: border .05s ease-in-out;

            &:hover, &.selected-slot {
              border: 1px solid #ddd;
              transition: border .1s ease-in-out;
            }
          }
        }
      }

      .right-sidebar-footer {
        padding: 0.7rem 1rem;
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
