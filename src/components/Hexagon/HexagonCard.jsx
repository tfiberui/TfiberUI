import React, { useState } from "react"
import './HexagonCard.scss'

function HexagonCard({ data, id, handleCta, handleHexaClick, flip }) {

	console.log('flip: ', flip);

	return (
		<div className={flip ? 'hexagon-card flip' : 'hexagon-card'}>
			<div className="hexagon-wrapper">
				<div className="hexagon-front">
					<img className="bg" src={data.frontBGImage} />
					<div className="content" onClick={(e) => {handleHexaClick(id);}}>
						<img src={data.logo} />
						<div className="text-wrapper">
							<h3 dangerouslySetInnerHTML={{__html:data.title}}></h3>
							<h4>{data.subtitle}</h4>
						</div>
					</div>
				</div>
				<div className="hexagon-back">
					<img className="bg" src={data.backBGImage} />
					<div className="content" onClick={(e) => {handleHexaClick(id);}}>
						<div className="text-wrapper-back">
							<h3 dangerouslySetInnerHTML={{__html:data.title}}></h3>
							<p>{data.description}</p>
						</div>					
					</div>
					<div className="cta">
						<a href="" onClick={(e) => {e.preventDefault(); handleCta(id);}}>{data.cta.ctaLabel}</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HexagonCard;