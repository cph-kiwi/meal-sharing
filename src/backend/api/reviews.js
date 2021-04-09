const express = require("express");
const router = express.Router();
const knex = require("../database");
const getReview = require("../modules/getReview");

router.get("/", async (request, response) => {
  try {
    let dbQuery = knex("review");
    if (request.query.mealId !== undefined) {
      dbQuery = dbQuery.where("meal_id", "=", request.query.mealId);
    }
    const reviews = await dbQuery;
    return response.json(reviews);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    const [reviewId] = await knex("review").insert({
      ...request.body,
      created_date: new Date(),
    });

    const [selectedReview] = await knex("review").where({
      id: reviewId,
    });

    response.status(201).json(selectedReview);
  } catch (error) {
    response.status(400).json({ message: error.sqlMessage });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const reviewById = await getReview(Number(request.params.id));
    return reviewById
      ? response.json(reviewById)
      : response.status(404).json("Not found");
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    await knex("review")
      .where({ id: Number(request.params.id) })
      .update(request.body);
    return response
      .status(201)
      .json(await getReview(Number(request.params.id)));
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    await knex("review")
      .where({ id: Number(request.params.id) })
      .del();
    return response.status(204).json({});
  } catch (error) {
    throw error;
  }
});

module.exports = router;

// http://localhost:5000/api/reviews
