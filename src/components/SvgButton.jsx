import styled from 'styled-components'

export const SvgButton = ({
  SvgImage,
  onClick,
  height = 32,
  width = 32
}) => {

  return (
    <StyledSvgButton className="svg-button" onClick={onClick}>
      <SvgImage height={height} width={width} />
    </StyledSvgButton>
  )
}

const StyledSvgButton = styled.button`
  /* height, width */

  &:hover {
    svg {
      transform: scale(1.1);
    }
    svg {
      outline: none;
      transition: transform 0.15s linear;
    }
  }
`