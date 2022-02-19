import styled from 'styled-components'
import classnames from 'classnames'

export const SvgButton = ({
  SvgImage,
  onClick,
  height = 64,
  width = 64,
  transparent = false,
  buttonStyles = {}
}) => {

  return (
    <StyledSvgButton className={classnames("svg-button", {'transparent-button': transparent})} onClick={onClick} style={{...buttonStyles}}>
      {SvgImage && <SvgImage height={height} width={width} />}
    </StyledSvgButton>
  )
}

const StyledSvgButton = styled.button`
  /* height, width */
  outline: none;
  border: none;
  border-radius: 10%;
  padding: 4px;
  transition: transform 0.1s linear;

  &.transparent-button {
    background: transparent;
  }

  &:hover {
    svg {
      transform: scale(1.1);
      transition: transform 0.15s linear;
    }
  }
`