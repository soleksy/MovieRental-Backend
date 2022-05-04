const express = require('express')
const router = express.Router()
const repository = new (require('../../repositories/wypozyczenie'))


router.get('/', (req, res) => {
	const rows = repository.getAll();
        res.json({
            "message":"success",
            "data":rows
        })
})

router.get('/:id(\\d+)', (req, res) => {
	const { id } = req.params;
	const rows = repository.getbyId(id);
	res.json({
            "message":"success",
            "data":rows
        })
})

router.post("/new", (req, res) => {
	const wypozyczenie = req.body;
	console.log(wypozyczenie)
	const id = repository.addWyp(wypozyczenie.termin_od, wypozyczenie.termin_do, wypozyczenie.Klient_id, wypozyczenie.Kopia_filmu_id)

	res.json({
            "message":"success",
            "id": id
        })
})
router.put("/:id(\\d+)", (req, res) => {
	const { id } = req.params;
	const wypozyczenie = req.body;
	const rows = repository.modifyWyp(id, wypozyczenie.termin_od, wypozyczenie.termin_do, wypozyczenie.Klient_id, wypozyczenie.Kopia_filmu_id)
	
	res.json({
		"message":"success",
		"data": rows
	})

})

router.delete('/:id(\\d+)', (req, res) => {
	const {id} = req.params;
	const rows = repository.deleteWyp(id)
	
	res.json({
            "message":"success"
        })
	
})

module.exports = router;
