import styled from 'styled-components'
import classnames from 'classnames'
import toast from 'react-hot-toast'
import { crops } from '../data/cropsWiki'
import { brownColors } from '../style/colors'

export const codesMap = {
  0: 'empty',
  1: 'carrot',
  2: 'potato',
  3: 'kale',
  4: 'egg',
  5: 'corn',
  6: 'strawberry',
  7: 'blueberry',
  8: 'heckberry',
}

export const inventoryOptions = [
  'Feed Taz',
  'Sell',
]

export const RightSidebar = ({
  inventory,
  selectedInventorySlot,
  selectInventorySlot,
  closeInventory,
  sellSlot,
  feedTazSlot
}) => {

  const getCropImage = code => {
    if(!code || code < 0 || code > 8)
      return;

    const cropId = codesMap[code]
    const crop = crops[cropId]
    console.log({code, cropId, crop})
    if(!crop || !crop.SvgImage) return <></>
    return <crop.SvgImage alt={cropId} />
  }

  const getSlotText = slotIndex => {
    const code = inventory[slotIndex]
    if(code === 0) return ''

    const name = codesMap[code]
    if(!code || !name) return;

    return name
  }

  const getSlotSellPrice = slotIndex => {
    const code = inventory[slotIndex]
    if(code === 0) return ''

    const name = codesMap[code]
    const crop = crops[name]
    if(!code || !name || !crop) return;

    return crop.gold
  }

  const handleFeedTazSlot = (slotIndex) => {
    // show snackbar
    toast.success('(Taz): Mmmmm... Thanks, Layla!', {
      icon: '🔥',
      position: 'bottom-center'
    })
    feedTazSlot(slotIndex, getSlotSellPrice(slotIndex))
  }

  const handleSellSlot = (slotIndex) => {
    sellSlot(slotIndex, getSlotSellPrice(slotIndex))
  }

  return (
    <StyledRightSidebar className="sidebar-layout-container">
      <div className="right-sidebar-header">
        <button className="right-sidebar-toggle-button hide-button" onClick={closeInventory}>Hide Inventory</button>
        <div className="right-sidebar-profile">
          <div className="profile-container">
            {/* TODO: Insert picture of Layla! */}
            profile
          </div>
        </div>
      </div>
      <div className="right-sidebar-backpack">
        <h3 className="right-sidebar-backpack-heading">Items</h3>

        <div className="right-sidebar-inventory-container">
          {inventory.map((slot, index) => (
            <div
              key={`slot-${index}-${slot}`}
              className={classnames("inventory-item-group", {'selected-slot': selectedInventorySlot === index})}
              onClick={() => selectInventorySlot(index)}
            >
              {getCropImage(slot)}
            </div>
          ))}
        </div>
      </div>
      <div className="right-sidebar-footer">
        {selectedInventorySlot >= 0 && (
          getSlotText(selectedInventorySlot) ? (
            <>
              <p className="right-sidebar-footer-text" style={{marginBottom:16}}>
                Selected {getSlotText(selectedInventorySlot)}.
              </p>
              <div className="right-sidebar-action-bar">
                <button onClick={() => handleFeedTazSlot(selectedInventorySlot)} style={{marginRight: 12}} className="footer-action-button">Feed Taz</button>
                <button onClick={() => handleSellSlot(selectedInventorySlot)} className="footer-action-button flex-button">
                  <span style={{marginRight:5}}>Sell</span>
                  <img src={'/ui-icons/coin.png'} height={18} width={18} alt="gold icon" />
                  <span>{getSlotSellPrice(selectedInventorySlot)}</span>
                </button>
              </div>
            </>
          ) : (
            <p className="right-sidebar-footer-text">
              Slot {selectedInventorySlot+1} is empty.
            </p>
          )
        )}
      </div>
    </StyledRightSidebar>
  )
}


const StyledRightSidebar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #281b0d;
  /* opacity: 0.96; */
  color: #fff;
  overflow-y: auto;

  .right-sidebar-header {
    background: ${brownColors.brown9};
    margin: 0;
    padding: 0;
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
    flex: 1;

    .right-sidebar-backpack-heading {
      text-align: center;
      font-size: 1.9rem;
      margin-bottom: .75rem;
      margin-top: 1.2rem;
      font-family: sans-serif;
    }
    .right-sidebar-inventory-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 8px 5px;
      padding: 1rem;

      .inventory-item-group {
        height: 75px;
        width: 75px;
        border-radius: 25%;
        cursor: pointer;
        background: ${brownColors.brown9};
        border: 1px solid ${brownColors.brown10};
        transition: border .05s ease-in-out;
        padding: 10px;

        &:hover, &.selected-slot {
          border: 1px solid #ddd;
          transition: border .1s ease-in-out;
        }
      }
    }
  }

  .right-sidebar-footer {
    padding: 0.85rem 1rem;
    width: 100%;

    .right-sidebar-footer-text {
      margin: 0;
      font-size: 1.1rem;
    }
    .right-sidebar-action-bar {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding-left: 0;
      margin: 0;
      margin-bottom: 0.6rem;

      .footer-action-button {
        padding: 0.3rem 0.5rem;
        min-width: 60px;
        font-size: 1.1rem;
      }
    }
  }

  .flex-button {
    display: flex;
    align-items: center;
  }
`