import { useState, useEffect } from 'react'
import styled from 'styled-components'
// icons
import { ReactComponent as PlaySvg } from '../assets/ui-icons/play.svg'
import { ReactComponent as PauseSvg } from '../assets/ui-icons/pause.svg'
import { ReactComponent as BackSvg } from '../assets/ui-icons/back.svg'
import { ReactComponent as NextSvg } from '../assets/ui-icons/next.svg'

const SONGS = 3

export const AudioPlayer = ({
  songUrl,
  goBack,
  goForward
}) => {
  const [audioSource, setAudioSource] = useState(null)

  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const newAudio = new Audio(songUrl)
    newAudio.load()
    setAudioSource(newAudio)
  }, [songUrl])

  const pause = () => {
    audioSource.pause()
    setPlaying(false)
  }
  const play = () => {
    audioSource.play()
    setPlaying(true)
  }

  const handleGoBack = () => {
    audioSource.pause()
    setPlaying(false)
    goBack()
  }
  const handleGoForward = () => {
    audioSource.pause()
    setPlaying(false)
    goForward()
  }

  return (
    <StyledAudioPlayer>
      <BackSvg width={32} height={32} onClick={handleGoBack} />
      {playing ? (
        <PauseSvg width={32} height={32} onClick={pause} />
      ) : (
        <PlaySvg width={32} height={32} onClick={play} />
      )}
      <NextSvg width={32} height={32} onClick={handleGoForward} />
    </StyledAudioPlayer>
  )
}

const StyledAudioPlayer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 1rem;
  margin-bottom: 1rem;

  * {
    margin-right: 0.3rem;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      transform: scale(1.05);
      transition: transform 0.1s linear;
    }
  }
`