const RepositoryBase = require('./repositoryBase');

class RodzajRepository extends RepositoryBase{
	getAll(){
		const sql = 'SELECT * FROM Rodzaj';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Rodzaj WHERE idRodzaj = ?";
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	
	addType(nazwa){
		const sql = `
		INSERT INTO Rodzaj
		(nazwa)
		VALUES (?);
		`;
		const zmienna = this.db.prepare(sql).run(nazwa)
		return zmienna.lastInsertRowid
	}
	modifyType(id, nazwa){
		const sql = `UPDATE Rodzaj
		SET nazwa = @nazwa
		WHERE idRodzaj = @id 
		`
		this.db.prepare(sql).run({id, nazwa})
	}
	deleteType(id){
		const sql = `DELETE FROM Rodzaj
		WHERE idRodzaj = @id`
		this.db.prepare(sql).run({id})
	}
}
module.exports = RodzajRepository;
