import './SingleCard.css'


function SignleCard({card, handleChoice, flipped}) {

    const handleClick = () => {
        handleChoice(card);
        console.log('selected card')
    }

    return(
            <div className="card">
            <div className={ flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img 
                    className="back" 
                    src="../../../src/images/cover.png" 
                    alt="card back"
                    onClick={handleClick}
                    />
            </div>
            </div>
          )
}
  


export default SignleCard