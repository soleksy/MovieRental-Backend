const express = require('express')
const router = express.Router()
const repository = new (require('../../repositories/kopia_filmu'))


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
	const kopia_filmu = req.body;
	console.log(kopia_filmu)
	const id = repository.addCopy(kopia_filmu.Film_idFilm)

	res.json({
            "message":"success",
            "id": id
        })
})

router.put("/:id(\\d+)", (req, res) => {
	const { id } = req.params;
	const kopia = req.body;
	const rows = repository.modifyCopy(id, kopia.Film_idFilm)
	
	res.json({
		"message":"success",
		"data": rows
	})

})

router.delete('/:id(\\d+)', (req, res) => {
	const {id} = req.params;
	const rows = repository.deleteCopy(id)
	
	res.json({
            "message":"success"
        })
	
}) 
module.exports = router;
