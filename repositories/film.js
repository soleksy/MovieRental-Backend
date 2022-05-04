const RepositoryBase = require('./repositoryBase');

class FilmRepository extends RepositoryBase{
	getAll(){
		const sql = 'SELECT * FROM Film';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Film WHERE idFilm = ?";
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	getbyDate(from, to){
		const sql = `
		SELECT * FROM Film
		JOIN Kopia_filmu ON Kopia_filmu.Film_id = Film.idFilm
		JOIN Wypozyczenie ON Wypozyczenie.Kopia_filmu_id = Kopia_filmu.idKopia_filmu
		WHERE idKopia_filmu NOT IN(
			SELECT Kopia_filmu_ID FROM Wypozyczenie
			WHERE(termin_od > @from and termin_od < @to)
			OR (termin_do > @from and termin_do < @to)
		)
		`;
	
		const zmienna = this.db.prepare(sql).all({ from: from, to: to });
			if(typeof zmienna == 'undefined'){
				return []
		}
		return zmienna
	}
	getbyType(id){
		const sql = `
		SELECT * FROM FILM WHERE Film.Rodzaj_id == @id `;
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	
	}
	getbyDirector(id){
		const sql = `
		SELECT * FROM FILM WHERE Film.Director_id == @id `;
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	
	}
	
	getbyActor(id){
		const sql = `
		SELECT * FROM Film
		JOIN Lista_aktorow ON Film.idFilm = Lista_aktorow.Film_idFilm
		WHERE Lista_aktorow.Actor_idActor == @id`;
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	
	addFilm(Rodzaj_id, Rezyser_id, nazwa, plakat, opis, cena){
		const sql = `
		INSERT INTO Film
		(Rodzaj_id, Rezyser_id, nazwa, plakat, opis, cena)
		VALUES (?, ?, ?, ?, ?, ?);
		`;
		const zmienna = this.db.prepare(sql).run(Rodzaj_id, Rezyser_id, nazwa, plakat, opis, cena)
		return zmienna.lastInsertRowid
	}
	
	modifyFilm(id, Rodzaj_id, Rezyser_id, nazwa, plakat, opis, cena){
		const sql = `UPDATE Film
		SET Rodzaj_id = @Rodzaj_id, Rezyser_id = @Rezyser_id, nazwa = @nazwa,
		plakat = @plakat, opis = @opis, cena = @cena
		WHERE idFilm = @id 
		`
		this.db.prepare(sql).run({id,Rodzaj_id, Rezyser_id, nazwa, plakat, opis, cena})
	}
	
	deleteFilm(id){
		const sql = `DELETE FROM Film
		WHERE idFilm = @id`
		this.db.prepare(sql).run({id})
	}
}
module.exports = FilmRepository;
