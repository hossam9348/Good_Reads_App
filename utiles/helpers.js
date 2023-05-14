
const getNoOfItems = async (collectionName,filter) => {
  const noOfItems = await collectionName.find(filter).count() ;
  return noOfItems;
}

const checkPage= (page,totalPages)=>{
  if (page > totalPages) {
    page = totalPages;
  }
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

const paginationCriteria = async(collectionName,pageNo,limitNo,filter) =>{
  const noOfItems = await getNoOfItems(collectionName,filter);
  const limit = checkLimit (limitNo,noOfItems)
  const totalPages = Math.ceil(noOfItems / limit);
  let page= checkPage(pageNo,totalPages)
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