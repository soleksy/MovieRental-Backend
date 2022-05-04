const RepositoryBase = require('./repositoryBase');

class RezyserRepository extends RepositoryBase{
	getAll(){
		const sql = 'SELECT * FROM Rezyser';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Rezyser WHERE idRezyser = ?";
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	
	addDir(nazwiskoRezyser, imieRezyser){
		const sql = `
		INSERT INTO Rezyser
		(nazwiskoRezyser, imieRezyser)
		VALUES (?, ?);
		`;
		const zmienna = this.db.prepare(sql).run(nazwiskoRezyser, imieRezyser)
		return zmienna.lastInsertRowid
	}
	modifyDir(id, nazwiskoRezyser, imieRezyser){
		const sql = `UPDATE Rezyser
		SET  nazwiskoRezyser = @nazwiskoRezyser, imieRezyser = @imieRezyser
		WHERE idRezyser = @id 
		`
		this.db.prepare(sql).run({id, nazwiskoRezyser, imieRezyser})
	}
	deleteDir(id){
		const sql = `DELETE FROM Rezyser
		WHERE idRezyser = @id`
		this.db.prepare(sql).run({id})
	}
}
module.exports = RezyserRepository;
