const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const WebSocket = require("ws");

require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NA,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT),
});

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM party");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { name_prem, name_sec } = req.body;
  const result = await pool.query(
    "INSERT INTO party (name_prem, name_sec) VALUES ($1, $2) RETURNING *",
    [name_prem, name_sec]
  );
  const newGame = result.rows[0];
  broadcast(newGame);
  res.json(newGame);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE party SET status = NOT status WHERE id = $1 RETURNING *",
    [id]
  );
  const updatedGame = result.rows[0];
  broadcast(updatedGame);
  res.json(updatedGame);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM party WHERE id = $1", [id]);
  broadcast({ id, deleted: true });
  res.sendStatus(204);
});

const broadcast = (message) => {
  if (global.wss) {
    global.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
};

module.exports = (wssInstance) => {
  global.wss = wssInstance;
  return router;
};
