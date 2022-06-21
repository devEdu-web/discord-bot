import qs from 'querystring'
class Util {
  sortResources(resourcesArray) {
    return resourcesArray[Math.floor(Math.random() * resourcesArray.length)]
  }
  genQueryParams(queryObject) {
    return qs.stringify(queryObject)
  }
}

export default new Util()