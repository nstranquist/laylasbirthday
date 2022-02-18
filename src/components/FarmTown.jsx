import { useEffect, useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import toast, { Toaster } from 'react-hot-toast'

import { Farm3d, emptyTile, generateMockTiles } from './Farm3d'
import {
  HelpDisplay,
  ProfileDisplay,
  CropsDisplay,
  BuildingsDisplay,
} from './displays'
import { BottomBar } from './BottomBar/BottomBar'
import { RightSidebar } from './RightSidebar'
import { AnimatedGameText } from './AnimatedGameText'

import styleConstants from '../utils/style_constants'
import { brownColors } from '../style/colors'
import { crops } from '../data/cropsWiki'

const initialUserState = {
  gold: 0,
  xp: 0,
  timeElapsed: 0,
  clicks: 0 // lol
}

const INVENTORY_SLOTS = 16 // 4x4 // 4x5

const generateInventory = (slots) => {
  let arr = []
  for(let i=0; i<slots; i++) {
    arr[i] = 0
  }
  return arr
}

const ANIMATED_TEXT_DURATION = 1500

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
  const [showBuildings, setShowBuildings] = useState(false)
  const [showCrops, setShowCrops] = useState(false)
  const [selectedInventorySlot, setSelectedInventorySlot] = useState(-1)

  const [timers, setTimers] = useState([])

  const [inventory, setInventory] = useState(generateInventory(INVENTORY_SLOTS))

  const [animatedText, setAnimatedText] = useState('')
  const [settingAnimatedText, setSettingAnimatedText] = useState(false)

  const [cropIndex, setCropIndex] = useState(0)

  useEffect(() => {
    console.log('welcome to farmtown')
  }, [])

  useEffect(() => {
    console.log('animated text:', animatedText)
    if(animatedText) {
      setSettingAnimatedText(true)
      setTimeout(() => {
        if(!settingAnimatedText) {
          setAnimatedText('')
          setSettingAnimatedText(false)
        }
      }, ANIMATED_TEXT_DURATION)
    }
  }, [animatedText])

  // Active tile actions
  const cancelTileAction = () => setSelectedTile(emptyTile)

  const selectTile = (newValue) => {
    setSelectedInventorySlot(-1)
    setSelectedTile(newValue)
  }

  const toggleHelp = () => setShowHelp(true)
  const closeHelp = () => setShowHelp(false)

  const toggleProfile = () => setShowProfile(true)
  const closeProfile = () => setShowProfile(false)

  const toggleInventory = () => setShowInventory(true)
  const closeInventory = () => setShowInventory(false)

  const isInventoryFull = () => !inventory.includes(0)

  const getNextInventoryIndex = () => inventory.findIndex(itemCode => itemCode === 0)

  const addInventoryItem = (itemCode) => {
    // if inventory is full, alert this to the user
    if(isInventoryFull())
      return toast.error('Inventory is full')

    // Fill next available inventory index
    const index = getNextInventoryIndex()
    setInventory(prev => {
      prev[index] = itemCode
      return prev;
    })
  }

  const selectInventorySlot = index => {
    // if other selection is in progress, cancel it, so for now that means resetting the selectedTile
    setSelectedTile(emptyTile)
    if(index !== selectedInventorySlot)
      setSelectedInventorySlot(index)
    else
      setSelectedInventorySlot(-1)
  }

  const sellInventorySlot = (index, gold) => {
    setUserState(prev => ({ ...prev, gold: prev.gold + gold }))
    setAnimatedText(`+${gold} Gold!`)
    clearInventorySlot(index)
  }

  // taz will +/- the gold earned by factor of 3
  const feedTazSlot = (index, gold) => {
    const tazFactor = Math.random() > 0.5 ? -1 : 1
    gold = Math.floor(gold - (Math.random() * gold * tazFactor))
    setUserState(prev => ({ ...prev, gold: prev.gold + gold }))
    setAnimatedText(`+${gold} Gold!`)
    clearInventorySlot(index)
  }

  const clearInventorySlot = index => {
    console.log('index:', index)
    setInventory(prev => {
      prev[index] = 0
      return prev
    })
    setSelectedInventorySlot(-1)
  }

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

    const { gold, xp, time, code } = crops[tileType]

    // setTimer
    setTimeout(() => {
      setAnimatedText(`+${xp} XP!`) // +${gold} Gold!\n

      setUserState(prev => ({
        ...prev,
        gold: prev.gold + gold,
        xp: prev.xp + xp,
      }))

      // the item name
      addInventoryItem(code)

      setTimeout(() => {
        setAnimatedText('')
      }, ANIMATED_TEXT_DURATION)
    }, (time * 1000))
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

  return (
    <StyledFarmTown className={classnames({'no-pointer-events': showHelp || showProfile || showCrops || showBuildings})}>
      {showHelp && <HelpDisplay closeHelp={closeHelp} />}
      {showProfile && <ProfileDisplay closeProfile={closeProfile} />}
      {showCrops && <CropsDisplay closeDisplay={() => setShowCrops(false)} />}
      {showBuildings && <BuildingsDisplay closeDisplay={() => setShowBuildings(false)} />}

      {animatedText && (
        <AnimatedGameText text={animatedText.split('\n')} DURATION={ANIMATED_TEXT_DURATION} />
      )}

      <Farm3d
        selectedTile={selectedTile}
        mockTiles={mockTiles}
        selectTile={selectTile}
        setMockTiles={setMockTiles}
      />

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
          <li style={{background:"rgba(255,255,255,0.75)"}} onClick={() => setShowCrops(true)}>Crops</li>
          <li style={{background:"rgba(255,255,255,0.75)"}} onClick={() => setShowBuildings(true)}>Buildings</li>
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
            sellSlot={sellInventorySlot}
            feedTazSlot={feedTazSlot}
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
          showInventory={showInventory}
          cancelTileAction={cancelTileAction}
          buildPlot={buildPlot}
          clearPlot={clearPlot}
          cropIndex={cropIndex}
          setCropIndex={setCropIndex}
        />
      )}

      <Toaster />
    </StyledFarmTown>
  )
}

const StyledFarmTown = styled.main`
  height: 100vh;
  width: 100vw;
  position: relative;

  .animated-game-text {
    position: absolute;
    left: 0;
    width: 100%;
    align-self: center;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    z-index: 1040;
    margin: 0 auto;

    .game-text-item {
      margin: 0;
      margin-bottom: 1rem;
    }
    .game-text-item:last-child {
      margin: 0;
    }
  }

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
    min-width: ${styleConstants.rightSidebarWidth}px;

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

  @media(min-width: 1200px) {
    /* make bottom bar space out for the inventory */
    .bottom-bar-overlay {
      right: calc(2rem + 300px + 15px);

      &.bottom-bar-expanded {
        right: 0 !important;
      }
    }
  }
`

export default FarmTown
