import java.util.*;

class CDLLNode {

    int key, val;
    CDLLNode prev, next;

    public CDLLNode(int k, int v) {
        this.key = k;
        this.val = v;
    }
}

class CDLL {

    CDLLNode head;

    public CDLL() {
        head = null;
    }

    CDLLNode insAtBegin(int k, int v) {
        CDLLNode nn = new CDLLNode(k, v);
        nn.next = nn;
        nn.prev = nn;
        if (head == null) {
            head = nn;
            return head;
        } else {
            CDLLNode last = head.prev;
            nn.next = head;
            head.prev = nn;
            last.next = nn;
            nn.prev = last;
            head = nn;
            return head;
        }
    }

    void printLL() {
        System.out.print(head.key + "->" );
        CDLLNode temp = head.next;
        if (head == null) {
            return;
        }
        else{

            while (temp != head) {
                System.out.print(temp.key + "->" );
                temp = temp.next;
            }
            System.out.println();
        }
    }
    int delLastNode(){
        if(head==null){
            return -1;
        }
        CDLLNode last=head.prev;
        if(last==head){
            head=null;
            return last.key;
        }
        else{
            last.prev.next=head;
            head.prev=last.prev;
            return last.key;
        }
    }
    void moveAtFront(CDLLNode nodetomove){
        if(nodetomove==head){
            return;
        }
        nodetomove.prev.next=nodetomove.next;
        nodetomove.next.prev=nodetomove.prev;
        head.prev.next=nodetomove;
        nodetomove.prev=head.prev;
        nodetomove.next=head;
        head.prev=nodetomove;
        head=nodetomove;
    }
}
class LRUCache{
    CDLL l;
    int capacity;
    int size;
    Map<Integer,CDLLNode> mp;
    public LRUCache(int capacity){
        this.capacity=capacity;
        this.size=0;
        this.l=new CDLL();
        this.mp=new HashMap<>();
    }
    int get(int key){
        if(!mp.containsKey(key)){
            return -1;
        }
        CDLLNode node=mp.get(key);
        int ret=node.val;
        l.moveAtFront(node);
        return ret;
    }
    void put(int k,int v){
        if(mp.containsKey(k)){
            CDLLNode node=mp.get(k);
            node.val=v;
            l.moveAtFront(node);
        }
        else{
            if(size<capacity){
                CDLLNode node=l.insAtBegin(k, v);
                mp.put(k,node);
                size++;
            }
            else{
                int del=l.delLastNode();
                mp.remove(del);
                CDLLNode node=l.insAtBegin(k, v);
                mp.put(k,node);
            }
        }
    }
}


class dsaproject {
    public static void main(String[] args) {
        // CDLL l1=new CDLL();
        // l1.insAtBegin(5, 510);
        // l1.insAtBegin(4, 410);
        // l1.insAtBegin(3, 310);
        // l1.insAtBegin(1, 111);
        // l1.insAtBegin(0,0);
        // l1.printLL(); 
        // l1.delLastNode();
        // l1.printLL();
        // l1.moveAtFront(l1.head);
        // l1.printLL();
        // l1.moveAtFront(l1.head.next);
        // l1.printLL();
        // l1.moveAtFront(l1.head.prev);
        // l1.printLL();
        // l1.moveAtFront(l1.head.prev.prev);
        // l1.printLL();
        LRUCache ch=new LRUCache(3);
        ch.put(0, 0);
        ch.put(1, 1);
        System.out.println(ch.get(3));
        ch.put(3, 3);
        System.out.println(ch.get(0));
        ch.put(4, 4);
        System.out.println(ch.get(1));
    }
}
