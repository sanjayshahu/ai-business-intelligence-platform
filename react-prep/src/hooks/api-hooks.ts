import { useEffect, useRef, useState } from "react"

function useDebounce(value, delay) {
const [dv,sDv]=useState<string>('');
useEffect(()=>{
    const t=setTimeout(()=>sDv(value),delay);
    return(()=>{
        clearTimeout(t);
    })

},[value,delay])
return dv;
}
function usePrevious(value) {
  const ref = useRef<Record>(null);
  useEffect(()=>ref.current=value)



  return ref.current
}
function useLocalStorage(key, initialValue) {
    const [v,sV]=useState<Record>(()=>{
    const s=localStorage.getItem(key);
    return s?JSON.parse(s):initialValue;
    })
    useEffect(()=>{
        localStorage.setItem(key,JSON.parse(v))

    },[v,key])

    return {v,sV};

}

function useFetch(url) {

const [d,sD]=useState<any>([]);
const [l,sL]=useState<boolean>(true);
useEffect(async ()=>{
    try{
    const d=await fetch(url);
    const dj=await d.json();
    sD(dj);
    }
    finally{
        sL(false)
    }

},[url]);
  return { d,l }
}
