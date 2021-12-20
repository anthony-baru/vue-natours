let required = (propertyType) => {
    return (v) => (v && v.length > 0) || `${propertyType} field is required`;
};

let intRequired = (propertyType) => {
    return (v) => (v && v !== Number) || `${propertyType} field is required`;
};

let filesRequired = (minFiles) => {
    return (v) => (v && v.length == minFiles) || `${minFiles} files required`;
};

let minLength = (propertyType, min_length) => {
    return (v) =>
        (v && v.length >= min_length) ||
        `${propertyType} must not be less than ${min_length} characters`;
};

const confirmPassword = (propertyType, password) => (v) =>
    (v && v === password) || `${propertyType} must be same as entered password`;

let maxLength = (propertyType, max_length) => {
    return (v) =>
        (v && v.length <= max_length) || `${propertyType} must be less than ${max_length}`;
};

const max = (propertyType, maximum) => (v) =>
    (v && v <= maximum) || `${propertyType} must not be more than ${maximum}`;

const min = (propertyType, minimum) => (v) =>
    (v && v >= minimum) || `${propertyType} must be ${minimum} or more`;

let emailFormat = () => {
    let regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (v) => (v && regex.test(v)) || "Must be a valid email";
};

const mobileFormat = () => {
    const regex = /^\+254\d{9}/;
    return (v) => (v && regex.test(v)) || "Must start with +254...";
};

let numberFormat = () => {
    let regex = /^[0-9]+$/;

    return (v) => (v && regex.test(v)) || "Must be a valid number";
};

let floatFormat = () => {
    let regex = /^[+-]?([0-9]*[.])?[0-9]+$/;

    return (v) => (v && regex.test(v)) || "Must be a valid decimal number";
};

const lowerCaseFormat = () => {
    const regex = /^(.*[a-z].*)$/;
    return (v) => (v && regex.test(v)) || "Must contain a lowercase character";
};

const fullNameFormat = () => {
    const regex = /^\s*([A-Za-z]{1,}([.,] |[-']| ))+[A-Za-z]+\.?\s*$/;
    return (v) => (v && regex.test(v)) || "Must be valid name";
};

const check = () => (v) => v === true || "You must agree to continue!";

export default {
    required,
    intRequired,
    filesRequired,
    minLength,
    maxLength,
    max,
    min,
    emailFormat,
    mobileFormat,
    numberFormat,
    floatFormat,
    confirmPassword,
    lowerCaseFormat,
    fullNameFormat,
    check,
};
