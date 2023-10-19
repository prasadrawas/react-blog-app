const removeHtmlTags = (inputString) => {
  return inputString.replace(/<[^>]*>/g, "");
};

export { removeHtmlTags };
