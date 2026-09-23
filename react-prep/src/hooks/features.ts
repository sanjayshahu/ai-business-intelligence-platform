const db=(f,d)=>{
    let t=null;
    return function (...args){
        clearTimeout(t);
        t=setTimeout(()=>f.apply(this,args),d)
    }
    
}
const o=()=>{
    console.log("hi")
}
const j=()=>{
    console.log("hmm")
}
o();
const od=db(o,5000);
// od();
// const jd=db(j,3000);
// jd();

//using clear
od();od();od();od();od();


const pa = (pr) => {
    return new Promise((resolve ,reject)=>{
        let r=[];
        let c=0;
        pr.forEach((p,i)=>{
            Promise.resolve(p).then(
                d=>{
                    r[i]=d;
                    c++;
                    if(c===pr.length){
                        resolve(r)
                        
                    }
                },
                    e=>{
                        
                        reject(e)
                    }
                
                )
        })
    })

  

};
const p1=new Promise((r,re)=>setTimeout(()=>r(1),100));
const p2=new Promise((r,re)=>setTimeout(()=>r(2),200));
const p3=new Promise((r,re)=>setTimeout(()=>r(3),300));



pa([p1, p2, p3])
  .then((d) => console.log(d));



function useDebounce(value, delay) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(timer)

  }, [value, delay])

  return debounced
}
function usePrevious(value) {
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = value
  })

  return ref.current
}
function useLocalStorage(key, initialValue) {

  const [value, setValue] = React.useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function useFetch(url) {

  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })

  }, [url])

  return { data, loading }


function throttle(fn, limit) 
{ let l=0; 
return function(...args){ 
    let now=Date.now(); 
    if(now-l>limit){ 
        l=now; 
        fn.apply(this,args); 
        
    } } 
    
}
const tf=throttle(()=>console.log("hi"),5000); 
let i=0;
// while(i<5)
// { setTimeout(()=>tf(),2000) 
// i++ }
//misused...preventd by throttle
while(i<5)
{ setTimeout(()=>tf(),i*2000) 
i++ }



function deepCopy(obj) {
 if(obj===null || typeof(obj)!=='object') return obj;
 let c=Array.isArray(obj)?[]:{};
 for(let k in obj){
    c[k]=deepCopy(obj[k]); 
 }
 return c;
}
a={'x':50}
b={'y':5}
b=a
b.x=40
console.log(a);
c=deepCopy(a);
c.x=30
console.log(a);

function memoize(fn) {
  const cache = {}

 return function(...args){
     let k=JSON.stringify(args);
     if(k in cache) {
          console.log("cache");
         return cache[k]};
     const re=fn(...args)//bcoz passing reqiures dor function original
     cache[k]=re;
     return re;
 }
}

const t =(a)=>{
    console.log("n");
    return a;
    
}
const m= memoize(t);
m("a");
m("b");
m("a");

const results = []

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    results.push(i)
    console.log(results)
  }, 100)
}

0[0]
1 [0,1]....[0,1,2]

function memoize(fn) {
  const cache = {}

 return function(...args){
     let k=JSON.stringify(args);
     if(k in cache) {
          console.log("cache");
         return cache[k]};
     const re=fn(...args)//bcoz passing reqiures dor function original
     cache[k]=re;
     return re;
 }
}

const t =(a)=>{
    console.log("n");
    return a;
    
}
const m= memoize(t);
m("a");
m("b");
m("a");


Function.prototype.myBind = function(context,...args) {
const fn=this;//context of new myBind
return function(...newArgs){//f returned,,
    return fn.apply(context,[...args,...newArgs])//thru apply both tracedcontext n ags
};
}
let a={
    n:"k",
    c:()=>{
        console.log(this.n);//refers window
    }
}
a.c();
let v={
    n:"k",
    c:function(){
        console.log(this.n);//refers obj v
    }
}
v.c();
let ia={
    n:"k",
    c(a,b,c){
        console.log(this.n,a,b,c);//refers obj ia
    }
}
ia.c("a","b","c");
const nr={
    n:"l"
}
 const ec=ia.c.myBind(nr,"x");
 ec("y","z")

