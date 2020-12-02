const API_BASE = require( '../config' );
const axios = require('axios');

const bcrypt = require( 'bcrypt' );
const SALT_WORK_FACTOR = 10;

const users = require( '../Helpers/Users' );
// const CallUsers = require( '../__mocks__/UsersList' );

var CallUsers = async (headers) => {
    var result = await axios.get(`${API_BASE}users`, headers);

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
   
    it("Return object similar to responseObj variable", async () => {
        var call = await CallUsers();
        
        var result = call.then( data => {
            return data
        }).catch( (err) => {
            console.log(err.data)
            return err
        })
        
        expect(result).toBe('1')

    }, 30000);


    // it("Return object similar to responseObj variable", () => {
    //     mockAxios.mockResponse(responseObj)

    //     expect(thenFn).toBeCalledWith(
    //         expect.objectContaining({
    //             "_id": expect.any(String),
    //             "name": data.name,
    //             "cpf": data.cpf,
    //             "email": data.email,
    //             "password": expect.any(String),
    //             "occupation": data.occupation,
    //             "role": data.role,
    //             "income": data.income,
    //             "organization": data.organization,
    //             "__v": expect.any(Number),
    //         }),
    //     );    
    // });

    // it("Don't call catch", () => {
    //     expect(catchFn).not.toHaveBeenCalled();    
    // });
    
});

// describe( "Testing List Users", () => {
//     let catchFn = jest.fn(),
//     thenFn = jest.fn();

//     CallUsers().then( thenFn ).catch( catchFn );

//     it("Should called 1 time", () => {
//         expect( mockAxios.get ).toHaveBeenCalledWith( `${API_BASE}users` );
//     });

//     it("Return object similar to responseObj variable", () => {
//         mockAxios.mockResponse( users )
// console.log( thenFn )
//         expect(thenFn).toBeCalledWith(
//             expect.objectContaining( users ),
//         );    
//     });

//     it("Don't call catch", () => {
//         expect(catchFn).not.toHaveBeenCalled();    
//     });
    
// });