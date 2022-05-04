const RepositoryBase = require('./repositoryBase');

class AktorRepository extends RepositoryBase{
	getAll(){
		const sql = 'SELECT * FROM Aktor';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Aktor WHERE idAktor = ?";
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
		
	getbyMovie(Filmid){
		const sql = `SELECT * FROM Aktor
		JOIN Lista_aktorow ON Film_id == @id`;
		const zmienna = this.db.prepare(sql).all({id});
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	
	addActor(nazwiskoAktor, imieAktor){
		const sql = `
		INSERT INTO Aktor
		(nazwiskoAktor, imieAktor)
		VALUES (?, ?);
		`;
		const zmienna = this.db.prepare(sql).run(nazwiskoAktor, imieAktor)
		return zmienna.lastInsertRowid
	}
	modifyActor(id, nazwiskoAktor, imieAktor){
		const sql = `UPDATE Aktor
		SET  nazwiskoAktor = @nazwiskoAktor, imieAktor = @imieAktor
		WHERE idAktor = @id 
		`
		this.db.prepare(sql).run({id, nazwiskoAktor, imieAktor})
	}
	deleteActor(id){
		const sql = `DELETE FROM Aktor
		WHERE idAktor = @id`
		this.db.prepare(sql).run({id})
	}

}
module.exports = AktorRepository;
