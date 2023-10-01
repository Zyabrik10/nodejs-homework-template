"use strict";

module.exports = {
  validContactBody: require("./contactBody"),
  validFavoriteField: require("./favoriteField"),
  validSubscription: require("./subscription"),
  joiSchemeAuth: require("./joiSchemas/auth"),
  joiSchemeContactBody: require("./joiSchemas/contactBody"),
  joiSchemeFavoriteField: require("./joiSchemas/favoriteField"),
  joiSchemeSubscription: require("./joiSchemas/subscriptionField")
};