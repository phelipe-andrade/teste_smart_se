import serviseUser from "./ServiceUser.js";
class UserController {
    async register(req, res) {
        const { cpf, password } = req.body;
        const result = await serviseUser.create({ cpf, password });
        return res.status(201).json(result);
    }
}
export default new UserController();
//# sourceMappingURL=CreateUserController.js.map