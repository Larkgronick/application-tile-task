import { useEffect, useRef, useState } from 'react'
import gearIcon from './assets/gear.svg'
import { formatNumberWithSpaces, formatDate, setStatusColor } from './utils'
import './Tile.css'

const Tile = () => {
  const textContentRef = useRef(null)
  const [applicationData, setApplicationData] = useState(null)
  const [isTextOverlap, setIsTextOverlap] = useState(false)
  const [isFolded, setIsFolded] = useState(true)

  useEffect(() => {
    fetch('../applicationData.json')
      .then((response) => response.json())
      .then((data) => {
        setApplicationData(data)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (textContentRef.current) {
      const { scrollHeight, clientHeight } = textContentRef.current
      setIsTextOverlap(scrollHeight > clientHeight)
      setIsFolded(scrollHeight > clientHeight)
    }
  }, [applicationData])

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
      object,
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
              <p>{formatDate(creation_date, execution_date)}</p>
              {execution_date ? (
                <p>{formatDate(execution_date)}</p>
              ) : (
                <p>{formatDate(check_date)}</p>
              )}
              <p>{system && type ? `${system} | ${type}` : ''}</p>
              <p>
                {Object.keys(object).length > 0
                  ? `${name}, ${city}, ${street}`
                  : ''}
              </p>
            </div>
          </div>

          <hr className="tile-delimiter" />
          <div className="tile-text">
            <p
              ref={textContentRef}
              className={`tile-text__content ${
                isFolded ? 'folded' : 'unfolded'
              }`}
            >
              {text}
            </p>
          </div>
          {isTextOverlap && (
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
