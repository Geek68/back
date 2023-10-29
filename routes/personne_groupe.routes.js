const { addPersonToGroup, getPersonsByGroup, deletePersonGroupe, addPersonsToGroupe } = require('../controllers/personne_groupe.controller')

const router = require('express').Router()

router.route('/').post(addPersonToGroup)
router.route('/addPersonsToGroup').post(addPersonsToGroupe)
router.route('/:groupeId').get(getPersonsByGroup)
router.route('/delete/:id').delete(deletePersonGroupe)

module.exports = router