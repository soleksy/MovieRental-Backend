const express = require('express')
const router = express.Router()
const repository = new (require('../../repositories/film'))


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
	const film = req.body;
	console.log(film)
	const id = repository.addFilm(film.Rodzaj_id, film.Rezyser_id, film.nazwa, film.plakat, film.opis, film.cena)

	res.json({
            "message":"success",
            "id": id
        })
})
 
router.put("/:id(\\d+)", (req, res) => {
	const { id } = req.params;
	const film = req.body;
	const rows = repository.modifyFilm(id, film.Rodzaj_id, film.Rezyser_id, film.nazwa, film.plakat, film.opis, film.cena)
	
	res.json({
		"message":"success",
		"data": rows
	})

})

router.delete('/:id(\\d+)', (req, res) => {
	const {id} = req.params;
	const rows = repository.deleteFilm(id)
	
	res.json({
            "message":"success"
        })
	
})
module.exports = router;
