const express = require('express')
const router = express.Router()
const repository = new (require('../../repositories/ocena'))


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
	const ocena = req.body;
	console.log(ocena)
	const id = repository.addOcena(ocena.scenariusz, ocena.rezyseria, ocena.dzwiek, ocena.montaz, ocena.Film_id, ocena.Klient_idKlient)

	res.json({
            "message":"success",
            "id": id
        })
})

router.put("/:id(\\d+)", (req, res) => {
	const { id } = req.params;
	const ocena = req.body;
	const rows = repository.modifyOcena(id, ocena.scenariusz, ocena.rezyseria, ocena.dzwiek, ocena.montaz, ocena.Film_id, ocena.Klient_idKlient)
	
	res.json({
		"message":"success",
		"data": rows
	})

})

router.delete('/:id(\\d+)', (req, res) => {
	const {id} = req.params;
	const rows = repository.deleteOcena(id)
	
	res.json({
            "message":"success"
        })
	
})

module.exports = router;
