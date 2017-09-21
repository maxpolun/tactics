import * as React from 'react'
import './FpsCounter.css'

export interface FpsCounterProps {
  fps: number
}

export default class FpsCounter extends React.Component<FpsCounterProps, {}> {
  render () {
    return <div className='fps-counter'>
      <span className='fps-label'>FPS:</span> <span className='fps-value'>{this.props.fps}</span>
    </div>
  }
}
