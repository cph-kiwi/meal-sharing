const express = require("express");
const router = express.Router();
const knex = require("../database");
const getReview = require("../modules/getReview");

router.get("/", async (request, response) => {
  try {
    const reviews = await knex("review").select("*");
    response.json(reviews);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    return await knex("review")
      .insert(request.body)
      .then((reviewId) => {
        knex("review")
          .where({ id: reviewId[0] })
          .then((selectedReview) => {
            response.status(201).json(selectedReview[0]);
          });
      });
  } catch (error) {
    throw error;
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
