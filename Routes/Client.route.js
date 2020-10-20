const express = require('express');
const router = express.Router();

const ClientController = require('../Controllers/Client.Controller');

//Get a list of all Clients
router.get('/', ClientController.getAllClients);

//Create a new Client
router.post('/', ClientController.createNewClient);

//Get a Client by id
router.get('/:id', ClientController.findClientById);

//Get a Projects by Client
router.get('/:id/projects', ClientController.findProjectByClient);

//Update a Client by id
router.patch('/:id', ClientController.updateAClient);

//Delete a Client by id
router.delete('/:id', ClientController.deleteAClient);

module.exports = router;
