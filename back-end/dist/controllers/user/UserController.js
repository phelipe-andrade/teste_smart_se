import serviseUser from "../../services/ServiceUser.js";
class UserController {
    async register(req, res) {
        const { cpf, password } = req.body;
        const result = await serviseUser.create({ cpf, password });
        return res.status(201).json(result);
    }
    async token(req, res) {
        const { cpf, password } = req.body;
        const result = await serviseUser.token({ cpf, password });
        return res.status(201).json({ token: result });
    }
    async tokenValid(req, res) {
        return res.status(201).json({ status: 'success', messagem: 'Token válido.' });
    }
}
export default new UserController();
//# sourceMappingURL=UserController.js.map