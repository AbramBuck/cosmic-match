import './SingleCard.css'
import cardBack from '../../../src/images/items/cosmic-match-bg2.jpg'

function SignleCard({card, handleChoice, flipped, disabled, hostile}) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
            console.log('selected card', hostile)
        }
    }

    // const flipVersion = () => {
    //     if (flipped && hostile) 
    // }

    return(
        <>
            {console.log(card)}
            <div className={card.hostile && flipped ? "card hostile" : "card"}>
            <div className={ flipped && card.hostile ? "hostile" : ""}>
            <div className={ flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img 
                    className="back" 
                    src={cardBack}
                    alt="card back"
                    onClick={handleClick}
                    />
            </div>
            </div>
            </div>
            </>
          )
          
}
  


export default SignleCard