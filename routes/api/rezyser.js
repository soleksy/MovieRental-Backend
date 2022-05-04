const express = require('express')
const router = express.Router()
const repository = new (require('../../repositories/rezyser'))


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
	const rezyser = req.body;
	console.log(rezyser)
	const id = repository.addDir(rezyser.nazwiskoRezyser, rezyser.imieRezyser)

	res.json({
            "message":"success",
            "id": id
        })
})

router.put("/:id(\\d+)", (req, res) => {
	const { id } = req.params;
	const rezyser = req.body;
	const oldrezyser = repository.getbyId(id);
	
	const rows = repository.modifyDir(id, rezyser.nazwiskoRezyser, rezyser.imieRezyser)
	
	res.json({
		"message":"success",
		"data": rows
	})

})

router.delete('/:id(\\d+)', (req, res) => {
	const {id} = req.params;
	const rows = repository.deleteDir(id)
	
	res.json({
            "message":"success"
        })
	
})
 
module.exports = router;
