const assert = require("assert");
const knex = require("../database");

const mealById = async (id) => {
  const mealById = await knex("meal").where({ id: id });
  assert.strictEqual(mealById.length < 2, true);
  return mealById[0];
};

module.exports = mealById;
