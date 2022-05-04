const db = require ("../database")

class RepositoryBase {
  constructor(){
	this.db = db;
  }
  
  getById() {
    throw new Error('Not Implemented Exception');
  }
  
}

module.exports = RepositoryBase;
