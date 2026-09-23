/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
let fm={};
for(let i=0;i<nums.length; i++){
    let req=target-nums[i];
    if(req in fm) return [fm[req],i];
    fm[nums[i]]=i;
  
}
return [];
    
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let fm = {};

    for (let x of nums) {
        if (x in fm) return true;
        fm[x] = 1;
    }

    return false;
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
let fm={};
for(let x of strs){
    let s=x.split('').sort().join('');
    if(!(s in fm)){
        fm[s]=[];
    }
    fm[s].push(x);
}
return Object.values(fm);
}

var productExceptSelf = function(nums) {
const n=nums.length;
const l=new Array(n);
const  r=new Array(n);
const  f=new Array(n);
l[0]=1;
r[n-1]=1;
for(let i=1;i<n;i++){
    l[i]=l[i-1]*nums[i-1];
}
for(let i=n-2;i>=0;i--){
    r[i]=r[i+1]*nums[i+1];
}
for(let i=0;i<n;i++){
    f[i]=l[i]*r[i];
}


return f;




};


var topKFrequent = function(nums, k) {
const fm={};
for (let x of nums){
    fm[x]=(fm[x]||0)+1;

}
let bu=Array.from({length:nums.length+1},()=>[]);
for(let [k,v] of Object.entries(fm)){
    bu[v].push(Number(k));
}
let res=[];
for(let i=bu.length-1;i>=0;i--){
    for(j=0;j<bu[i].length;j++){
        res.push(bu[i][j]);
        if(res.length===k){
            return res;
        }
    }
}
return res;
}
var isValidSudoku = function(board) {
const r=Array.from({length:9},()=>new Set());
const c=Array.from({length:9},()=>new Set());
const b=Array.from({length:9},()=>new Set());
for(let i=0;i<board.length;i++){
    for(let j=0;j<board[0].length;j++){
        if(board[i][j]==='.') continue;
        const bi=Math.floor(i/3)*3+Math.floor(j/3);
        const val =board[i][j];
        if(r[i].has(val)|| c[j].has(val)||b[bi].has(val)) return false;
        r[i].add(val);
        c[j].add(val);
        b[bi].add(val);

    }

}
return true;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
const s= new Set(nums);
let lo=0
for(let x of nums){
    if(!(s.has(x-1))){
        let c=x;
        let ct=1;
        while(s.has(c+1)){
            c++;
            ct++;
            lo=Math.max(lo,ct);
        }
    }
}
return lo;


}

   