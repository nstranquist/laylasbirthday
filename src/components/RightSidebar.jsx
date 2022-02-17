import styled from 'styled-components'
import classnames from 'classnames'

export const RightSidebar = ({
  inventory,
  selectedInventorySlot,
  selectInventorySlot,
  closeInventory
}) => {

  return (
    <StyledRightSidebar className="sidebar-layout-container">
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
            <div className={classnames("inventory-item-group", {'selected-slot': selectedInventorySlot === index})} key={`slot-${index}`}
              onClick={() => selectInventorySlot(index)}
            >
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
    </StyledRightSidebar>
  )
}


const StyledRightSidebar = styled.div`

`