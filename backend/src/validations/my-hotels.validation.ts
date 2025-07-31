import { body } from "express-validator";

export const validateHotel = [
    body("name").isString().withMessage("Name must be a string").notEmpty(),
    body("country").isString().withMessage("Country must be a string").notEmpty(),
    body("city").isString().withMessage("City must be a string").notEmpty(),
    body("description").isString().withMessage("Description must be a string").notEmpty(),
    body("starRating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Star rating must be an integer between 1 and 5"),
    body("type").isString().withMessage("Type must be a string").notEmpty(),
    body("adultsCount")
        .isInt({ min: 1 })
        .withMessage("Adults count must be at least 1"),
    body("childCount")
        .isInt({ min: 0 })
        .withMessage("Child count must be 0 or more"),
    body("facilities")
        .isArray()
        .withMessage("Facilities must be an array of strings")
        .custom((arr) => arr.every((item:string) => typeof item === "string")),
    body("pricePerNight")
        .isFloat({ min: 0 })
        .withMessage("Price per night must be a positive number"),
    body("contactInfo").isString().withMessage("Contact info must be a string").notEmpty()
];
