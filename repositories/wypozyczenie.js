const RepositoryBase = require('./repositoryBase');

class WypozyczenieRepository extends RepositoryBase{
	getAll(){
		const sql = 'SELECT * FROM Wypozyczenie';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Wypozyczenie WHERE idWypozyczenie = ?";
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	getAllwInfo(){
		const sql = `SELECT * FROM Wypozyczenie JOIN Kopia_filmu ON Wypozyczenie.Kopia_filmu_ID = Kopia_filmu.idKopia_filmu 
JOIN Film ON Kopia_filmu.Film_ID = Film.idFilm
JOIN Klient ON Klient.idKlient = Wypozyczenie.Klient_ID`;
		return this.db.prepare(sql).all();
	}
	
	confirm(id){
		const sql = `UPDATE Wypozyczenie SET isconfirmed = 1 WHERE idWypozyczenie = ?`;
		return this.db.prepare(sql).run(id);
	}
	
	getAllbyClient(id){
		const sql = `
SELECT *, Film.cena*ROUND(JULIANDAY(termin_do) - JULIANDAY(termin_od)) AS cena_cala 
FROM Wypozyczenie 
JOIN Kopia_filmu ON Wypozyczenie.Kopia_filmu_id = Kopia_filmu.idKopia_filmu 
JOIN Film ON Kopia_filmu.Film_ID = Film.idFilm
WHERE Klient_ID = ?`;
		
		const zmienna = this.db.prepare(sql).all(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}	return zmienna	
	}
	
	getbyClient(id){
		const sql = "SELECT * FROM Wypozyczenie WHERE Klient_ID = ?";
		
		const zmienna = this.db.prepare(sql).all(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}		
	}
	
	addWyp(termin_od, termin_do, Klient_id, Kopia_filmu_id){
		const sql = `INSERT INTO Wypozyczenie
		(termin_od, termin_do, Klient_id, Kopia_filmu_id)
		VALUES (?, ?, ?, ?);`;
		const zmienna = this.db.prepare(sql).run(termin_od, termin_do, Klient_id, Kopia_filmu_id)
		return zmienna.lastInsertRowid
	}
	modifyWyp(id, termin_od, termin_do, Klient_id, Kopia_filmu_id){
		const sql = `UPDATE Wypozyczenie
		SET termin_od = @termin_od, termin_do = @termin_do, Klient_id = @Klient_id, Kopia_filmu_id = @Kopia_filmu_id
		WHERE idWypozyczenie = @id`
		this.db.prepare(sql).run({id,termin_od, termin_do, Klient_id, Kopia_filmu_id})
	}
	deleteWyp(id){
		const sql = `DELETE FROM Wypozyczenie
		WHERE idWypozyczenie = @id`
		this.db.prepare(sql).run({id})
	}
	
}

module.exports = WypozyczenieRepository;
