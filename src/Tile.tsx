import { useTileData } from './hooks/useTileData'

import TileHeading from './components/TileHeading'
import TileContent from './components/TileContent'
import TileText from './components/TileText'

import { ApiResponse } from './types/types'
import './Tile.css'

const Tile = () => {
  const { applicationData, isLoading, error } = useTileData()

  if (isLoading) {
    return <div className="tile">Загрузка данных заявки ⏳</div>
  } else if (error) {
    return (
      <div className="tile">
        К сожалению при загрузке данных возникла ошибка 😞
      </div>
    )
  } else {
    const {
      number,
      creation_date,
      check_date,
      execution_date,
      system,
      type,
      object,
      object: { name, city, street },
      text,
      status,
      isTechnological,
    }: ApiResponse = applicationData
    return (
      <div className="tile">
        <TileHeading
          number={number}
          status={status}
          isTechnological={isTechnological}
        />
        <div className="tile-content">
          <TileContent
            creation_date={creation_date}
            check_date={check_date}
            execution_date={execution_date}
            system={system}
            type={type}
            object={object}
            name={name}
            city={city}
            street={street}
          />
          <hr className="tile-delimiter" />
          <TileText text={text} />
        </div>
      </div>
    )
  }
}

export default Tile
