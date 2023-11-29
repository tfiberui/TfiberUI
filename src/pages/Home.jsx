import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Carousel from "../components/HomeCarousel/Carousel";
import CardSlider from "../components/HomeCard/CardSlider";
import Footer from "../components/Footer/Footer";
import NewForm from "../components/HomeForm/NewForm";
import "../scss/_common.scss";
import * as XLSX from "xlsx";

const Home = () => {
  //states to store the excel data
  const [telangana, setTelangana] = useState([]);
  const [department, setDepartment] = useState([]);

  const loadTelanganaData = () => {
    const load = async () => {
      const url = "/files/TFiber_GIS_LGD_Code.xlsx";
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[2];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setTelangana(sheetData);
      console.log("Sheet: ", sheetName);
      console.log("workbook: ", workbook);
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
    <div>
      <Header />
      <Carousel />
      <CardSlider />
      <NewForm telangana={telangana} department={department}/>
      <Footer />
    </div>
  );
};

export default Home;
