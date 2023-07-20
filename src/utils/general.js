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
