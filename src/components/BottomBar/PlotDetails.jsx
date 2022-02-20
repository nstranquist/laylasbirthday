import classnames from 'classnames'
import { Timer } from '../Timer'

export const PlotDetails = ({
  selectedTile,
  resetPlot,
  cancelTileAction,
  isActiveTimer,
  removeTimer = () => {},
  timer = {}
}) => {

  return (
    <>
      <header className="bottom-bar-header">
        <h3 className="bottom-bar-heading" style={{textTransform: 'uppercase'}}>{selectedTile.plotType}</h3>
      </header>

      <div className="bottom-bar-body">
        {isActiveTimer ? (
          <div className="farm-details-container" style={{justifyContent:'center'}}>
            <div className="farm-details-center">
              <Timer timerDuration={timer.duration} timerStartTime={timer.startTime} removeTimer={removeTimer} />
            </div>
          </div>
        ) : (
          <div className="farm-details-container" style={{justifyContent:'center'}}>
            <div className="farm-details-center" style={{marginBottom:'0.65rem'}}>
              {/* Harvest Button */}
              
              <h4 style={{margin:0,marginBottom:'0.2rem'}}>Status:</h4>
              <h2 style={{margin:0}}>Harvested</h2>
            </div>
          </div>
        )}
        <ul className="bottom-bar-actions-list">
          <li className="bottom-bar-actions-item" onClick={() => cancelTileAction()}>Cancel</li>
          <li
            className={classnames("bottom-bar-actions-item noselect primary-button", {'disabled-button': isActiveTimer})}
            onClick={() => !isActiveTimer && resetPlot()}>
            Clear Plot
          </li>
        </ul>
      </div>
    </>
  )
}