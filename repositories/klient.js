const RepositoryBase = require('./repositoryBase');

class KlientRepository extends RepositoryBase {
  getAll() {
    const sql = 'SELECT * FROM Klient';
    return this.db.prepare(sql).all();
  }
  getbyId(id) {
    const sql = 'SELECT * FROM Klient WHERE idKlient = ?';

    const zmienna = this.db.prepare(sql).get(id);
    if (typeof zmienna == 'undefined') {
      throw new Error('WRONG ID');
    }
    return zmienna;
  }

  getbyMail(email) {
    const sql = 'SELECT * FROM Klient WHERE email = ?';

    return this.db.prepare(sql).get(email);
  }

  addKlient(nazwisko, imie, email, haslo, isAdmin) {
    const sql = `
			INSERT INTO Klient
			(nazwiskoKlient, imieKlient, email,haslo, isAdmin)
			VALUES (?, ?, ?, ?, ?);`;
    const zmienna = this.db
      .prepare(sql)
      .run(nazwisko, imie, email, haslo, isAdmin);
    return zmienna.lastInsertRowid;
  }
  modifyKlient(id, nazwiskoKlient, imieKlient, email, haslo) {
    const sql = `UPDATE Klient
		SET nazwiskoKlient = @nazwiskoKlient, imieKlient = @imieKlient, email=@email, haslo=@haslo
		WHERE idKlient = @id`;
    this.db.prepare(sql).run({ id, nazwiskoKlient, imieKlient, email, haslo });
  }
  deleteKlient(id) {
    const sql = `DELETE FROM Klient
		WHERE idKlient = @id`;
    this.db.prepare(sql).run({ id });
  }
}

module.exports = KlientRepository;
