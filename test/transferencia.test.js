const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias.json');

describe('Transferencias', () => {
    let token;
        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        });
    describe('POST /transferencias', () => {

        it('Deve retornar 201 com o valor da transferencia quando o valor for igual ou maior que 10 reais', async () => {
            const bodyTransferencias = { ...postTransferencias, valor: 11.00 };

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar erro 422 quando o valor da transferencia for menor que 10 reais', async () => {
            const bodyTransferencias = { ...postTransferencias, valor: 7.00 };

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(resposta.status).to.equal(422);
        });
    });

    describe('GET /transferencias/{id}', () => {

        it('Deve retornar 200 e os detalhes da transferencia', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/16')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.id).to.equal(16);
            expect(resposta.body.valor).to.equal(11.00);
            expect(resposta.body.conta_origem_id).to.equal(1);
            expect(resposta.body.conta_destino_id).to.equal(2);
        });
    });
});