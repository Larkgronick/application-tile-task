import { Heading } from '../types/types'
import gearIcon from '../assets/gear.svg'
import { formatNumberWithSpaces, setStatusColor } from '../utils/utils'

const TileHeading = ({ number, status, isTechnological }: Heading) => {
  return (
    <div className="tile-heading">
      <p className="tile-heading__label">
        <span
          className="tile-heading__number"
          style={{ backgroundColor: `${setStatusColor(status)}` }}
        >
          № {formatNumberWithSpaces(number)}
        </span>
        <span className="tile-heading__status">{status}</span>
      </p>
      {isTechnological && (
        <img
          style={{ alignSelf: 'center', marginRight: '8px' }}
          src={gearIcon}
          width={20}
          height={20}
          alt="technological application icon"
        />
      )}
    </div>
  )
}

export default TileHeading
