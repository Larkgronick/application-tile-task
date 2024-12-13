import { useEffect, useRef, useState } from 'react'

const TileText = ({ text }: { text: string }) => {
  const textContentRef = useRef(null)
  const [isTextOverlap, setIsTextOverlap] = useState(false)
  const [isFolded, setIsFolded] = useState(true)

  const foldTextSection = () => setIsFolded(!isFolded)

  useEffect(() => {
    if (textContentRef.current) {
      const { scrollHeight, clientHeight } = textContentRef.current
      const isOverlap = scrollHeight > clientHeight
      setIsTextOverlap(isOverlap)
      setIsFolded(isOverlap)
    }
  }, [])

  return (
    <>
      <div className="tile-text">
        <p
          ref={textContentRef}
          className={`tile-text__content ${isFolded ? 'folded' : 'unfolded'}`}
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
    </>
  )
}

export default TileText
