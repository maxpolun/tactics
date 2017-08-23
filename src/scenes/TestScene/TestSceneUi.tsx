import * as React from 'react'

export interface TestSceneUiProps {
  pause: () => void
}

export interface TestSceneUiState {
  fps: number,
  paused: boolean
}

export default class TestSceneUi extends React.Component<TestSceneUiProps, TestSceneUiState> {
  constructor (props: TestSceneUiProps) {
    super(props)
    this.state = {
      fps: 0,
      paused: false
    }
  }
  render () {
    return <div style={{color: 'white'}}>
        <h1>Test Scene</h1>
        <button type='button' onClick={this.props.pause}>
          {this.state.paused ? 'Unpause' : 'Pause'}
        </button>
        <span>FPS: {this.state.fps}</span>
      </div>
  }
}
