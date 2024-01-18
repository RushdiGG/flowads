let axios = require("axios");
const { resolve } = require("path");
const config = require("../config");

exports.fetchAccounts = (limit) => {
  limit = 2;
  const url =
    "https://graph.facebook.com/v10.0/me/adaccounts?fields=name&limit=" +
    limit +
    "&access_token=" +
    config.fbCredentials.access_token;
  return axios({
    url: url,
    method: "get",
  });
};

exports.adAccountInsights = (account_id, date) => {
  // let date_string = formatDate(date);
  account_id = "act_375112853835190";
  let since = "2021-04-01";
  let until = "2021-04-30";
  const url =
    "https://graph.facebook.com/v10.0/" +
    account_id +
    "/insights?fields=reach,impressions,clicks,spend,actions,action_values&time_range[since]=" +
    since +
    "&time_range[until]=" +
    until +
    "&access_token=" +
    config.fbCredentials.access_token;
  return axios({
    url: url,
    method: "get",
  });
};

// Checks if value is a Date object
function isDate(value) {
  switch (typeof value) {
    case "object":
      if (value instanceof Date) {
        return !isNaN(value.getTime());
      }
    default:
      return false;
  }
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function getActionVal(action, property) {
  if (!Array.isArray(action)) {
    return;
  }
  let buffer = action.filter((action) => action.action_type == property);
  if (buffer[0] && buffer[0].action_type) {
    switch (buffer[0].action_type) {
      case "offsite_conversion.fb_pixel_purchase":
        return parseFloat(buffer[0].value);
      default:
        return parseInt(buffer[0].value);
    }
  } else {
    return;
  }
}
