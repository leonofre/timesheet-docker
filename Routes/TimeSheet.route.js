const express = require('express');
const router = express.Router();

const TimeSheetController = require('../Controllers/TimeSheet.Controller');

//Get a list of all TimeSheets
router.get('/', TimeSheetController.getAllTimeSheets);

//Create a new TimeSheet
router.post('/', TimeSheetController.createNewTimeSheet);

//Get a TimeSheet by id
router.get('/:id', TimeSheetController.findTimeSheetById);

//Get a Projects by TimeSheet
router.get('/project/:id', TimeSheetController.findTimeSheetByProject);

//Get a Organization by TimeSheet
router.get('/user/:id', TimeSheetController.findTimeSheetByUser);

//Update a TimeSheet by id
router.patch('/:id', TimeSheetController.updateATimeSheet);

//Stop a TimeSheet by id
router.patch('/:id/stop', TimeSheetController.StopATimeSheet);

//Delete a TimeSheet by id
router.delete('/:id', TimeSheetController.deleteATimeSheet);

module.exports = router;
