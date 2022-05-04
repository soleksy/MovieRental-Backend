const express = require('express')
const router = express.Router()
const repository = new (require('../../repositories/aktor'))


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
	const aktor = req.body;
	console.log(aktor)
	const id = repository.addActor(aktor.nazwiskoAktor, aktor.imieAktor)

	res.json({
            "message":"success",
            "id": id
        })
}) 

router.put("/:id(\\d+)", (req, res) => {
	const { id } = req.params;
	const aktor = req.body;
	const oldaktor = repository.getbyId(id);
	if(!oldaktor){
		res.json({
		"error":"wrong Id"
		})
		return
	}const rows = repository.modifyActor(id, aktor.nazwiskoAktor, aktor.imieAktor)
	
	res.json({
		"message":"success",
		"data": rows
	})

})

router.delete('/:id(\\d+)', (req, res) => {
	const {id} = req.params;
	const rows = repository.deleteActor(id)
	
	res.json({
            "message":"success"
        })
	
})
module.exports = router;
