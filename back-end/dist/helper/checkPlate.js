import { AppError } from "../errors/AppError.js";
import validatePlate from "./validatePlate.js";
export default function (plate) {
    const validPlate = validatePlate(plate);
    if (!validPlate)
        throw new AppError("Informações da placa estão erradas");
}
//# sourceMappingURL=checkPlate.js.map