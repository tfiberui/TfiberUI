import React, { useEffect, useState } from "react"
import HexagonCard from "./HexagonCard"
import './Hexagon.scss'
import Details from "./Details"

function Hexagon(props) {

	const [flip, setFlip] = useState([]);
	const [shows, setShows] = useState([]);
	const [hexagons, setHexagons] = useState([]);
	const [details, setDetails] = useState([]);
	const handleCta = (id) => {
		setShows([id]);
	};
	const handleHexaClick = (id) => {
		setShows([]);
		if(flip.includes(id)) {
			setFlip([]);
		} else {
			setFlip([id]);
		}
	};

	useEffect(() => {
		populateShows();
	}, [shows, flip]);

	const populateShows = () => {
		const tempDetails = [];
		const tempHexagons = props.data.map((hexagon, index) => {
			const id = `box-content-${index}`;			

			tempDetails.push(<Details key={index} id={id} show={shows.includes(id)} details={hexagon.details} />);
			//console.log(tempDetails);
			
			return <HexagonCard key={index} data={hexagon} id={id} handleCta={handleCta} handleHexaClick={handleHexaClick} flip={flip.includes(id)} />
		});
		setHexagons(tempHexagons);
		setDetails(tempDetails);
	};

	return (
		<div className="hexagon-container">
			<div className="hexagon-cards">
				{ hexagons }
			</div>
			<div className="view-details">
				{ details }
			</div>
		</div>
	)
}

export default Hexagon;