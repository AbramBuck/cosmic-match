import './SingleCard.css'


function SignleCard({card}) {
    return(
            <div className="card">
            <div>
                <img className="front" src={card.src} alt="card front" />
                <img className="back" src="../../../src/images/cover.png" alt="card back"/>
            </div>
            </div>
          )
}
  


export default SignleCard