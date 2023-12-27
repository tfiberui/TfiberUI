import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Banner from "../components/Banner/Banner";
import CurvedCard from "../components/CurvedCard/CurvedCard";
import Form from "../components/Form/Form";
import Hexagon from "../components/Hexagon/Hexagon";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import pageData from "../data/cellTower";

function Cell({ language }) {
	 //states to store the excel data
	 const [telangana, setTelangana] = useState([]);
	 const [department, setDepartment] = useState([]);
   
	 const loadTelanganaData = () => {
	   const load = async () => {
		 const url = "/files/data.xls";
		 const response = await fetch(url);
		 const arrayBuffer = await response.arrayBuffer();
		 const data = new Uint8Array(arrayBuffer);
		 const workbook = XLSX.read(data, { type: "array" });
		 const sheetName = workbook.SheetNames[0];
		 const sheet = workbook.Sheets[sheetName];
		 const sheetData = XLSX.utils.sheet_to_json(sheet);
		 setTelangana(sheetData);
	   };
	   load();
	 };
   
	 const loadDepartmentData = () => {
	   const load = async () => {
		 const url = "/files/department.xlsx";
		 const response = await fetch(url);
		 const arrayBuffer = await response.arrayBuffer();
		 const data = new Uint8Array(arrayBuffer);
		 const workbook = XLSX.read(data, { type: "array" });
		 const sheetName = workbook.SheetNames[0];
		 const sheet = workbook.Sheets[sheetName];
		 const sheetData = XLSX.utils.sheet_to_json(sheet);
		 setDepartment(sheetData);
	   };
	   load();
	 };
   
	 useEffect(() => {
	   console.log("useEffect says: ")
	   loadTelanganaData();
	   loadDepartmentData();	 
	 },[])

	return (
		<div className="page cell">
			<Header />
			<section className="section">
				<Banner image={pageData[language].banner.bannerImage} text={pageData[language].banner.bannerText}/>
			</section>
			<section className="section">
				<div className="container curved-card-wrapper">
					{
						pageData[language].curvedCard.map((card, index) => <CurvedCard key={index} title={card.title} text={card.text} />)
					}
				</div>
			</section>
			<section className="section">
				<div className="container">
					<h2 className="header-two">{pageData[language].hexagon.heading}</h2>
					<p className="paragraph">{pageData[language].hexagon.paragraph}</p>
					<div className="hexagon-section">
						<Hexagon data={pageData[language].hexagon.hexagonData} />
					</div>			
				</div>
			</section>
			<Form text={pageData[language].form.text} paragraph={pageData[language].form.paragraph} paragraph2={pageData[language].form.paragraph2} telangana={telangana} department={department} page ={pageData[language].form.page}/> 		
			<Footer /> 
		</div>
	)
}

export default Cell;