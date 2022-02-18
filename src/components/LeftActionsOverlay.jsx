

export const LeftActionsOverlay = ({
  setShowCrops,
  setShowBuildings
}) => {

  return (
    <div className="left-actions-overlay">
      <ul>
        <li style={{background:"rgba(255,255,255,0.75)"}} onClick={() => setShowCrops(true)}>Crops</li>
        <li style={{background:"rgba(255,255,255,0.75)"}} onClick={() => setShowBuildings(true)}>Buildings</li>
        <li style={{background:"rgba(255,255,255,0.75)"}}>Edit Farm</li>
      </ul>
    </div>
  )
}