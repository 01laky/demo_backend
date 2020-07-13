import express from 'express';
import _ from 'lodash';
import Promise from 'bluebird';
import fs from 'fs';

var router = express.Router()

router.get('/', (req, res) => {
  const rawdata = fs.readFileSync('notesFakeDB.json');
  const allNotes = JSON.parse(rawdata);
  res.json(allNotes);
});

router.get('/:noteId', (req, res) => {
  const rawdata = fs.readFileSync('notesFakeDB.json');
  const allNotes = JSON.parse(rawdata);
  const { noteId } = req.params;
  const note = _.find(allNotes, ({ id }) => (id == noteId));
  res.json(note);
});

router.post('/', (req, res) => {
  let rawdata = fs.readFileSync('notesFakeDB.json');
  let allNotes = JSON.parse(rawdata);
  const { id } = _.last(allNotes);
  const nextId = (parseInt(id) + 1);
  allNotes.push({
    ...req.body,
    id: nextId,
  });
  console.log('CREATED => ')
  allNotes = JSON.stringify(allNotes);
  fs.writeFileSync('notesFakeDB.json', allNotes);
  res.json('created');
});

router.put('/:noteId', (req, res) => {
  const { noteId } = req.params;
  const rawdata = fs.readFileSync('notesFakeDB.json');
  let allNotes = JSON.parse(rawdata);
  allNotes = _.map(allNotes, (note) => {
    if (note.id == noteId) {
      return {
        ...note,
        ...req.body,
      };
    }

    return note;
  });
  allNotes = JSON.stringify(allNotes);
  fs.writeFileSync('notesFakeDB.json', allNotes);
  res.json('updated');
});

router.delete('/:noteId', (req, res) => {
  const { noteId } = req.params;
  const rawdata = fs.readFileSync('notesFakeDB.json');
  let allNotes = JSON.parse(rawdata);
  allNotes = _.filter(allNotes, ({ id }) => (id != noteId));
  allNotes = JSON.stringify(allNotes);
  fs.writeFileSync('notesFakeDB.json', allNotes);
  res.json('deleted');
});

export default router;
