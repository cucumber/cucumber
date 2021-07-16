import React from 'react'
import humanFriendlyDuration from '../../humanFriendlyDuration'

interface IProps {
  durationMillis: number
}

export const Duration: React.FunctionComponent<IProps> = ({ durationMillis }) => {
  const duration = humanFriendlyDuration(durationMillis)

  return (
    <span>
      {duration.days > 0 && <span>{duration.days}d</span>}&nbsp;
      {duration.hours > 0 && <span>{duration.hours}h</span>}&nbsp;
      {duration.minutes > 0 && <span>{duration.minutes}m</span>}&nbsp;
      {duration.seconds > 0 && <span>{duration.seconds}s</span>}&nbsp;
      {duration.millis > 0 && <span>{duration.millis}ms</span>}
    </span>
  )
}
