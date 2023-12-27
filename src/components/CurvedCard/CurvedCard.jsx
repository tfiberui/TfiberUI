import React from "react"
import './CurvedCard.scss'

function CurvedCard(props) {
	return (
		<>
			<div className="curved-card">				
				<div className="card-title">
					<h3>{props.title}</h3>
				</div>
				<div className="card-para">
					<p>{props.text}</p>
				</div>				
			</div>
		</>
	)
}

export default CurvedCard;