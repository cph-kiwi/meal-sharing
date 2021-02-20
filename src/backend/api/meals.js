const express = require("express");
const router = express.Router();
const knex = require("../database");
const getMeal = require("../modules/getMeal");

router.get("/", async (request, response) => {
  const maxPrice =
    request.query.maxPrice === undefined
      ? undefined
      : Number(request.query.maxPrice);
  const availableReservations = Boolean(request.query.availableReservations);
  const title = request.query.title;
  const createdAfter =
    request.query.createdAfter === undefined
      ? undefined
      : new Date(request.query.createdAfter);
  const limit =
    request.query.limit === undefined ? undefined : Number(request.query.limit);

  try {
    // const titles = await knex("meals").select("title");
    // response.json(titles);

    let dbQuery = knex("meal");
    if (typeof maxPrice === "number") {
      dbQuery = dbQuery.where("price", "<=", maxPrice);
    }

    if (availableReservations) {
      dbQuery = dbQuery.whereRaw(`meal.max_reservations > (
      SELECT SUM(reservation.number_of_guests)
      FROM reservation
      WHERE reservation.meal_id = meal.id
      )`);
    }

    if (typeof title === "string") {
      dbQuery = dbQuery.where("title", "like", `%${title}%`);
    }
    if (createdAfter !== undefined) {
      dbQuery = dbQuery.where("created_date", ">", createdAfter);
    }
    if (typeof limit === "number") {
      dbQuery = dbQuery.limit(limit);
    }
    const meals = await dbQuery;
    return response.json(meals);
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
