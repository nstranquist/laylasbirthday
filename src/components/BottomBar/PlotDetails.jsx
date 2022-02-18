

export const PlotDetails = ({
  selectedTile,
  // SvgImage,
  resetPlot,
  cancelTileAction,

  timeLeft
}) => {

  return (
    <>
      <header className="bottom-bar-header">
        <h3 className="bottom-bar-heading">Plot: {selectedTile.plotType}</h3>
      </header>

      <div className="bottom-bar-body">
        {timeLeft > 0 && (
          <div className="farm-details-container" style={{justifyContent:'center'}}>
            <div className="farm-details-center">
              <p className="farm-detail-text">
                <img src={'/ui-icons/clock.svg'} height={22} width={22} alt="time" />
                <span className="farm-detail-stat-text">{Math.ceil(timeLeft)}s</span>
              </p>
              {/* <p className="farm-detail-text">{selectedTile.desc}</p> */}
            </div>
          </div>
        )}
        <ul className="bottom-bar-actions-list">
          <li className="bottom-bar-actions-item" onClick={() => cancelTileAction()}>Cancel</li>
          {/* {(timeLeft > 0 || !isTimerActive) ? ( */}
            <li className={"bottom-bar-actions-item noselect primary-button"} onClick={() => resetPlot()}>Reset Plot</li>
          {/* ) : (
            <li className={"bottom-bar-actions-item noselect primary-button"} onClick={() => harvestPlot()}>Harvest</li>
          )} */}
        </ul>
      </div>
    </>
  )
}