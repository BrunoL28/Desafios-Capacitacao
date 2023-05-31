const Musica = require('../models/Musica');
const QueryError = require('../../../../errors/QueryError');
const InvalidParamError = require('../../../../errors/InvalidParamError');

class MusicaService {

    /**
     * Função que retorna todas as músicas existentes.
     * @returns Musica
     */

    async retorno() {
        const musicas = await Musica.findAll();
        if (musicas.lenght === 0) {
            throw new QueryError('Nenhuma música encontrada');
        }
        return musicas;
    }

    /**
     * Função que verifica se uma música já existe checando seu título.
     * @param {*} body 
     * @returns boolean
     */

    async verificacao(body) {
        let check = false;
        const musica = await Musica.findOne( { where: { titulo: body.nome } } );
        if (musica) {
            check = true;
        } else {
            check = false;
        }
        return check;
    }

    /**
     * Função responsável por criar uma música, se ela não existir e se seus atributos estiverem todos preenchidos.
     * @param {*} body 
     */

    async criacao(body) {
        if (body.foto === '' || body.titulo === '' || body.artistaId == '' || body.categoria === '') {
            throw new QueryError('Informações de música incompletas');
        }
        if (this.verificacao(body) === true) {
            throw new InvalidParamError('Essa música já existe');
        }
        await Musica.create(body);
    }

    /**
     * Função que encontra uma música por seu id.
     * @param {*} id 
     * @returns Musica
     */

    async encontrar(id) {
        const musica = await Musica.findByPk(id);
        if (!musica) {
            throw new QueryError('Música não foi encontrada');
        }
        return musica;
    }

    /**
     * Função que recebe como parâmetro um id, busca a música referente ao id e substitui informações
     * dessa música pelas informações passadas no segundo parâmetro.
     * @param {*} id 
     * @param {*} att_musica 
     * @returns Musica
     */

    async atualizar(id, att_musica) {
        const musica = await this.encontrar(id);
        if (musica === null) {
            throw new InvalidParamError('Nenhuma musica encontrada com esse id');
        }
        if (att_musica.foto === '' || att_musica.titulo === '' || att_musica.artistaId === '' || att_musica.categoria === '') {
            throw new QueryError('Informações de música incompletas');
        }
        const musicaAtualizada = await musica.update(att_musica, { where: { id: id } });
        return musicaAtualizada;
    }

    /**
     * Função que recebe um id como parâmetro e deleta a música ligada a esse id.
     * @param {*} id 
     */

    async deletar(id) {
        const musica = await this.encontrar(id);
        if (musica === null) {
            throw new InvalidParamError('Nenhuma musica encontrada com esse id');
        }
        await musica.destroy();
    }
}

module.exports = new MusicaService;