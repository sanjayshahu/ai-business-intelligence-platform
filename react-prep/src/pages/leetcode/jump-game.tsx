/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
let mR=0;
for(let i=0;i<nums.length;i++){
    if(i>mR) return false;
    mR=Math.max(mR,i+nums[i]);
}
return true;
    
};