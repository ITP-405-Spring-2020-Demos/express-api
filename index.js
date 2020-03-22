const express = require('express');
const Playlist = require('./models/playlist');

const app = express();

app.get('/api/playlists', (request, response) => {  
  Playlist.all((error, rows) => {  
    response.json(rows);
  });
});

app.get('/api/playlists/:id', (request, response) => {
  Playlist.get(request.params.id, (error, row) => {
    if (row) {
      response.json(row);
    } else {
      response.status(404).json({
        error: 'Resource not found'
      });
    }
  });
});

app.listen(8000);