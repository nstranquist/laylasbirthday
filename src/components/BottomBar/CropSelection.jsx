

export const CropSelection = ({
  cropItem,
  getNextCrop,
  getPreviousCrop,
  buildPlot,
  cancelTileAction
}) => {

  return (
    <>
      <header className="bottom-bar-header">
        <button className="close-button" onClick={() => getPreviousCrop()}>Last</button>
        <h3 className="bottom-bar-heading">What would you like to plant?</h3>
        <button className="close-button" onClick={() => getNextCrop()}>Next</button>
      </header>

      <div className="bottom-bar-body">
        <div className="farm-details-container">
          <div className="farm-details-left">
            <div className="farm-details-image">{<cropItem.SvgImage />}</div>
          </div>
          <div className="farm-details-right">
            <div className="farm-detail-top">
              <h6 className="farm-detail-title">
                {cropItem.name}
              </h6>
              <div className="farm-detail-stats">
                <h6 className="farm-detail-stat-item">
                  <img src={'/ui-icons/coin.png'} height={22} width={22} alt="gold" />  
                  <span className="farm-detail-stat-text">{cropItem.gold}</span>
                </h6>
                <h6 className="farm-detail-stat-item">
                  <img src={'/ui-icons/xp-gold.png'} height={22} width={22} alt="xp" />
                  <span className="farm-detail-stat-text">{cropItem.xp}</span>
                </h6>
                <h6 className="farm-detail-stat-item">
                  <img src={'/ui-icons/clock.svg'} height={22} width={22} alt="time" />
                  <span className="farm-detail-stat-text">{cropItem.time}</span>
                </h6>
              </div>
            </div>
            <p className="farm-detail-desc">{cropItem.desc}</p>
          </div>
        </div>
        <ul className="bottom-bar-actions-list">
          <li className="bottom-bar-actions-item" onClick={() => cancelTileAction()}>Cancel</li>
          <li className={"bottom-bar-actions-item noselect primary-button"}
            onClick={() => buildPlot(cropItem.code, cropItem.id)}
          >
            Build {cropItem.name}
          </li>
        </ul>
      </div>
    </>
  )
}