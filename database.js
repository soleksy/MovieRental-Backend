const sqlite = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let isInitialized;
function exportDb() {
	const DBFILE = path.join(__dirname, 'database.sqlite3');
	const db = sqlite(DBFILE);
	db.pragma('journal_mode = WAL');
	db.pragma('synchronous = FULL');

	let stmt = db.prepare(`SELECT name
		FROM sqlite_master
		WHERE type='table';`);
	let row = stmt.get();
	if(row === undefined){
		console.log("WARNING: database appears empty; initializing it.");
		db.exec(fs.readFileSync('./wypozyczalnia_baza.sql').toString());
	}
	return db;
}

module.exports = exportDb();

