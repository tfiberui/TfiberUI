import React, { useState } from "react";
import * as XLSX from "xlsx";
import trigger from "/assets/Group 117.png";
const Excel = () => {
  const [res, setRes] = useState([]);
  const [pin, setPin] = useState(0);

  const readExcelFile = () => {
    const url = "/files/data.xls"; // Adjust the path based on your file location

    const fetchExcelFile = async () => {
      const response = await fetch(url);

      const arrayBuffer = await response.arrayBuffer();

      const data = new Uint8Array(arrayBuffer);

      const workbook = XLSX.read(data, { type: "array" });

      // Access the first sheet of the workbook

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      // Parse sheet data

      const sheetData = XLSX.utils.sheet_to_json(sheet);

      //   console.log(sheetData); // Output data to console
      // setRes(sheetData);

      // filter based on pincode
      const filteredData = sheetData.filter(
        (row) => row.__EMPTY_10 === pin
      );

      const arr = [];

      filteredData.forEach((element) => {
        arr.push(element.__EMPTY_9);
      });

      setRes(arr);

      res.forEach((element) => {
        console.log(element);
      });
      // console.log(res.length)

      res.forEach();
    };

    fetchExcelFile();
  };

  return (
    <div>
      {/* <button onClick={readExcelFile}>Fetch</button> */}
      <div>
        <input type="text" placeholder="pin" onBlur={readExcelFile} value={pin} onChange={(e) => setPin(e.target.value)}/>
        
      </div>
      <h1>{res[0]}</h1>
      <select name="gp" id="gp">
        {res.map((item, index) => (
          <option value="1" key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Excel;
