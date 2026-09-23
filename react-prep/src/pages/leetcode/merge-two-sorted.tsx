/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let d= new ListNode(0);
    let t=d;
    while(list1!==null && list2!==null){
        if(list1.val<list2.val){
            t.next=list1;
            list1=list1.next;
        }
        else{
                 t.next=list2;
                    list2=list2.next;
        }
        t=t.next;
    }
    if(list1!==null) t.next=list1;
    if(list2!==null) t.next=list2;

return d.next


 }

