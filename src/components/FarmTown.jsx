import { useEffect, useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import toast from 'react-hot-toast'
import { useDetectGPU } from '@react-three/drei'
import { Storage, DataStore, Auth /*API*/ } from 'aws-amplify'
import { Player as PlayerModel } from '../models/index.js'
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

// levels by amount of xp. level[0] = xp at level 1, which is 0xp
// at most 2 levels in between a new unlock
export const levels = [
  15, // 2
  25, // 3 - potato (x2 carrots @30xp)
  40, // 4
  65, // 5 - kale (x2 potatos @75xp)
  105, // 6
  170, // 7 - egg (x2 kale @175xp)
  275, // 8
  445, // 9 - corn (x3 egg @475xp)
  720, // 10
  1165, // 11 - strawberry (x5 corn @1200xp)
  1885, // 12 - blueberry (x4 strawberry @1920xp)
  3050, // 13 - heckberry (x5 blueberry @3145xp)
  4935, // level 14 --> BIRTHDAYYYY, no need to plant anything. Airdrop present into Inventory, show snackbar
]
// Level 1
// 45 xp needed til level 2

const initialUserState = {
  gold: 0,
  xp: 0,
  // timeElapsed: 0,
  // clicks: 0 // lol
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

const PlayerModelSchema = {
  gold: 0,
  xp: 0,
  username: '',
  tiles: generateMockTiles(16, 4, 4),
  inventory: generateInventory(INVENTORY_SLOTS),
}
const timersSchema = [
  {
    id: nanoid(),
    tileId: 'abcde', // nanoid()
    duration: 8, // seconds
    startTime: 1645166281.3, // seconds since 1970
    interval: null,
  },
]

export const getSeconds = () => new Date().getTime() / 1000;

const FarmTown = ({
  user,
  signOut
}) => {
  const GPUTier = useDetectGPU()

  const [tiles, setTiles] = useState(generateMockTiles(16, 4, 4))

  const [userState, setUserState] = useState(initialUserState)
  const [selectedTile, setSelectedTile] = useState(emptyTile)
  const [showHelp, setShowHelp] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showInventory, setShowInventory] = useState(true)
  const [showBuildings, setShowBuildings] = useState(false)
  const [showCrops, setShowCrops] = useState(false)
  const [selectedInventorySlot, setSelectedInventorySlot] = useState(-1)
  const [profileUrl, setProfileUrl] = useState('')
  const [userImages, setUserImages] = useState([]) // { key: '', file: '' }

  const [timers, setTimers] = useState([])
  const [currentLevel, setCurrentLevel] = useState(0)

  const [inventory, setInventory] = useState(generateInventory(INVENTORY_SLOTS))

  const [animatedText, setAnimatedText] = useState('')
  const [settingAnimatedText, setSettingAnimatedText] = useState(false)

  const [cropIndex, setCropIndex] = useState(0)

  // useEffect(() => {
  //   console.log('timers:', timers)
  // }, [timers])

  useEffect(() => {
    const getCurrentLevel = (xp) => {
      let currentLevel;
      if(xp < 0)
        currentLevel = 0
      else {
        const levelIndex = levels.findIndex(level => level >= xp)
        if (levelIndex === -1)
          currentLevel = 14
        else
          currentLevel = levelIndex + 1
      }
      return currentLevel
    }

    setCurrentLevel(getCurrentLevel(userState.xp))
  }, [userState.xp])

  useEffect(() => {
    console.log('welcome to farmtown')

    if(GPUTier.tier === "0" || GPUTier.isMobile) {
      console.log('gpu is low')
      // show toast to alert the user
      toast('', {
        icon: '⚠️',
        duration: 6000
      })
    }
  }, [GPUTier])

  // Use DataStore to query user data
  useEffect(() => {
    const queryUserData = async () => {
      try {
        const queryResult = await DataStore.query(PlayerModel, c => c.username("eq", user.username)) // , c => c.username("eq", user.username)
        if(queryResult?.length === 0) {
          // Init user
          const saveUserResult = await DataStore.save(
            new PlayerModel({
              ...PlayerModelSchema,
              username: user.username
            })
          )
          setUserState(prev => ({
            ...prev,
            xp: saveUserResult.xp,
            gold: saveUserResult.gold,
          }))
          setTiles(saveUserResult.tiles)
          setInventory(saveUserResult.inventory)
        }
        else {
          const userProfile = queryResult[0]
          setUserState(prev => ({
            ...prev,
            xp: userProfile.xp,
            gold: userProfile.gold,
          }))
          setTiles(() => {
            return userProfile.tiles.map(tile => ({
              ...tile
            }))
          })
          setInventory([...userProfile.inventory])
        }
      } catch (error) {
        console.error('error querying user data:', JSON.stringify(error))
        toast.error('Failed to retrieve user profile data')
      }
    }

    const checkUser = async () => {
      try {
        await Auth.currentAuthenticatedUser()
        queryUserData()
      }
      catch (error) {
        console.error('error getting current auth user:', error)
        await signOut()
      }
    }

    checkUser()
  }, [user])

  useEffect(() => {
    const getUserImages = async () => {
      try {
        // List user files
        const images = await Storage.list('', { level: 'private' })
        if(!images || images.length === 0) {
          toast.error('No files exist for this user yet!')
        }
        console.log('found images:', images)
        // for each file with key found, retrieve the image
        await new Promise((resolve, reject) => {
          images.filter(image => image.key).forEach(async (image, index) => {
            const { key } = image;

            const isFolder = key.slice(-1) === '/' ? true : false

            if(isFolder) {
              console.log('found a folder with key:', key)
              return;
            }
            
            // Get that image by key
            try {
              const imageResult = await Storage.get(key, { level: 'private' }) // image result is the SIGNED url!
              if(!imageResult) throw new Error('Could not find that image!')
              console.log('image result:', imageResult)
              // TODO assign the profile's s3 key in the user's dynamodb model
              if(key === 'profile' || key.split('.')[0] === 'profile') {
                // set the image to state
                setProfileUrl(imageResult)
              }
              else {
                setUserImages(prev => ([
                  ...prev,
                  {key, file: imageResult}
                ]))
              }
            } catch (error) {
              console.error('error in individual file retrieval:', error)
              toast.error(`There was an error getting your file: ${key}`)
            }
          })
        })

        // parse out the profile pic, and set that
      } catch (error) {
        console.error('error getting file:', error)
        toast.error('Could not get your user images!')
      }
    }

    // const uploadTestFile = async (filename) => {
    //   try {
    //     const result = await Storage.put(filename, filename, {
    //       level: 'private'
    //     })
    //     console.log('result:', result)
    //   } catch (error) {
    //     console.error('error in test upload:', error)
    //   }
    // }

    if(user?.username) {
      setUserImages([])
      getUserImages()

      // uploadTestFile('text.txt')
    }
  }, [user])

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

  // User API update
  const saveUserState = async (xp, gold, inventory, tiles) => { // ['userState', 'inventory', 'tiles']
    // optimistically set the user's state, and
    // make a backup of user state, in case we need to revert back on error
    try {
      // save in the DataStore
      const originalPlayerArr = await DataStore.query(PlayerModel)
      const originalPlayer = originalPlayerArr[0]

      // update the player model in store for the fields specified
      await DataStore.save(
        PlayerModel.copyOf(originalPlayer, updated => {
          updated.gold = gold
          updated.xp = xp
          updated.inventory = [...inventory]
          updated.tiles = tiles.map(tile => ({...tile}))
        })
      )
    } catch (error) {
      console.error('error saving user state:', error)
      toast.error('There was an error saving your user state. Contact Nico!')
    }
  }

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

  const getNextInventoryIndex = (code) => {
    const foundIndex = inventory.findIndex(itemCode => itemCode === 0)
    setInventory(prev => {
      prev[foundIndex] = code
      return prev;
    })
    return foundIndex
  }

  // const addInventoryItem = (itemCode) => {
  //   // if inventory is full, alert this to the user
  //   if(isInventoryFull())
  //     return toast.error('Inventory is full')

  //   // Fill next available inventory index
  //   const index = getNextInventoryIndex()
  //   const newInventory = inventory.map((prevCode, itemIndex) => itemIndex === index ? itemCode : prevCode)
  //   saveUserState({ inventory: newInventory, tiles, ...userState }, ['inventory'])
  // }

  const selectInventorySlot = index => {
    // if other selection is in progress, cancel it, so for now that means resetting the selectedTile
    setSelectedTile(emptyTile)
    if(index !== selectedInventorySlot)
      setSelectedInventorySlot(index)
    else
      setSelectedInventorySlot(-1)
  }

  const sellInventorySlot = (index, gold) => {
    setAnimatedText(`+${gold} Gold!`)
    setInventory(prev => {
      prev[index] = 0
      return prev
    })
    setSelectedInventorySlot(-1)
    const newGold = userState.gold + gold
    setUserState(prev => ({...prev, gold: newGold}))
    saveUserState( userState.xp, newGold, inventory, tiles)
  }

  // taz will +/- the gold earned by factor of 3
  const feedTazSlot = (index, gold) => {
    const tazFactor = Math.random() > 0.5 ? -1 : 1
    gold = Math.floor(gold - (Math.random() * gold * tazFactor))
    setAnimatedText(`+${gold} Gold!\n+${gold} XP!`)
    setInventory(prev => {
      prev[index] = 0
      return prev
    })
    setSelectedInventorySlot(-1)
    const newGold = userState.gold + gold
    const newXp = userState.xp + gold
    setUserState({gold: newGold, xp: newXp})
    saveUserState(newXp, newGold, inventory, tiles)
  }

  // const clearInventorySlot = index => {
  //   const newInventory = inventory.map((prevCode, itemIndex) => itemIndex === index ? 0 : prevCode)
  //   saveUserState({ inventory: newInventory, tiles, ...userState}, ['inventory'])
  //   setSelectedInventorySlot(-1)
  // }

  // Timer logic
  // NOTE: Timer state will NOT persist for now...
  // TODO: save timers as well
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
        // secondsLeft: duration
      }
    ]))
    return timerId
  }

  // TODO: save timers as well
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
    setTiles(prev => {
      return prev.map(tile => {
        if(tile.id === selectedTile.id) {
          tile.plotCode = tileCode
          tile.plotType = tileType
        }

        return tile;
      })
    })
    saveUserState(userState.xp, userState.gold, inventory, tiles)

    const { xp, time, code } = crops[tileType]

    // setTimer
    const timerId = addTimer(selectedTile.id, time)
    setTimeout(() => {
      removeTimer(timerId)
      
      setAnimatedText(`+${xp} XP!`)
      setTimeout(() => {
        setAnimatedText('')
      }, ANIMATED_TEXT_DURATION)

      // NOTE: Refactored out of addInventoryItem to batch update with DataStore
      if(isInventoryFull()) {
        toast.error('Inventory is full, cannot harvest')
      }
      else {
        // Set New Tiles... TODO! Set State, THEN do the tile shit
        const index = getNextInventoryIndex(code)
        setInventory(prev => {
          prev[index] = code
          return prev;
        })
        setTiles(prev => {
          return prev.map(tile => {
            if(tile.id === selectedTile.id) {
              tile.plotCode = 0
              tile.plotType = 'empty'
            }
            return tile
          })
        })
        const newXp = userState.xp + xp
        setUserState(prev => ({
          ...prev,
          xp: newXp
        }))
        saveUserState(newXp, userState.gold, inventory, tiles )
      }
    }, (time * 1000))
  }

  const clearPlot = () => {
    if(!selectedTile?.id) return;
    if(selectedTile.plotCode === 0) return;

    setTiles(prev => {
      return prev.map(tile => {
        if(tile.id === selectedTile.id) {
          tile.plotCode = 0
          tile.plotType = 'empty'
        }

        return tile;
      })
    })
    saveUserState(userState.xp, userState.gold, inventory, tiles)    
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

  // const uploadFile = async e => {
  //   const file = e.target.files[0]
  //   if(!file) return;
  //   try {
  //     await Storage.put(file.name, file)
  //   } catch (error) {
  //     console.error('error uploading file:', error)
  //   }
  // }

  return (
    <StyledFarmTown className={classnames({'no-pointer-events': showHelp || showProfile || showCrops || showBuildings})}>
      
      {showHelp && <HelpDisplay closeHelp={closeHelp} />}
      {showProfile && <ProfileDisplay userImages={userImages} closeProfile={closeProfile} />}
      {showCrops && <CropsDisplay closeDisplay={() => setShowCrops(false)} />}
      {showBuildings && <BuildingsDisplay closeDisplay={() => setShowBuildings(false)} />}

      {animatedText && (
        <AnimatedGameText text={animatedText.split('\n')} DURATION={ANIMATED_TEXT_DURATION} />
      )}

      <Farm3d
        selectedTileId={selectedTile.id}
        selectedTilePlotCode={selectedTile.plotCode}
        tiles={tiles}
        selectTile={selectTile}
        // setTiles={setTiles}
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
              profileUrl={profileUrl}
              xp={userState.xp}
              currentLevel={currentLevel}
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
              <Timer timerDuration={timer.duration} timerStartTime={timer.startTime} removeTimer={removeTimer} key={`timer-${index}`} showDebug={false} />
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
          currentLevel={currentLevel}
        />
      )}
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
