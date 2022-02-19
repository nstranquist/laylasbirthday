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
import { TopBar as TopBarOverlay } from './TopBar'
import { RightSidebar } from './RightSidebar'
import { AnimatedGameText } from './AnimatedGameText'
import { LeftActionsOverlay } from './LeftActionsOverlay'

import styleConstants from '../utils/style_constants'
import { brownColors } from '../style/colors'
import { crops } from '../data/cropsWiki'
import { nanoid } from '../utils/nanoid'
import { Timer } from './Timer'
import { SvgButton } from './SvgButton'
import { ReactComponent as BackpackSvg } from '../assets/ui-icons/backpack.svg'

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

const timersSchema = [
  {
    id: nanoid(),
    tileId: 'abcde', // nanoid()
    duration: 8, // seconds
    startTime: 1645166281.3, // seconds since 1970
    interval: null,
  },
  // ...
]

export const getSeconds = () => new Date().getTime() / 1000;

const FarmTown = ({
  user,
  signOut
}) => {
  const [mockTiles, setMockTiles] = useState(generateMockTiles(16, 4, 4))

  const [userState, setUserState] = useState(initialUserState)
  const [selectedTile, setSelectedTile] = useState(emptyTile)
  const [showHelp, setShowHelp] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showInventory, setShowInventory] = useState(true)
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
    setInventory(prev => {
      prev[index] = 0
      return prev
    })
    setSelectedInventorySlot(-1)
  }

  // Timer logic
  const addTimer = (tileId, duration) => {
    if(!tileId) return
    const timerId = nanoid()
    setTimers(prev => ([
      ...prev,
      {
        id: timerId,
        tileId: tileId,
        duration: duration,
        startTime: getSeconds(),
        secondsLeft: duration
      }
    ]))
    return timerId
  }

  const removeTimer = timerId => {
    setTimers(prev => prev.filter(item => item.id !== timerId))
  }

  // const getTimerSecondsLeft = timerId => {
  //   const foundTimer = timers.find(item => item.id === timerId)
  //   if(!foundTimer) return 0 // -1
  //   const currentSeconds = getSeconds()
  //   const remainingSeconds = (foundTimer.startTime + foundTimer.duration) - currentSeconds

  //   return remainingSeconds > 0 ? remainingSeconds : 0
  // }

  const buildPlot = (tileCode, tileType) => {
    if(!selectedTile?.id) return;
    if(selectedTile.plotCode === 1) return;
    if(!crops[tileType]) return
    if(crops[tileType].level > userState.level) return;

    // IDEA: change plane bg to dirt or something, instead of auto assigning it to the model
    setMockTiles(prevTiles => {
      return prevTiles.map(tile => {
        if(tile.id === selectedTile.id) {
          tile.plotCode = tileCode
          tile.plotType = tileType
        }

        return tile;
      })
    })

    const { xp, time, code } = crops[tileType]

    // setTimer
    const timerId = addTimer(selectedTile.id, time)
    setTimeout(() => {
      removeTimer(timerId)
      setAnimatedText(`+${xp} XP!`)

      setUserState(prev => ({
        ...prev,
        xp: prev.xp + xp,
      }))

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

  const getIsActiveTimer = tileId => {
    // return empty object or actual timer
    const foundTimer = timers.find(timer => timer.tileId === tileId)
    return foundTimer ? true : false
  }
  const getActiveTimer = tileId => {
    // return empty object or actual timer
    const foundTimer = timers.find(timer => timer.tileId === tileId)
    if(!foundTimer) return {}
    return foundTimer
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
      <TopBarOverlay
        username={user.username}
        gold={userState.gold}
        xp={userState.xp}
        toggleProfile={toggleProfile}
        toggleHelp={toggleHelp}
        signOut={signOut}
      />
      <LeftActionsOverlay setShowCrops={setShowCrops} setShowBuildings={setShowBuildings} />
      <div className="right-sidebar-overlay">
        <div className="inner-right-sidebar">
          {showInventory && (
            <RightSidebar
              inventory={inventory}
              selectedInventorySlot={selectedInventorySlot}
              selectInventorySlot={selectInventorySlot}
              closeInventory={closeInventory}
              sellSlot={sellInventorySlot}
              feedTazSlot={feedTazSlot}
            />
          )}

          <div className={classnames("right-sidebar-toggle", {'docked-sidebar': showInventory})}>
            <SvgButton
              SvgImage={BackpackSvg}
              onClick={() => setShowInventory(prev => !prev)}
              transparent
              buttonStyles={{marginBottom: '1rem', marginTop: '0.5rem'}}
            />
            {timers.map((timer, index) => (
              <Timer timer={timer} removeTimer={removeTimer} key={`timer-${index}`} showDebug={false} />
            ))}
          </div>
        </div>
      </div>

      {/* Display Info about the plot selected */}
      {selectedTile?.id && (
        <BottomBar
          selectedTile={selectedTile}
          showInventory={showInventory}
          cancelTileAction={cancelTileAction}
          buildPlot={buildPlot}
          clearPlot={clearPlot}
          cropIndex={cropIndex}
          setCropIndex={setCropIndex}
          isActiveTimer={getIsActiveTimer(selectedTile.id)}
          removeTimer={removeTimer}
          timer={getActiveTimer(selectedTile.id)}
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

  .temp-timer-item {
    background: rgba(255,255,255,0.8);
    padding: 0.2rem 0.3rem;
    margin-bottom: 0.25rem;
    
    h4 {
      margin: 0;
      margin-bottom: .3rem;
      font-size: 1.25rem;
    }
    p {
      margin: 0;
      margin-bottom: 0.15rem;
      font-size: 1.1rem;
    }
  }

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
      background: initial;
      color: initial;
    }
  }

  .right-sidebar-overlay {
    position: absolute;
    right: 0;
    top: ${styleConstants.topbarHeight}px;
    height: calc(100% - ${styleConstants.topbarHeight}px);

    .inner-right-sidebar {
      height: 100%;
      position: relative;
    }

    .right-sidebar-toggle {
      position: absolute;
      top: 0;
      right: 1rem;
      text-align: center;
      margin: 1rem;
      margin-right: 0;

      &.docked-sidebar {
        right: calc(3rem + 315px); // 2rem + 300px + 15px + 1rem
      }
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

  .timer-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    
    .timer-text {
      margin: 0;
      font-size: 1.2rem;
      margin-left: 6px;
      color: #fff;
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
  @media(max-width: 700px) {
    .left-actions-overlay {
      display: none;
    }
  }
`

export default FarmTown
