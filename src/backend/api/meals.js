const express = require("express");
const router = express.Router();
const knex = require("../database");
const getMeal = require("../modules/getMeal");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("*");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    return await knex("meal")
      .insert(request.body)
      .then((mealId) => {
        knex("meal")
          .where({ id: mealId[0] })
          .then((selectedMeal) => {
            response.status(201).json(selectedMeal[0]);
          });
      });
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const mealById = await getMeal(Number(request.params.id));
    return mealById
      ? response.json(mealById)
      : response.status(404).json("Not found");
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    await knex("meal")
      .where({ id: Number(request.params.id) })
      .update(request.body);
    return response.status(201).json(await getMeal(Number(request.params.id)));
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    await knex("meal")
      .where({ id: parseInt(request.params.id) })
      .del();
    return response.status(204).json({});
  } catch (error) {
    throw error;
  }
});

module.exports = router;

// http://localhost:5000/api/meals
