import { Content } from '../types/types'
import { formatDate } from '../utils/utils'

const TileContent = ({
  execution_date,
  creation_date,
  check_date,
  system,
  type,
  object,
  name,
  city,
  street,
}: Content) => {
  return (
    <div className="tile-content-wrapper">
      <div className="tile-content__captions">
        <p>Создана:</p>
        {execution_date ? <p>Выполнена:</p> : <p>Контроль:</p>}
        <p>Система:</p>
        <p>Объект:</p>
      </div>
      <div className="tile-content__data">
        <p>{formatDate(creation_date, execution_date)}</p>
        {execution_date ? (
          <p>{formatDate(execution_date)}</p>
        ) : (
          <p>{formatDate(check_date)}</p>
        )}
        <p>{system && type ? `${system} | ${type}` : ''}</p>
        <p>
          {Object.keys(object).length > 0 ? `${name}, ${city}, ${street}` : ''}
        </p>
      </div>
    </div>
  )
}

export default TileContent