class AsyncQueue {
    constructor(l) {
        this.l = l; // concurrency limit
        this.r = 0; // currently running
        this.q = []; // queue
    }

    a(t) {
        this.q.push(t);
        this.n();
    }

    n() {
        // stop if limit reached
        if (this.r >= this.l) {
            console.log("limit crossed");
            return;
        }

        // stop if queue empty
        if (this.q.length === 0) {
            console.log("no data");
            return;
        }

        const t = this.q.shift();

        this.r++;

        console.log("running:", this.r);

        const p = t();

        p.then((d) => {
            console.log("resolved:", d);
        }).finally(() => {
            this.r--;

            console.log("completed, running:", this.r);

            // start next queued task
            this.n();
        });
    }
}

const aq = new AsyncQueue(3);

aq.a(() =>
    new Promise((r) => setTimeout(() => r("a"), 300))
);

aq.a(() =>
    new Promise((r) => setTimeout(() => r("b"), 400))
);

aq.a(() =>
    new Promise((r) => setTimeout(() => r("c"), 500))
);

aq.a(() =>
    new Promise((r) => setTimeout(() => r("d1"), 100))
);

aq.a(() =>
    new Promise((r) => setTimeout(() => r("d2"), 100))
);

aq.a(() =>
    new Promise((r) => setTimeout(() => r("d3"), 100))
);
}
Design File Upload System

class BankAccount {
    constructor() {
        this.b = 0;
    }

    ad(a) {
        this.b += a;
        return this.b;
    }

    w(a) {
        this.b -= a;
        return this.b;
    }

    g() {
        return this.b;
    }
}

const ba = new BankAccount();

console.log(ba.g());    // 0
console.log(ba.ad(5));  // 5
console.log(ba.w(2));   // 3
console.log(ba.g());    // 3
console.log(ba.b);      // 3


class BankAccountP {
    #b;

    constructor() {
        this.#b = 0;
    }

    ad(a) {
        this.#b += a;
        return this.#b;
    }

    w(a) {
        this.#b -= a;
        return this.#b;
    }

    g() {
        return this.#b;
    }
}

const bap = new BankAccountP();

console.log(bap.g());    // 0
console.log(bap.ad(5));  // 5
console.log(bap.w(2));   // 3
console.log(bap.g());    // 3

// console.log(bap.#b); // ❌ SyntaxError
console.log(bap.b);      // undefined as private
class APIcache {
    constructor() {
        this.cache = {};
    }

    async g(id) {
        if (id in this.cache) {
            console.log("c");
            return this.cache[id];
        }

        const data = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${id}`
        ).then(d => d.json());

        this.cache[id] = data;

        console.log("a");
        console.log(data);

        return data;
    }
}

const a = new API();

a.g(1);
a.g(1);

class APIlimitwithTime {
    constructor() {
        this.calls = [];
    }

    r() {
        const now = Date.now();

        this.calls = this.calls.filter(c => now - c < 1000);

        if (this.calls.length >= 3) {
            return false;
        }

        this.calls.push(now);

        return true;
    }
}

const at = new APIlimitwithTime();

function test(label, delay) {
    setTimeout(() => {
        console.log(label, at.r(), at.calls.length);
    }, delay);
}

test("0ms", 0);       // true
test("200ms", 200);   // true
test("400ms", 400);   // true
test("600ms", 600);   // false (already 3 calls in 1 sec)
test("1200ms", 1200); // true (old calls removed)...coz more than 1000 sec passed
class Service {
run(t){
    let l=Date.now();
    t();
    let n=Date.now();
    console.log("rt",n-l);
    
}
}
const d=new Service();
d.run(()=>console.log("hi"));
class API {
async f(r=3){
    try{
        return await fetch('url');
        
        
    }catch(e){
        if(r===0) throw e;
        
        this.f(r-1)
        console.log("rr",r);
        
    }
}
}
const a=new API();
a.f();

class Search {
 constructor(){
     this.t =null;
 }
 s(q) {
     clearTimeout(this.t);
     this.t=setTimeout(()=>console.log(q),500);
     
 }
}
let se=new Search();
console.log('sync')//this
se.s('a')
se.s('b')
se.s('c')//this
