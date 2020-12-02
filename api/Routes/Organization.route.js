const express = require('express');
const router = express.Router();

const OrganizationController = require('../Controllers/Organization.Controller');

//Get a list of all Organizations
router.get('/', OrganizationController.getAllOrganizations);

//Create a new Organization
router.post('/', OrganizationController.createNewOrganization);

//Get a Organization by id
router.get('/:id', OrganizationController.findOrganizationById);

//Get a Client by Organization
router.get('/:id/clients', OrganizationController.findClientsByOrganization);

//Get a Client by Organization
router.get('/:id/employees', OrganizationController.findEmployeesByOrganization);

//Update a Organization by id
router.patch('/:id', OrganizationController.updateAOrganization);

//Delete a Organization by id
router.delete('/:id', OrganizationController.deleteAOrganization);

module.exports = router;
