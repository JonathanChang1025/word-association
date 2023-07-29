const capitalizedWord = (word) => {
  return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
};

export default capitalizedWord;