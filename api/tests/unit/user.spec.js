const API_BASE = require( '../config' );
const api = require( '../../app' );
const axios = require('axios');
const request = require("supertest");
const dotenv = require('dotenv').config();

const test_token = process.env.USER_TEST_TOKEN;
const bcrypt = require( 'bcrypt' );
const SALT_WORK_FACTOR = 10;

const users = require( '../Helpers/Users' );
// const CallUsers = require( '../__mocks__/UsersList' );

var CallUsers = async (headers = {}) => {
    var result = await request(api).get(`/users`, headers);

    return result
}

describe( "Testing Create User endpoint", () => {
    const data = {
        "name": "Usuário 3",
        "cpf": "86783252248",
        "email": "leonardo.dias4@agenciakindle.com.br",
        "password": "K1ndl3!@#",
        "occupation": "Development coodinator",
        "role": "admin",
        "income": 5500.0,
        "organization": "5f8f83ca0564ff004601ce3e"
    };
    
    const responseObj = {
        body: {
            "_id": "5fc06a69a9066000c6cae5fa",
            "name": "Usuário 3",
            "cpf": "86783252248",
            "email": "leonardo.dias4@agenciakindle.com.br",
            "password": "$2b$10$9jgi/Co2VW874DhS2YoSpeggI/Y1cOQZVOvlgn4iwUjX44J3q2fNy",
            "occupation": "Development coodinator",
            "role": "admin",
            "income": 5500,
            "organization": "5f8f83ca0564ff004601ce3e",
            "__v": 0
        }
    };
   
    it("Request Users List without token return error", async () => {
        var result = await CallUsers();
        
        expect(result.body).toStrictEqual({
            "error": {
                "status": 401,
                "message": "No token provided."
            }
        })

    }, 30000);

    it("Request Users List with token return a list of users", async () => {
        var result = await CallUsers({
            "x-access-token" : test_token
        });
        
        expect(result.body).toStrictEqual({
            "error": {
                "status": 401,
                "message": "No token provided."
            }
        })

    }, 30000);
    
});