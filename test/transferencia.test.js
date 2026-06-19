const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar 201 com o valor da transferencia quando o valor for igual ou maior que 10 reais', async () => {
            // Primeiro, faça login para obter o token de autenticação
            const respostaLogin = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                'username': 'julio.lima',
                'senha': '123456'
            });
            const token = respostaLogin.body.token;
            
            const resposta = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                contaOrigem: 1,
                contaDestino: 2,
                valor: 11.00,
                token: ''
            });
            expect(resposta.status).to.equal(201);
        });
        it('Deve retornar erro 422 quando o valor da transferencia for menor que 10 reais', async () => {
            const respostaLogin = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                'username': 'julio.lima',
                'senha': '123456'
            });
            const token = respostaLogin.body.token;

            const resposta = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                contaOrigem: 1,
                contaDestino: 2,
                valor: 5.00,
                token: ''
            });
            expect(resposta.status).to.equal(422);
        });
    });
});