import './SingleCard.css'


function SignleCard({card, handleChoice}) {

    const handleClick = () => {
        handleChoice(card);
        console.log('selected card')
    }

    return(
            <div className="card">
            <div>
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