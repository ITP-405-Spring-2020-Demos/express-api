const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.get('/api/playlists', (request, response) => {
  const db = new sqlite3.Database('./chinook.db');

  const sql = `
    SELECT PlaylistId as id, Name as name
    FROM playlists
    ORDER BY name
  `;
  
  db.all(sql, [], (error, rows) => {  
    response.json(rows);
  });

  db.close();
});

app.get('/api/playlists/:id', (request, response) => {
  const db = new sqlite3.Database('./chinook.db');

  const sql = `
    SELECT PlaylistId as id, Name as name
    FROM playlists
    WHERE id = ?
  `;
  
  db.get(sql, [request.params.id], (error, row) => {  
    if (row) {
      response.json(row);
    } else {
      response.status(404).json({
        error: 'Resource not found'
      });
    }
  });

  db.close();
});

app.listen(8000);