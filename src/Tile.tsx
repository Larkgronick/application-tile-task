import { useEffect, useState } from 'react'
import gearIcon from './assets/gear.svg'
import { formatNumberWithSpaces, setStatusColor } from './utils'
import './Tile.css'

const Tile = () => {
  const [applicationData, setApplicationData] = useState(null)
  const [isFolded, setIsFolded] = useState(true)

  useEffect(() => {
    fetch('../applicationData.json')
      .then((response) => response.json())
      .then((data) => {
        setApplicationData(data)
        setIsFolded(data?.text?.length > 100)
      })
      .catch((error) => console.log(error))
  }, [])

  const foldTextSection = () => setIsFolded(!isFolded)

  if (!applicationData) {
    return <p>Loading...</p>
  } else {
    const {
      number,
      creation_date,
      check_date,
      execution_date,
      system,
      type,
      object: { name, city, street },
      text,
      status,
      isTechnological,
    } = applicationData
    return (
      <div className="tile">
        <div className="tile-label">
          <p style={{ display: 'flex', margin: 0 }}>
            <span
              className="tile-label__number"
              style={{ backgroundColor: `${setStatusColor(status[0])}` }}
            >
              № {formatNumberWithSpaces(number)}
            </span>
            <span className="tile-label__status">{status[0]}</span>
          </p>
          {isTechnological && (
            <img
              style={{ alignSelf: 'center', marginRight: '8px' }}
              src={gearIcon}
              width={20}
              height={20}
              alt="gear"
            />
          )}
        </div>
        <div className="tile-content">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="tile-content__captions">
              <p>Создана:</p>
              {execution_date ? <p>Выполнена:</p> : <p>Контроль:</p>}
              <p>Система:</p>
              <p>Объект:</p>
            </div>
            <div className="tile-content__data">
              <p>{creation_date}</p>
              {execution_date ? <p>{execution_date}</p> : <p>{check_date}</p>}
              <p>
                {system} | {type}
              </p>
              <p>
                {name}, {city}, {street}
              </p>
            </div>
          </div>

          <hr className="tile-delimiter" />
          <div className="tile-text">
            <p
              className={`tile-text__content ${
                isFolded ? 'folded' : 'unfolded'
              }`}
            >
              {text}
            </p>
          </div>
          {text && (
            <button
              className={
                'tile-expand__button ' + (isFolded ? 'folded' : 'unfolded')
              }
              type="button"
              onClick={foldTextSection}
            >
              {isFolded ? '▾ Читать далее' : '▴ Свернуть'}
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default Tile
