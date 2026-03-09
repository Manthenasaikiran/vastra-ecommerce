const generateId = (prefix = "ORD") => {

  const timestamp = Date.now();

  const randomNumber = Math.floor(
    Math.random() * 10000
  );

  return `${prefix}-${timestamp}-${randomNumber}`;

};

export default generateId;