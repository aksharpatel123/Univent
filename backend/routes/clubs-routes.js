const express = require('express');
const { check } = require('express-validator');

const clubsControllers = require('../controllers/clubs-controllers');

const router = express.Router();

router.post(
    '/',
    [
        check('clubname').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    clubsControllers.createClub
    );
    
router.get('/allclubs', clubsControllers.getAllClubs);
router.get('/users', clubsControllers.getClubsByUserId);
router.get('/:cn', clubsControllers.getClubByName);
router.patch('/:cn', clubsControllers.updateClub);
router.delete('/:cn', clubsControllers.deleteClub);

module.exports = router;