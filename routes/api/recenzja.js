const express = require('express')
const router = express.Router()
const repository = new (require('../../repositories/recenzja'))


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
	const recenzja = req.body;
	console.log(recenzja)
	const id = repository.addRec(recenzja.Klient_idKlient, recenzja.Film_idFilm, recenzja.trescRecenzja, recenzja.Ocena_id)

	res.json({
            "message":"success",
            "id": id
        })
})
 
router.put("/:id(\\d+)", (req, res) => {
	const { id } = req.params;
	const recenzja = req.body;
	const rows = repository.modifyRec(id, recenzja.Klient_idKlient, recenzja.Film_idFilm, recenzja.trescRecenzja, recenzja.Ocena_id)
	
	res.json({
		"message":"success",
		"data": rows
	})

})

router.delete('/:id(\\d+)', (req, res) => {
	const {id} = req.params;
	const rows = repository.deleteRec(id)
	
	res.json({
            "message":"success"
        })
	
})
module.exports = router;
