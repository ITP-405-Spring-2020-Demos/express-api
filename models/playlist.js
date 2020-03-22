const sqlite3 = require('sqlite3').verbose();

class Playlist {
  static all(callback) {
    const db = new sqlite3.Database('./chinook.db');

    const sql = `
      SELECT PlaylistId as id, Name as name
      FROM playlists
      ORDER BY name
    `;
    
    // db.all(sql, [], (error, rows) => {  
    //   callback(error, rows);
    // });

    db.all(sql, [], callback);

    db.close();
  }

  static get(id, callback) {
    const db = new sqlite3.Database('./chinook.db');

    const sql = `
      SELECT PlaylistId as id, Name as name
      FROM playlists
      WHERE id = ?
    `;
    
    db.get(sql, [id], callback);

    db.close();
  }
}

module.exports = Playlist;