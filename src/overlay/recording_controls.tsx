import * as React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { IReduxWorld } from '../redux/world/types'
import { Slider } from '@rmwc/slider'
import { IconButton } from '@rmwc/icon-button'
import { ThemeProvider } from '@rmwc/theme'


const Container = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: auto;
  padding-top: 10px;
  background: #ffffff12; 
`
const SliderContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`
const SliderS = styled(Slider)`
  pointer-events: auto;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const IconButtonS = styled(IconButton)`
  pointer-events: auto;
  color: #EEE;
`
const InfoBox = styled.div`
  color: #aaa;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`

function usToTime(durationUs: number) {
  var milliseconds: number = Math.floor(durationUs / 1000);
  var seconds: number = Math.floor((milliseconds / 1000) % 60);
  var minutes: number = Math.floor((milliseconds / (1000 * 60)) % 60);
  var hours: number = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  let h: string = (hours < 10) ? "0" + hours.toString() : hours.toString();
  let m: string = (minutes < 10) ? "0" + minutes.toString() : minutes.toString();
  let s: string = (seconds < 10) ? "0" + seconds.toString() : seconds.toString();
  let ms: string = milliseconds.toString();

  return h + ":" + m + ":" + s + "." + ms;
}

export function RecordingControls(props: any) {
  const dispatch = useDispatch();
  const world: IReduxWorld = props.world;

  const [value, setValue] = React.useState(0);
  const [play, setPlay] = React.useState(false);

  return <Container>
    <ButtonContainer>
      <IconButtonS icon="keyboard_arrow_left" label="Step Back" disabled={play}
        onClick={() => {console.log("Step Back")}}
      />
      {play?
        <IconButtonS icon="pause" label="Pause"
          onClick={() => setPlay(false)}
        />
      :
        <IconButtonS icon="play_arrow" label="Play"
          onClick={() => setPlay(true)}
        />
      }
      <IconButtonS icon="keyboard_arrow_right" label="Step Forward" disabled={play}
        onClick={() => {console.log("Step Forward")}}
      />
    </ButtonContainer>

    <ThemeProvider
      options={{
        primary: 'black',
        secondary: "#EEE",
      }}
    >
      <SliderContainer>
        <SliderS
          value={value}
          onChange={evt => setValue(evt.detail.value)}
          onInput={evt => setValue(evt.detail.value)}
          min={0}
          max={world.recLength}
        />
      </SliderContainer>
    </ThemeProvider>

    <InfoBox>{usToTime(world.timestamp)} [{world.timestamp} us]</InfoBox>
  </Container>
}
