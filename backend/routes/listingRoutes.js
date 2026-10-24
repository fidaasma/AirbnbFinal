const express = require('express');
const controller = require('../controllers/listingController');
const {
  validateObjectId,
  listingBodyRules,
  listingQueryRules,
} = require('../middleware/validationMiddleware');

const router = express.Router();

// Routes only describe "URL + method -> validation -> controller"
router
  .route('/')
  .get(listingQueryRules, controller.getListings)
  .post(listingBodyRules(false), controller.createListing);

router
  .route('/:id')
  .get(validateObjectId, controller.getListingById)
  .put(validateObjectId, listingBodyRules(true), controller.updateListing)
  .delete(validateObjectId, controller.deleteListing);

module.exports = router;
