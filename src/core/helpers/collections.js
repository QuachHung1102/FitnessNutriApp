export const removeFromCollection = (
  collection,
  collectionPropertyToCompare,
  propertyFieldToRemove,
) => {
  return collection.filter(collectionItem => {
    return collectionItem[collectionPropertyToCompare] !== propertyFieldToRemove
  });
};

export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {});

/*
  File này để xử lý các hàm liên quan đến collections như filter, groupBy các collection như array, object hoặc map và set trong JS 
*/