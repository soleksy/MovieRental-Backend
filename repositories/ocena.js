const RepositoryBase = require('./repositoryBase');

class OcenaRepository extends RepositoryBase{
	getAll(){
		const sql = 'SELECT * FROM Ocena';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Ocena WHERE idOcena = ?";
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	
	addOcena(scenariusz, rezyseria, dzwiek, montaz, Film_id, Klient_idKlient){
		const sql = `
			INSERT INTO Ocena
			(scenariusz, rezyseria, dzwiek, montaz, Film_id, Klient_idKlient)
			VALUES (?, ?, ?, ?, ?, ?);`
		;
		const zmienna = this.db.prepare(sql).run(scenariusz, rezyseria, dzwiek, montaz, Film_id, Klient_idKlient)
		return zmienna.lastInsertRowid
	}
	modifyOcena(id,scenariusz, rezyseria, dzwiek, montaz, Film_id, Klient_idKlient){
		const sql = `UPDATE Ocena
		SET scenariusz = @scenariusz, rezyseria = @rezyseria, dzwiek=@dzwiek, montaz=@montaz, Film_id =@Klient_idKlient, Klient_idKlient=@Klient_idKlient
		WHERE idOcena = @id`
		this.db.prepare(sql).run({id,scenariusz, rezyseria, dzwiek, montaz, Film_id, Klient_idKlient})
	}
	deleteOcena(id){
		const sql = `DELETE FROM Ocena
		WHERE idOcena = @id`
		this.db.prepare(sql).run({id})
	}
}

module.exports = OcenaRepository;
