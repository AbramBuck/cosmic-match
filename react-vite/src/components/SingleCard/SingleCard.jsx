import './SingleCard.css'


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
            <div className="card">
            <div className={ flipped && hostile ? "hostile" : ""}>
            <div className={ flipped ? "flipped" : ""}>
                <img className="front" src={card?.image_url || card.src} alt="card front" />
                <img 
                    className="back" 
                    src="../../../src/images/items/cosmic-match-bg2.jpg" 
                    alt="card back"
                    onClick={handleClick}
                    />
            </div>
            </div>
            </div>
          )
}
  


export default SignleCard