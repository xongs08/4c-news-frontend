import { Component } from 'react'
import './SpinnerSVG.css'

export default class SpinnerSVG extends Component {
  render() {
    const { width } = this.props

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        stroke="#000"
        viewBox="0 0 24 24"
      >
        <g className="spinner_V8m1">
          <circle cx={12} cy={12} r={9.5} fill="none" strokeWidth={3}></circle>
        </g>
      </svg>
    )
  }
}
