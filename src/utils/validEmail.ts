const {throwError } = require("../utils/throwError");


const validateEmail = (email: string) => {

    // if (!email || email.trim() === "") {
    //     throwError("Invalid email format: Email must be a non-empty string", 400);
    // }

    // const parts = email.split("@");

    // if (parts.length !== 2) {
    //  throwError("Invalid email format: Must contain exactly one '@' symbol", 400);
    // }

    // const localPart: string = parts[0] ?? "";

    // if (/^\d+$/.test(localPart)) {
    //     throwError("Invalid email: Local part must not contain only numbers", 422);
    // }

    if (!email || email.trim() === "") {
        throwError("Invalid email format: Email must be a non-empty string", 400);
    }

    const parts = email.split("@");
    if (parts.length !== 2) {
        throwError("Invalid email format: Must contain exactly one '@' symbol", 400);
    }

    const localPart: string = parts[0] ?? "";
    const domainPart: string = parts[1] ?? "";

    // Local part must not be only numbers
    if (/^\d+$/.test(localPart)) {
        throwError("Invalid email: Local part must not contain only numbers", 422);
    }

    // Domain must contain at least one dot, e.g., "tom.com"
    if (!domainPart.includes(".")) {
        throwError("Invalid email format: Domain must contain a '.'", 400);
    }

    // Very simple domain pattern check
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domainPart)) {
        throwError("Invalid email format: Domain is not valid", 400);
    }


};


module.exports = validateEmail;