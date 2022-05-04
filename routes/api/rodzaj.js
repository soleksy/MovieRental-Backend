const express = require('express')
const router = express.Router()
const repository = new (require('../../repositories/rodzaj'))


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
	const rodzaj = req.body;
	console.log(rodzaj)
	const id = repository.addType(rodzaj.nazwa)

	res.json({
            "message":"success",
            "id": id
        })
})

router.put("/:id(\\d+)", (req, res) => {
	const { id } = req.params;
	const rodzaj = req.body;
	const rows = repository.modifyType(id, rodzaj.nazwa)
	
	res.json({
		"message":"success",
		"data": rows
	})

})

router.delete('/:id(\\d+)', (req, res) => {
	const {id} = req.params;
	const rows = repository.deleteType(id)
	
	res.json({
            "message":"success"
        })
	
})
 
module.exports = router;
