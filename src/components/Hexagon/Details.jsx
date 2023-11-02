import React, { useEffect } from "react"
import './Details.scss'

function Details({details, id, show}) {
	return (
		<div className={`hexagon-details ${(show) ? 'show' : ''}`} id={id}>
			{
				details.map((detail, index) => <div key={index} className="detail"><h3>{detail.title}</h3><p>{detail.description}</p><p className="price" dangerouslySetInnerHTML={{__html:detail.description2}}></p><a href="">{detail.cta.ctaLabel}</a></div>)
			}
		</div>
	)
}

export default Details;