const { Router } = require("express");
const authController = require("../controllers/authController.js");
const passport = require("../config/passport.js");
const authRouter = Router();
const Authorization = require("../middlewares/authorization.js");
const { validateRegister } = require("../validators/validateRegister.js");
const { checkRules } = require("../validators/validateProfile.js");
const { validateLogin } = require("../validators/validateLogin.js");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuario
 *     description: Autentica o usuario com username e senha, retornando dois JWT, para permitir o acesso em rotas protegidas
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: text
 *                 example: "username"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *       400:
 *         description: Requisicao invalida (faltando username ou senha)
 *       401:
 *         description: Credenciais invalidas
 *       500:
 *         description: Erro interno no servidor
 *
 *
 */

authRouter.post(
  "/login",
  validateLogin,
  checkRules,
  passport.authenticate("local", { session: false }),
  authController.login
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuario
 *     description: Cria um usuario com username e password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: text
 *                 example: "NovoUsuario"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Senha123"
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created"
 *       400:
 *         description: Requisicao invalida (faltando username ou senha) ou Username ja em uso
 *       500:
 *         description: Erro interno no servidor
 *
 *
 */

authRouter.post(
  "/register",
  validateRegister,
  checkRules,
  authController.register
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Faz o logout do usuario
 *     description: Invalida o refresh token do usuario logado.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout sucessfull"
 *       401:
 *         description: Usuario nao autenticado ou token invalido
 *       500:
 *         description: Erro interno no servidor
 *
 *
 */

authRouter.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.logout
);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Gera um novo access token
 *     description: Recebe um refresh token válido e retorna um novo access token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Novo access token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Refresh token nao enviado ou invalido
 *       401:
 *         description: Refresh token expirado ou invalido
 *       500:
 *         description: Erro interno no servidor
 *
 *
 */

authRouter.post("/refresh", Authorization.authoRefresh, authController.refresh);

module.exports = authRouter;
