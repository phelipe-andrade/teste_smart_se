export default function (plate) {
    const regexPlateMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/i;
    return regexPlateMercosul.test(plate);
}
//# sourceMappingURL=validatePlate.js.map