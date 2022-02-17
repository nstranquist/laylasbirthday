

export const PlotDetails = ({
  selectedTile,
  SvgImage,
  resetPlot,
  cancelTileAction
}) => {

  return (
    <>
      <header className="bottom-bar-header">
        <h3 className="bottom-bar-heading">Plot: {selectedTile.plotType}</h3>
      </header>

      <div className="bottom-bar-body">
        {/* <div className="farm-details-container">
          <div className="farm-details-left">
            <div className="farm-details-image">{<SvgImage />}</div>
          </div>
          <div className="farm-details-right">
            <h6 className="farm-detail-title">{selectedTile.name}</h6>
            <p className="farm-detail-desc">{selectedTile.desc}</p>
          </div>
        </div> */}
        <ul className="bottom-bar-actions-list">
          <li className="bottom-bar-actions-item" onClick={() => cancelTileAction()}>Cancel</li>
          <li className={"bottom-bar-actions-item noselect primary-button"} onClick={() => resetPlot()}>Reset Plot</li>
        </ul>
      </div>
    </>
  )
}