const express = require('express');
const router = express.Router();
const repository = new (require('../../repositories/klient'))();

router.get('/', (req, res) => {
  const rows = repository.getAll();
  res.json({
    message: 'success',
    data: rows,
  });
});

router.get('/:id(\\d+)', (req, res) => {
  const { id } = req.params;
  const rows = repository.getbyId(id);
  res.json({
    message: 'success',
    data: rows,
  });
});

router.get('/email/:email', (req, res) => {
  const { email } = req.params;
  const rows = repository.getbyMail(email);
  res.json({
    message: 'success',
    data: rows,
  });
});

router.post('/new', (req, res) => {
  const klient = req.body;
  console.log(klient);
  const id = repository.addKlient(
    klient.nazwiskoKlient,
    klient.imieKlient,
    klient.email,
    klient.haslo,
    0
  );

  res.json({
    message: 'success',
    id: id,
  });
});

router.put('/:id(\\d+)', (req, res) => {
  const { id } = req.params;
  const klient = req.body;
  const rows = repository.modifyKlient(
    id,
    klient.nazwiskoKlient,
    klient.imieKlient,
    klient.email,
    klient.haslo,
    0
  );

  res.json({
    message: 'success',
    data: rows,
  });
});

router.delete('/:id(\\d+)', (req, res) => {
  const { id } = req.params;
  const rows = repository.deleteKlient(id);

  res.json({
    message: 'success',
  });
});

module.exports = router;
