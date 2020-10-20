const express = require('express');
const router = express.Router();

const ProjectController = require('../Controllers/Project.Controller');

//Get a list of all Projects
router.get('/', ProjectController.getAllProjects);

//Create a new Project
router.post('/', ProjectController.createNewProject);

//Get a Project by id
router.get('/:id', ProjectController.findProjectById);

//Get a Client by Project
router.get('/:id/client', ProjectController.findClientByProject);

//Update a Project by id
router.patch('/:id', ProjectController.updateAProject);

//Delete a Project by id
router.delete('/:id', ProjectController.deleteAProject);

module.exports = router;
