const assert = require("assert");
const knex = require("../database");

const reservationById = async (id) => {
  const reservationById = await knex("reservation").where({ id: id });
  assert.strictEqual(reservationById.length < 2, true);
  return reservationById[0];
};

module.exports = reservationById;
