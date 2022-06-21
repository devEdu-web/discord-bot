import qs from 'querystring'
class Util {
  sortResources(resourcesArray) {
    return resourcesArray[Math.floor(Math.random() * resourcesArray.length)]
  }
  genQueryParams(query) {
    return qs.stringify(query)
  }
}

export default new Util()