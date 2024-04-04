import * as SQLite from "expo-sqlite";

const database_name = "HikeApp.db";
const database_version = "1.0";
const database_displayname = "Hike App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikeApp (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        date DATETIME,
        parking TEXT,
        length TEXT,
        level TEXT,
        description TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHike = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikeApp",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikeApp WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
const deleteAllHike = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikeApp",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
const addHike = (name, location, date, parking, length, level, description) => {
  return new Promise((resolve, reject) => {
    if (
      !name ||
      !location ||
      !date ||
      !parking ||
      !length ||
      !level ||
      !description
    ) {
      // Kiểm tra giá trị không hợp lệ và từ chối Promise nếu có vấn đề
      reject(new Error("All fields must be provided."));
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hikeApp (name, location, date, parking, length, level, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, location, date, parking, length, level, description],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const editHike = (
  id,
  name,
  location,
  date,
  parking,
  length,
  level,
  description
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE hikeApp SET name = ?, location = ?, date = ?, parking = ?, length = ?, level = ?, description = ? WHERE id = ?", // Corrected table name and added WHERE clause
        [name, location, date, parking, length, level, description, id], // Added id parameter
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(rowsAffected);
          } else {
            reject(new Error(`Hike with id ${id} not found`)); // Corrected error message
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getHikesByName = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikeApp WHERE name LIKE ?",
        [`%${name}%`],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
const Database = {
  initDatabase,
  addHike,
  getHike,
  deleteHike,
  editHike,
  getHikesByName,
  deleteAllHike,
};

export default Database;
