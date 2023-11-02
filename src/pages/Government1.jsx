import React from "react";
import { useEffect, useState } from "react";
import CurvedCard from "../components/CurvedCard/CurvedCard";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Hexagon from "../components/Hexagon/Hexagon";
import Form from "../components/Form/Form";
import Footer from "../components/Footer/Footer";
import * as XLSX from "xlsx";

function Government() {
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

	const hexagonData = [
		{
			title: 'Broadband',
			logo: '/public/assets/technology2.png',
			subtitle: '24/7 reliable internet connectivity',
			description: 'Reliable and high-speed broadband internet access is fundamental for government operations. T-Fiber offers robust internet solutions to keep government agencies online 24/7.',
			cta: {
				ctaLabel: 'View Plans'
			},
			frontBGImage: '/public/assets/Polygon26.png',
			backBGImage: '/public/assets/Polygon23.png',
			details: [
				{
					title: 'T-Net',
					description: 'Reliable internet services for Government enterprises',
					description2: 'Starting from <span>900/month</span>',
					cta: {
						ctaLabel: 'Proceed to Buy'
					}
				}
			]
		},
		{
			title: 'Internet <br/> Leased Line',
			logo: '/public/assets/technology1.png',
			subtitle: 'Guaranteed uninterrupted connectivity ',
			description: 'T-Fibers leased line services gurantees dedicated bandwidth. Ideal for institution having large number of users and spread across the campus. Users with data-intensive applications will benefit from uniterrupted connectivity.',
			cta: {
				ctaLabel: 'View Plans'
			},
			frontBGImage: '/public/assets/Polygon25.png',
			backBGImage: '/public/assets/Polygon23.png',
			details: [
				{
					title: 'T-Net',
					description: 'Reliable internet services for Government enterprises',
					description2: 'Starting from 900/month',
					cta: {
						ctaLabel: 'Proceed to Buy'
					}
				},
				{
					title: 'T-DILL',
					description: 'Dedicated Internet Leased Line for better user experience in Large Campuses',
					description2: 'Starting from 10,000/month',
					cta: {
						ctaLabel: 'Proceed to Buy'
					}
				}
			]
		},
		{
			title: 'IP-VPN',
			logo: '/public/assets/technology3.png',
			subtitle: 'Seamless and secure communication channels',
			description: 'T-Fibers IP VPN services provide secure and seamless communication channels for government services. Ensure confidential data transmission and interconnect geographically dispersed offices with ease.',
			cta: {
				ctaLabel: 'View Plans'
			},
			frontBGImage: '/public/assets/Polygon24.png',
			backBGImage: '/public/assets/Polygon23.png',
			details: [
				{
					title: 'T-Line',
					description: 'Dedicated and secure Point-to-Point IP Leased Line',
					description2: 'Starting from 10,000/month',
					cta: {
						ctaLabel: 'Proceed to Buy'
					}
				},

				{
					title: 'T-Tree',
					description: 'Reliable internet services for Government enterprises',
					description2: 'Starting from 900/month',
					cta: {
						ctaLabel: 'Proceed to Buy'
					}
				},

				{
					title: 'T-Net',
					description: 'Reliable internet services for Government enterprises',
					description2: 'Starting from 900/month',
					cta: {
						ctaLabel: 'Proceed to Buy'
					}
				}
			]
		}
	];

	return (
		<div className="page government">
			<Header />
			<section className="section">
				<Banner image="/public/assets/image_38.png" text="Efficiency in Governance with Digital Connectivity Solutions"/>
			</section>
			<section className="section">
				<div className="container curved-card-wrapper">
					<CurvedCard  title="Transformation of Government institutions" text="with digital connectivity and infrastructure solutions" />
					<CurvedCard  title="Efficient and transparent Governance" text=" we understand the critical role of connectivity in facilitation of governance" />
					<CurvedCard title="Future ready network services" text="are designed to empower Government agencies for now and in future" />
				</div>
			</section>
			<section className="section hexagon">
				<div className="container">
					<h2 className="header-two">Dedicated Services for Government sector</h2>
					<p className="paragraph">Explore our customized services</p>
					<div className="hexagon-section">
						<Hexagon data={hexagonData} />
					</div>
				</div>
			</section>
			<Form text="Check connectivity in your area" paragraph="Enter your details to find local service availability for Government Segment" paragraph2="Add your location" telangana={telangana} department={department}/> 
			<Footer /> 
		</div>
	)
}

export default Government;