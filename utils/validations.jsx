const isSearchValid = (address, reference, priority) => {
    const response = { status: false, filteredIndex: [], maxMatchIndex: {}, type: "Validated" };
    const referenceData = (reference?.length > 0) ? reference.split(', ') : [];

    address.forEach((place, index) => {
        let foundState = false;
        let foundCountry = false;
        let foundPincode = false;

        place.address_components.forEach((components) => {
            const componentRegex = new RegExp(components.long_name, 'gi');

            if(!priority?.length > 0) {
                if (components.long_name === "Telangana") {
                    foundState = true;
                }
                if (components.long_name === "India") {
                    foundCountry = true;
                }
            
                referenceData.forEach((val) => {
                    if(val.match(componentRegex)) {
                        if(response.maxMatchIndex[index]) {
                            response.maxMatchIndex[index] = response.maxMatchIndex[index] + 1;
                        } else {
                            response.maxMatchIndex[index] = 1;
                        }
                    }
                });
            } else {
                priority.forEach((val) => {
                    if(components.types.includes(val) && components.long_name != '') {
                        foundPincode = true;
                    }
                });
            }
        });

        if ((foundState && foundCountry) || (priority || foundPincode)) {
            response.status = true;
            response.filteredIndex.push(index);
        }
    });

    return response;
};

const isPincodeValid = (pincode) => {
    const regex = [ /^(5)$/, /^(50)$/, /^(50)([0-9]{1})$/, /^(50)([0-9]{2})$/, /^(50)([0-9]{3})$/, /^(50)([0-9]{4})$/ ];
    const response = {
        status: false,
        message: 'Enter valid pincode of Telangana State'
    };

    const pincodeLength = pincode.toString().length;

    if(pincode.toString().match(regex[pincodeLength - 1])) {
        response.status = true;
        response.message = '';
    }

    return response;
}

const isMobileValid = (mobile) => {
    const regex = [ /^([6789])$/, /^([6789])([0-9]{1})$/, /^([6789])([0-9]{2})$/, /^([6789])([0-9]{3})$/, /^([6789])([0-9]{4})$/, /^([6789])([0-9]{5})$/, /^([6789])([0-9]{6})$/, /^([6789])([0-9]{7})$/, /^([6789])([0-9]{8})$/, /^([6789])([0-9]{9})$/ ];
    const response = {
        status: false,
        message: 'Enter valid mobile number'
    };

    const mobileLength = mobile.toString().length;

    if(mobile.toString().match(regex[mobileLength - 1])) {
        response.status = true;
        response.message = '';
    }

    return response;
};

const isNumeric = (number) => {
    const regex = /^[0-9]*$/;
    const response = {
        status: false,
        message: 'Enter valid number'
    };

    if(number.toString().match(regex)) {
        response.status = true;
        response.message = '';
    }

    return response;
};

const isNameValid = (name) => {
    const regex = /^[a-zA-Z ]*$/;
    const response = {
        status: false,
        message: 'Enter valid name'
    };

    if(name.toString().match(regex)) {
        response.status = true;
        response.message = '';
    }

    return response;
};

const isEmailValid = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const response = {
        status: false,
        message: 'Enter valid email address'
    };

    if(email.toString().match(regex)) {
        response.status = true;
        response.message = '';
    }

    return response;
};

export { isSearchValid, isPincodeValid, isMobileValid, isNameValid, isEmailValid, isNumeric };