const express = require("express");
const router = express.Router();
const knex = require("../database");
const getReservation = require("../modules/getReservation");

router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservation").select("*");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    return await knex("reservation")
      .insert(request.body)
      .then((reservationId) => {
        knex("reservation")
          .where({ id: reservationId[0] })
          .then((selectedReservation) => {
            response.status(201).json(selectedReservation[0]);
          });
      });
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const reservationById = await getReservation(Number(request.params.id));
    return reservationById
      ? response.json(reservationById)
      : response.status(404).json("Not found");
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    await knex("reservation")
      .where({ id: Number(request.params.id) })
      .update(request.body);
    return response
      .status(201)
      .json(await getReservation(Number(request.params.id)));
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    await knex("reservation")
      .where({ id: Number(request.params.id) })
      .del();
    return response.status(204).json({});
  } catch (error) {
    throw error;
  }
});

module.exports = router;

// http://localhost:5000/api/reservations
