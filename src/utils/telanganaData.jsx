import readXlsxFile from "read-excel-file";

const capitalize = (str) => {
    let ans = str.toLowerCase();
    return ans.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const fetchTelanganaData = () => {
    const telanganaDataFile = '/public/files/telangana-data.xlsx';
    const columns = {
        district: 5,
        disrictLGDC: 4,
        mandal: 7,
        mandalLGDC: 6,
        gp: 9,
        gpLGDC: 8,
        postalCode: 10
    };
    const skiprows = 2;

    return fetch(telanganaDataFile)
            .then(response => response.blob())
            .then(blob => readXlsxFile(blob))
            .then((rows) => {
                // console.log('rows: ', rows);
                const districts = [];
                const districtsWithCode = {};
                const districtsWithMandals = {};
                const mandalsWithCode = {};
                const mandalsWithGp = {};
                const gpWithCode = {};
                const pincodeWithGP = {};
                const gpWithPincode = {};
                const pincodes = [];
                const gpPincodeWithLGDC = {};
                const gpMandalDistrictWithLGDC = {};
                const gpDistrictWithLGDC = {};
                const gpDistrictPincodeWithLGDC = {};
                const pincodeWithLGDC = {};

                rows.forEach((row, index) => {
                    if(index > skiprows - 1) {
                        if(!districts.includes(capitalize(row[columns.district]))) {
                            districts.push(capitalize(row[columns.district]));
                            districtsWithCode[capitalize(row[columns.district])] = row[columns.disrictLGDC];
                            districtsWithMandals[capitalize(row[columns.district])] = [capitalize(row[columns.mandal])];
                            mandalsWithCode[capitalize(row[columns.mandal])] = row[columns.mandalLGDC];
                        } else {
                            if(!districtsWithMandals[capitalize(row[columns.district])].includes(capitalize(row[columns.mandal]))) {
                                districtsWithMandals[capitalize(row[columns.district])].push(capitalize(row[columns.mandal]));
                                mandalsWithCode[capitalize(row[columns.mandal])] = row[columns.mandalLGDC];
                            }
                        }

                        if(!mandalsWithGp[capitalize(row[columns.mandal])]) {
                            mandalsWithGp[capitalize(row[columns.mandal])] = [capitalize(row[columns.gp])];
                        } else {
                            mandalsWithGp[capitalize(row[columns.mandal])].push(capitalize(row[columns.gp]));
                        }

                        gpWithCode[capitalize(row[columns.gp])] = row[columns.gpLGDC];
                        gpDistrictWithLGDC[capitalize(row[columns.gp]) + ', ' + capitalize(row[columns.district])] = row[columns.gpLGDC];
                        gpMandalDistrictWithLGDC[capitalize(row[columns.gp]) + ', ' + capitalize(row[columns.mandal]) + ', ' + capitalize(row[columns.district]) + ', Telangana, India'] = row[columns.gpLGDC];

                        if(!isNaN(row[columns.postalCode])) {
                            if(pincodeWithGP[row[columns.postalCode]]) {
                                pincodeWithGP[row[columns.postalCode]].push(capitalize(row[columns.gp]));
                            } else {
                                pincodeWithGP[row[columns.postalCode]] = [capitalize(row[columns.gp])];
                            }
                            gpWithPincode[capitalize(row[columns.gp])] = row[columns.postalCode];
                            gpPincodeWithLGDC[capitalize(row[columns.gp]) + ', Telangana, India, ' + row[columns.postalCode]] = row[columns.gpLGDC];
                            gpDistrictPincodeWithLGDC[capitalize(row[columns.gp]) + ', ' + capitalize(row[columns.district]) + ', ' + row[columns.postalCode]] = row[columns.gpLGDC];
                            if(!pincodes.includes(row[columns.postalCode])) {
                                pincodes.push(row[columns.postalCode]);
                            }
                            pincodeWithLGDC[row[columns.postalCode]] = row[columns.gpLGDC];
                        }
                    }
                });

                districts.sort();
                pincodes.sort();

                // console.log('districts: ', districts);
                // console.log('districtsWithCode: ', districtsWithCode);
                // console.log('districtsWithMandals: ', districtsWithMandals);
                // console.log('mandalsWithCode: ', mandalsWithCode);
                // console.log('mandalsWithGp: ', mandalsWithGp);
                // console.log('gpWithCode: ', gpWithCode);
                // console.log('pincodeWithGP: ', pincodeWithGP);
                // console.log('gpWithPincode: ', gpWithPincode);
                // console.log('pincodes: ', pincodes);

                return {
                    districts,
                    districtsWithCode,
                    districtsWithMandals,
                    mandalsWithCode,
                    mandalsWithGp,
                    gpWithCode,
                    pincodeWithGP,
                    gpWithPincode,
                    pincodes,
                    gpPincodeWithLGDC,
                    gpMandalDistrictWithLGDC,
                    gpDistrictWithLGDC,
                    gpDistrictPincodeWithLGDC,
                    pincodeWithLGDC
                };
            });
};

const fetchDepartmentData = () => {
    const departmentDataFile = '/public/files/department.xlsx';
    const columns = {
        department: 3,
        subDepartment: 2
    };
    const skiprows = 3;

    return fetch(departmentDataFile)
            .then(response => response.blob())
            .then(blob => readXlsxFile(blob))
            .then((rows) => {
                // console.log('rows: ', rows);
                const departments = [];
                const departmentWithSubDepartments = {};

                rows.forEach((row, index) => {
                    if(index > skiprows - 1) {
                        if(!departments.includes(row[columns.department])) {
                            departments.push(row[columns.department]);
                            departmentWithSubDepartments[row[columns.department]] = [row[columns.subDepartment]];
                        } else {
                            departmentWithSubDepartments[row[columns.department]].push(row[columns.subDepartment]);
                        }
                    }
                });

                departments.sort();

                return {
                    departments,
                    departmentWithSubDepartments
                };
            });
};

export { fetchTelanganaData, fetchDepartmentData };