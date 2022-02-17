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
import { BottomBar } from './BottomBar/BottomBar'
import { RightSidebar } from './RightSidebar'

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
  const [mockTiles, setMockTiles] = useState(generateMockTiles(16, 4, 4))

  const [userState, setUserState] = useState(initialUserState)
  const [selectedTile, setSelectedTile] = useState(emptyTile)
  const [showHelp, setShowHelp] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showInventory, setShowInventory] = useState(false)
  const [selectedInventorySlot, setSelectedInventorySlot] = useState(-1)

  const [inventory, setInventory] = useState(generateInventory(INVENTORY_SLOTS))

  useEffect(() => {
    console.log('welcome to farmtown')
  }, [])

  // Active tile actions
  const cancelTileAction = () => setSelectedTile(emptyTile)

  const toggleHelp = () => setShowHelp(true)
  const closeHelp = () => setShowHelp(false)

  const toggleProfile = () => setShowProfile(true)
  const closeProfile = () => setShowProfile(false)

  const toggleInventory = () => setShowInventory(true)
  const closeInventory = () => setShowInventory(false)

  const buildPlot = (tileCode, tileType) => {
    if(!selectedTile?.id) return;
    if(selectedTile.plotCode === 1) return;
    if(!crops[tileType]) return
    if(crops[tileType].level > userState.level) return;

    setMockTiles(prevTiles => {
      return prevTiles.map(tile => {
        if(tile.id === selectedTile.id) {
          tile.plotCode = tileCode
          tile.plotType = tileType
        }

        return tile;
      })
    })

    const { gold, xp, time } = crops[tileType]

    setUserState(prev => ({
      ...prev,
      gold: prev.gold + gold,
      xp: prev.xp + xp,
    }))

    // Set Timer
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

  const updateUser = (updates) => {
    // Check that there are only legal values
    const foundInvalidUpdate = Object.keys(updates).some(item => !Object.keys(userState).includes(item))
    if (foundInvalidUpdate) return;

    setUserState(prevState => ({
      ...prevState,
      ...updates
    }))
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
          <RightSidebar
            inventory={inventory}
            selectedInventorySlot={selectedInventorySlot}
            selectInventorySlot={selectInventorySlot}
            closeInventory={closeInventory}
          />
        ) : (
          <div className="right-sidebar-toggle">
            <button className="right-sidebar-toggle-button" onClick={toggleInventory}>Show Inventory</button>
          </div>
        )}
      </div>

      {/* Display Info about the plot selected */}
      {selectedTile.id && (
        <BottomBar
          selectedTile={selectedTile}
          cancelTileAction={cancelTileAction}
          buildPlot={buildPlot}
          clearPlot={clearPlot}
        />
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
