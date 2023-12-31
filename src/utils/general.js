import DOMPurify from 'dompurify';
// function to create search param slug
export const createHyphenatedSearchParams = (searchParam) => {
  const space = ' ';
  const hyphen = '-';
  let searchSplit = searchParam.split(space);
  let finalSearchParam = '';
  searchSplit.map((singleTerm) => {
    if (singleTerm !== '') {
      finalSearchParam += singleTerm.toLowerCase() + hyphen;
    }
  });
  return finalSearchParam.slice(0, -1);
};

// function to filter out description or content based on length
export const shortenContent = (string, limit) => {
  const stringArray = string.split(' ');
  let firstChunk = stringArray.slice(0, limit).map((chunk) => chunk + ' ');
  let remainingChunk = stringArray
    .slice(limit, stringArray.length)
    .map((chunk) => chunk + ' ');
  return {
    firstSection: firstChunk.join(''),
    secondSection: remainingChunk.join(''),
  };
};

// function to sanitize dom elements
export const purifyDOMContent = (content) => {
  return DOMPurify.sanitize(content);
};

// function generate custom marker element
export const generateCustomMarker = (type) => {
  const markerElement = document.createElement('div');
  markerElement.classList.add(`${type}-marker`);
  return markerElement;
};

// random color generator
export const randomColorCodeGenerator = () => {
  let colorCode = '';
  const colorCodeLen = 6;
  const characters = '0123456789abcdef';
  for (let index = 0; index < colorCodeLen; index++) {
    colorCode += characters[Math.floor(Math.random() * characters.length)];
  }
  return colorCode;
};
