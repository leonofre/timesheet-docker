const API_BASE = 'http://app:3000/';

const mockAxios = require('jest-mock-axios').default;
const axios = require('axios');

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


function CallCreate(data) {
    var result = axios.post(`${API_BASE}users`, data).then(data => {
        const {body} = data;

        return body;
    }).catch( err => {
        return err.response.data;   
    });

    return result
}

describe("Testing Create User endpoint", () => {
    let catchFn = jest.fn(),
    thenFn = jest.fn();

   
    CallCreate(data).then(thenFn).catch(catchFn);

    it("Should called 1 time", () => {
        expect(mockAxios.post).toHaveBeenCalledWith(`${API_BASE}users`, data );
    });

    it("Return object similar to responseObj variable", () => {
        mockAxios.mockResponse(responseObj)

        expect(thenFn).toBeCalledWith(
            expect.objectContaining({
                "_id": expect.any(String),
                "name": "Usuário 3",
                "cpf": "86783252248",
                "email": "leonardo.dias4@agenciakindle.com.br",
                "password": expect.any(String),
                "occupation": "Development coodinator",
                "role": "admin",
                "income": 5500.0,
                "organization": "5f8f83ca0564ff004601ce3e",
                "__v": expect.any(Number),
            }),
        );    
    });

    it("Don't call catch", () => {
        expect(catchFn).not.toHaveBeenCalled();    
    });
    
});