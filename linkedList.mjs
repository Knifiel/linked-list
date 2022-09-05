class Node{
    constructor(value){
        this.value = value || null
        this.next = null
    }
}

export default class LinkedList{
    #head
    #tail
    constructor(){
        this.#head = null
        this.#tail = null
    }

    prepend(value){
        const node = new Node(value)
        if(this.#head === null){
            this.#head = node
            this.#tail = node
        } else {
            const next = this.#head
            this.#head = node
            node.next = next
        }
    }

    append(value){
        if(this.#head === null){
            this.prepend(value)
        } else{
            const node = new Node(value)
            this.#tail.next = node
            this.#tail = node
        }
    }

    size(){
        let size = 0
        if(this.#head === null){
            return size
        }
        size = this.#count(size, this.#head)
        return size
        }

    head(){
        return this.#head
    }

    tail(){
        return this.#tail
    }

    at(i){
        if(this.#head === null){
            return 'null'
        }
        let index = i
        return this.#getNodeAt(index, this.#head)
    }

    pop(){
        if(this.#head === this.#tail){
            this.#head = null
            this.#tail = null
            return
        }
        this.#removeLastNode(this.#head, this.#tail)
    }

    contains(value){
        if(this.#head === null){
            return false
        }
        return this.#checkForValue(value, this.#head)
    }

    find(value){
        if(this.#head === null){
            return 'List is empty'
        }
        return this.#findIndexOfValue(value, this.#head)
    }

    toString(){
        if(this.#head === null){
            return 'null'
        }
        return this.#addStringValues(this.#head)
    }

    insertAt(value, index){
        if(index > this.size()-1){
            return 'Index outside of list size'
        }
        if(index === 0){
            this.prepend(value)
            return
        }
        const node = new Node(value)
        const nextNode = this.at(index)
        node.next = nextNode
        const prevNode = this.at(index-1)
        prevNode.next = node
    }

    removeAt(index){
        if(this.#head === null){
            return 'List is empty'
        }
        if(this.at(index) === this.#tail){
            this.pop()
            return
        }
        if(index === 0){
            this.#head = this.at(index + 1)
            return
        }
        const prevNode = this.at(index-1)
        const nextNode = this.at(index+1)
        prevNode.next = nextNode
    }

    #addStringValues(node, str){
        let string = (str!=undefined) ? str : ''
        string += `( ${node.value} )`
        if(node.next === null){
            string += ' -> null'    
            return string
        } else {
            string += ' -> '
            return this.#addStringValues(node.next, string)
        }
    }

    #findIndexOfValue(value, node, i){
        let index = (i!=undefined) ? i : 0
        if((node === this.#tail)&&(node.value!==value)){
            index = null
            return index
        }
        if(node.value === value){
            return index
        }
        index++
        return this.#findIndexOfValue(value, node.next, index)
    }

    #checkForValue(value, node){
        if(node.value === value){
            return true
        } 
        if(node.next === null){
            return false
        }
        return this.#checkForValue(value, node.next)
    }
    
    #removeLastNode(node, target){
        if(node.next === target){
            node.next = null
            this.#tail = node
            return
        } else {
            this.#removeLastNode(node.next, target)
        }
    }
    #getNodeAt(index, node){
        if(index === 0){
            return node
        } else if (node.next === null){
            return null
        } 
            index--
            return this.#getNodeAt(index, node.next)
    }
    #count(size, node){
        size++
        if(node.next === null){
            return size
        } else {
            return this.#count(size, node.next)
        }
    }
}