
const getNoOfItems = async (collectionName) => {
  const noOfItems = await collectionName.find().count() ;
  return noOfItems;
}

const checkPage= (page)=>{
  if (! page || page <= 0 ) {
    page = 1;
  }
  return page
}

const checkLimit = (limit,noOfItems) =>{
  if (limit > noOfItems) {
    limit = noOfItems;
  }
  if(!limit){
    limit=5
  }
  return limit
}

const paginationCriteria = async(collectionName,pageNo,limitNo) =>{
  const noOfItems = await getNoOfItems(collectionName);
  let page= checkPage(pageNo)
  const limit = checkLimit (limitNo,noOfItems)
  const totalPages = Math.ceil(noOfItems / limit);
  if (page > totalPages) {
    page = totalPages;
  }
  return {
    page,
    limit,
    totalPages,
  }
}

const filtrationCriteria = (...args)=>{
  let filter ={}
  criteria=args[0];
   Object.keys(criteria).forEach((key)=>{
    console.log(key);
    if (criteria[key]){
      filter={...filter,[key]:criteria[key]};
    }
   })
  return filter;
}

module.exports = {
  getNoOfItems,
  paginationCriteria,
  filtrationCriteria
}