const { Router } = require("express");
const { maybeAuth } = require("../middlewares/maybeAuth.js");
const JokeController = require("../controllers/jokeController.js");
const passport = require("../config/passport.js");
const Authorization = require("../middlewares/authorization.js");
const limiter = require("../middlewares/rateLimiter.js");
const jokeRouter = Router();

/**
 * @swagger
 * api/joke:
 *   post:
 *     summary: Gera uma zoeira para um perfil da Steam (com / sem login)
 *     description: >
 *      - **Usuarios nao logados**: basta enviar `profileUrl`, a piada é retornada mas o usuario **não é salvo** no banco de dados.<br>
 *      - **Usuarios logados**: devem enviar o token JWT no header `Authorization: Bearer <token>`. A piada é retornada e também **salva no histórico** do usuário.
 *     tags:
 *       - ZoAI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profileUrl
 *             properties:
 *               profileUrl:
 *                 type: string
 *                 example: "https://steamcommunity.com/profiles/7213609213868"
 *     responses:
 *       200:
 *         description: Piada gerada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 joke:
 *                   type: string
 *                   example: "Esse perfil tem mais jogos não jogados que promessas de político."
 *       400:
 *         description: Requisição inválida (URL faltando ou inválida)
 *       500:
 *         description: Erro interno ao gerar a piada
 */

jokeRouter.post("/", limiter, maybeAuth, JokeController.postJoke);

/**
 * @swagger
 * api/joke:
 *   get:
 *     summary: Devolve as jokes relacionadas aos usuarios
 *     description: Retorna um array de jokes que estao relacionadas com algum usuario
 *     tags:
 *       - ZoAI
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de piadas do usuario retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jokes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "43nj42neqwe"
 *                       content:
 *                         type: string
 *                         example: "Esse perfil tem mais jogos na steam que horas de sono"
 *                       createdAt:
 *                         type: string
 *                         format: data-time
 *                         example: "2025-09-02T12:34:56Z"
 *       401:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 *
 *
 */

jokeRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  JokeController.getJokes
);
/**
 * @swagger
 * api/joke/:id:
 *   delete:
 *     summary: Deleta uma piada do historico do usuario autenticado
 *     description: Exclui uma piadad especifica salva no banco de dados
 *     tags:
 *       - ZoAI
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID da piada a ser deletada
 *        examplea: "8381hdjnads92"
 *     responses:
 *       204:
 *         description: Piada deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Joke deleted"
 *
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Usuario nao autorizado a deletar a piada
 *       404:
 *         description: Piada nao encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 *
 */

jokeRouter.delete(
  "/:jokeId",
  passport.authenticate("jwt", { session: false }),
  Authorization.authoJoke,
  JokeController.deleteJoke
);

module.exports = jokeRouter;
