const list = document.getElementById('list');
const createbtn = document.getElementById('create-btn');

let todos = [];

createbtn.addEventListener('click', creatNewTodo);

function creatNewTodo() {
    // 새로운 아이템 객체 생성하기
    const item = {
        id : new Date().getTime(),  // id는 유니크한 값으로..
        text : '',
        complete : false
    }

    // 배열 처음 새로운 아이템 추가 (데이터 생성 하는 부분) 
    todos.unshift(item);

    const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);

    // 리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl); 
    // pretend = 노드를 집어넣는것, 뒤에다 더할게 아니라 앞에 더할거기때문에 append말고 prepend
    inputEl.removeAttribute('disabled');  // input disabled 속성 제거
    
    inputEl.focus();
    saveToLocalStorage();


}
function createTodoElement(item) {
    const itemEl = document.createElement('div');  // div 요소 생성
    itemEl.classList.add('item');    // div 요소에 item 클래스를 주는 부분

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled','');   // disabled 가 되어있으면 타이핑 할 수 없음.

    const actionsEL = document.createElement('div');
    actionsEL.classList.add('actions');

    // edit, remove 부분 작성
    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'do_not_disturb_on';    // remove-circle 이름이 do_not_disturb_on 으로 바뀌어있어 변경함.



    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked; // 체크 안되면 flase, 체크 되면true

        if(item.complete) {
            itemEl.classList.add('complete');
        }
        else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    })   

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled','');    // 글을 작성하다 다른 곳을 누르면 displayed 됨
        saveToLocalStorage();
    })

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    editBtnEl.addEventListener('click', ( )=> {
        inputEl.removeAttribute('disabled'); 
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click' , ()=> {
        todos = todos.filter(t => t.id !== item.id)   // 같은거는 필터링 되버리고, 다른것만 새로운 todos의 배열에 반환됨
        itemEl.remove();
        saveToLocalStorage();
    });

    actionsEL.append(editBtnEl);
    actionsEL.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEL);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos); //string으로 만드는 부분

    localStorage.setItem('my_todos',data);
}

// 데이터를 가져오는 부분
function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');
    if(data){
        todos = JSON.parse(data);
    }
}
function displayTodos(){
    loadFromLocalStorage();

    for (let i =0 ; i < todos.length; i++) {
        const item = todos[i];
            const {itemEl} = createTodoElement(item);
            list.append(itemEl);
    }
}

displayTodos();
