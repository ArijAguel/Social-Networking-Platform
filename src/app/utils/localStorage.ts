export const setItem = (key:string,object:any)=>{
  localStorage.setItem(key,JSON.stringify(object))
}
export const getItem = (key:string): any=>{
  return JSON.parse(localStorage.getItem(key)??"null")
}
export const removeItem = (key:string): any=>{
  if(getItem(key)){
    localStorage.removeItem(key)
  }
}
