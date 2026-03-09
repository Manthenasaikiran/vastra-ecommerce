/* Capitalize First Letter */

export const capitalize = (text) => {

  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);

};


/* Truncate Long Text */

export const truncateText = (text, length = 50) => {

  if (!text) return "";

  return text.length > length
    ? text.substring(0, length) + "..."
    : text;

};


/* Generate Random Number */

export const randomNumber = (min = 1, max = 1000) => {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

};


/* Format Date */

export const formatDate = (date) => {

  if (!date) return "";

  const newDate = new Date(date);

  return newDate.toLocaleDateString("en-IN", {

    day: "numeric",
    month: "short",
    year: "numeric"

  });

};