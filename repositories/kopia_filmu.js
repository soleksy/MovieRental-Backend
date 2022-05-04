const RepositoryBase = require('./repositoryBase');

class Kopia_filmuRepository extends RepositoryBase{
	getAll(){
		const sql = 'SELECT * FROM Kopia_filmu';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Kopia_filmu WHERE idKopia_filmu = ?";
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	getbyDate(from, to){
		const sql = `
		SELECT *,  Film.cena*ROUND(JULIANDAY(@to) - JULIANDAY(@from)) AS cena_cala FROM Film
		JOIN Kopia_filmu ON Kopia_filmu.Film_ID = Film.idFilm
		WHERE idKopia_filmu NOT IN(
			SELECT Kopia_filmu_ID FROM Wypozyczenie
			WHERE(termin_od > @from and termin_od < @to)
			OR (termin_do > @from and termin_do < @to)
		)
		`;
	
		return this.db.prepare(sql).all({ from: from, to: to });
	}
	getbyFilm(id, from, to){
		const sql = `
		SELECT * FROM Film
		JOIN Kopia_filmu ON Kopia_filmu.Film_idFilm = Film.idFilm
		WHERE idKopia_filmu=?
		`;
	
		const zmienna = this.db.prepare(sql).get(id, {from, to});
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	addCopy(Film_idFilm){
		const sql = `
			INSERT INTO Kopia_filmu
			(Film_idFilm)
			VALUES (?);`
		;
		const zmienna = this.db.prepare(sql).run(Film_idFilm)
		return zmienna.lastInsertRowid
	}
	modifyCopy(id,Film_idFilm){
		const sql = `UPDATE Kopia_filmu
		SET Film_idFilm = @Film_idFilm
		WHERE idKopia_filmu = @id`
		this.db.prepare(sql).run({id, Film_idFilm})
	}
	deleteCopy(id){
		const sql = `DELETE FROM Kopia_filmu
		WHERE idKopia_filmu = @id`
		this.db.prepare(sql).run({id})
	}
}

module.exports = Kopia_filmuRepository;
