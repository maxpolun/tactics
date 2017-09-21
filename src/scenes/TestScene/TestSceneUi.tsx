import * as React from 'react'
import FpsCounter from '../../controls/FpsCounter'

export interface TestSceneUiProps {
  pause: () => void,
  move: () => void
}

export interface TestSceneUiState {
  fps: number,
  paused: boolean,
  selectedCell: boolean
}

export default class TestSceneUi extends React.Component<TestSceneUiProps, TestSceneUiState> {
  constructor (props: TestSceneUiProps) {
    super(props)
    this.state = {
      fps: 0,
      paused: false,
      selectedCell: false
    }
  }
  render () {
    return <div style={{color: 'white'}}>
        <h1>Test Scene</h1>
        <button type='button' onClick={this.props.pause}>
          {this.state.paused ? 'Unpause' : 'Pause'}
        </button>
        {this.state.selectedCell && <button type='button' onClick={this.props.move}>
          Move
        </button>}
        <FpsCounter fps={this.state.fps} />
      </div>
  }
}
