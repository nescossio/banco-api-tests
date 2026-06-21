const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias.json');

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token;
        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        });

        it('Deve retornar 201 com o valor da transferencia quando o valor for igual ou maior que 10 reais', async () => {


            const bodyTransferencias = { ...postTransferencias, valor: 11.00};

            const resposta = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTransferencias);
            expect(resposta.status).to.equal(201);
        });
        it('Deve retornar erro 422 quando o valor da transferencia for menor que 10 reais', async () => {


            const bodyTransferencias = { ...postTransferencias, valor: 7.00};
            const resposta = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTransferencias);
            expect(resposta.status).to.equal(422);
        });
    });
});