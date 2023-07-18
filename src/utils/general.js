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
