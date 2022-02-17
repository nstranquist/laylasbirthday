import { useState, useEffect } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { CropSelection } from './CropSelection'
import { PlotDetails } from './PlotDetails'
import { crops } from '../../data/cropsWiki'
import { brownColors } from '../../style/colors'

const cropKeys = Object.keys(crops)

export const BottomBar = ({
  selectedTile,
  cancelTileAction,
  buildPlot,
  clearPlot
}) => {
  const [cropIndex, setCropIndex] = useState(0)
  const [cropItem, setCropItem] = useState(crops[cropKeys[0]])

  useEffect(() => {
    setCropItem(crops[cropKeys[cropIndex]])
  }, [cropIndex])

  const getNextCrop = () => {
    setCropIndex(prev => prev < cropKeys.length - 1 ? prev + 1 : 0)
  }
  const getPreviousCrop = () => {
    setCropIndex(prev => prev === 0 ? cropKeys.length - 1 : prev - 1)
  }

  const resetPlot = () => {
    cancelTileAction()
    clearPlot()
  }

  const getPlotSvgImage = (tileType) => {
    console.log('tile type:', tileType)
    if(!tileType) return <></>
    if(!crops[tileType]) return <></>

    console.log(crops[tileType])
    return crops[tileType].SvgImage
  }

  // , {'bottom-bar-minimized': !showBottomBar}
  return (
    <StyledBottomBar className={classnames("bottom-bar-overlay")}>
      <div className="container">
        {selectedTile?.plotCode !== 0 ? (
          <PlotDetails
            selectedTile={selectedTile}
            SvgImage={getPlotSvgImage(selectedTile?.tileType)}
            resetPlot={resetPlot}
            cancelTileAction={cancelTileAction}
          />
          ) : (
          <CropSelection
            cropItem={cropItem}
            getNextCrop={getNextCrop}
            getPreviousCrop={getPreviousCrop}
            buildPlot={buildPlot}
            cancelTileAction={cancelTileAction}
          />
        )}
      </div>
    </StyledBottomBar>
  )
}

const StyledBottomBar = styled.div`
  &.bottom-bar-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border: 1px solid #000;
    min-height: 60px;
    color: #fff;
    background: ${brownColors.brown4};

    &.bottom-bar-minimized {
      
    }

    .bottom-bar-body {
      padding-top: 1rem;
    }
    .farm-details-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      border: 1px solid #fff;

      .farm-details-left {
        .farm-details-image {
          text-align: center;
          vertical-align: center;
          align-self: center;
          width: 8rem;
          height: 8rem;
          max-height: 100%;
          padding: .4rem;
          margin: auto;
          border: 1px solid #fff;
        }
      }
      .farm-details-right {
        flex: 1;
        text-align: left;
        padding-left: 1.5rem;

        .farm-detail-top {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding-top: .3rem;
        }
        .farm-detail-stats {
          display: flex;
          align-items: center;

          .farm-detail-stat-item {
            margin: 0;
            margin-right: 8px;
            font-size: 1.05rem;
            display: flex;
            align-items: center;

            .farm-detail-stat-text {
              display: inline-block;
              margin-left: 3px;
            }
          }
        }

        .farm-detail-title {
          flex: 1;
          margin: 0;
          font-size: 2.2rem;
          font-family: sans-serif;
        }
        .farm-detail-desc {
          margin: 0;
          font-size: 1.5rem;
          font-family: sans-serif;
          line-height: 1.2;
        }
      }
    }

    .bottom-bar-header {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding-top: .3rem;
      
      .bottom-bar-heading {
        flex: 1;
        margin: 0;
        margin-bottom: .75rem;
        margin-top: .75rem;
        text-align: center;
        padding-left: 1rem;
        color: #fff;
        font-size: 1.5rem;
        font-family: sans-serif;
      }

      .close-button {
        padding: 0.35rem 1rem;
        margin: 5px;
        font-size: 1rem;
        cursor: pointer;
      }
    }

    .bottom-bar-actions-list {
      list-style: none;
      margin: 0;
      margin-top: 1rem;
      padding-left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      height: 100%;

      .bottom-bar-actions-item {
        height: 100%;
        border: 1px solid #fff;
        display: inline-block;
        cursor: pointer;
        padding: 0.7rem 1rem;
        font-size: 1.2rem;
        margin: 4px .5rem;
        border-radius: 8px;
        transition: .05s ease-in-out;

        &:hover, &.primary-button {
          background: #fff;
          color: ${brownColors.brown10};
          transition: .1s ease-in-out;
        }

        &.primary-button:hover {
          background: #ccc;
          transition: .1s ease-in-out;
        }
      }
    }
  }
`