const assert = require("assert");
const knex = require("../database");

const reviewById = async (id) => {
  const reviewById = await knex("review").where({ id: id });
  assert.strictEqual(reviewById.length < 2, true);
  return reviewById[0];
};

module.exports = reviewById;
