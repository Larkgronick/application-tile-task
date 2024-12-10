import { useEffect, useState } from 'react'
import gearIcon from './assets/gear.svg'
import './Tile.css'

const Tile = () => {
  const [applicationData, setApplicationData] = useState(null)
  const [isFolded, setIsFolded] = useState(true)

  useEffect(() => {
    fetch('../public/applicationData.json')
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
        <p className="tile-label">
          № {number}
          <span>{status[0]}</span>
          {isTechnological && (
            <img src={gearIcon} width={20} height={20} alt="gear" />
          )}
        </p>
        <div>
          <p>Создана: {creation_date}</p>
          <p>Контроль: {check_date}</p>
          <p>Выполнена: {execution_date}</p>
          <p>
            Система: {system} | {type}
          </p>
          <p>
            Объект: {name}, {city}, {street}
          </p>
          <hr />
          <div>{text}</div>
          {text && (
            <button type="button" onClick={foldTextSection}>
              {isFolded ? 'Читать далее' : 'Развернуть'}
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default Tile
