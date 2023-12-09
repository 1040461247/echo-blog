import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const Timeline: FC<IProps> = memo(() => {
  return (
    <div className="timeline-wrap">
      <ul className="timeline">
        <li>
          <div className="direction-r">
            <div className="flag-wrapper">
              <span className="hexa "></span>
              <span className="flag">Lorem ipsum.</span>
              <span className="time-wrapper">
                <span className="time">Feb 2015</span>
              </span>
            </div>
            <div className="desc">
              Lorem ipsum Nisi labore aute do aute culpa magna nulla voluptate exercitation deserunt
              proident.
            </div>
          </div>
        </li>

        <li>
          <div className="direction-l">
            <div className="flag-wrapper">
              <span className="hexa"></span>
              <span className="flag">Lorem ipsum Anim.</span>
              <span className="time-wrapper">
                <span className="time">Dec 2014</span>
              </span>
            </div>
            <div className="desc">
              Lorem ipsum In ut sit in dolor nisi ex magna eu anim anim tempor dolore aliquip enim
              cupidatat laborum dolore.
            </div>
          </div>
        </li>

        <li>
          <div className="direction-r">
            <div className="flag-wrapper">
              <span className="hexa"></span>
              <span className="flag">Lorem Occaecat.</span>
              <span className="time-wrapper">
                <span className="time">July 2014</span>
              </span>
            </div>
            <div className="desc">
              Lorem ipsum Minim labore Ut cupidatat quis qui deserunt proident fugiat pariatur
              cillum cupidatat reprehenderit sit id dolor consectetur ut.
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
})

export default Timeline
Timeline.displayName = 'Timeline'
