const RepositoryBase = require('./repositoryBase');

class RecenzjaRepository extends RepositoryBase{
	getAll(){
		const sql = 'SELECT * FROM Recenzja';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Recenzja WHERE idRecenzja = ?";
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}

	addRec(Klient_idKlient, Film_idFilm, trescRecenzja, Ocena_id){
		const sql = `
			INSERT INTO Recenzja
			(Klient_idKlient, Film_idFilm, trescRecenzja, Ocena_id)
			VALUES (?, ?, ?, ?);`
		;
		const zmienna = this.db.prepare(sql).run(Klient_idKlient, Film_idFilm, trescRecenzja, Ocena_id)
		return zmienna.lastInsertRowid
	}
	modifyRec(id,Klient_idKlient, Film_idFilm, trescRecenzja, Ocena_id){
		const sql = `UPDATE Recenzja
		SET Klient_idKlient = @Klient_idKlient, Film_idFilm = @Film_idFilm, trescRecenzja=@trescRecenzja, Ocena_id=@Ocena_id
		WHERE idRecenzja = @id`
		this.db.prepare(sql).run({id, Klient_idKlient, Film_idFilm, trescRecenzja, Ocena_id})
	}
	deleteRec(id){
		const sql = `DELETE FROM Recenzja
		WHERE idRecenzja = @id`
		this.db.prepare(sql).run({id})
	}
}

module.exports = RecenzjaRepository;
