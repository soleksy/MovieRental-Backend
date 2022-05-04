const express = require('express');
const router = express.Router();

router.use('/users', require('./klient'));
router.use('/directors', require('./rezyser'));
router.use('/actors', require('./aktor'));
router.use('/rentals', require('./wypozyczenie'));
router.use('/copies', require('./kopia'));
router.use('/films', require('./film'));
router.use('/types', require('./rodzaj'));
router.use('/reviews', require('./recenzja'));
router.use('/marks', require('./ocena'));
router.use('/categories', require('./rodzaj'));

module.exports = router;
