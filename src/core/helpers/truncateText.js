export const truncateText = (text, wordLimit) => {
  if (Array.isArray(text)) {
    text = text.join("");
  }
  if (typeof text !== 'string') {
    return '';
  }
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};