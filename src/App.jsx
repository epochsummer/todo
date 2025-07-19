import { useState, useEffect} from 'react'
// import { useState, useEffect } from 'react'
import './App.css'
import {supabase} from './lib/supabase'

// [{
//   id : String,
//   text: String,
//   completed: Boolean;
// }]

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
      fetchTodos();
    }, []);
    
    const fetchTodos = async () => {
      try {
        let { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', {ascending: false});
        
        if (error) {
          console.log(error);
          return;
        }

        setTodos(data ?? []);
      } catch (error) {
      console.log(error);
    }
  };

    // input에 텍스트 입력 (완료)
    // 추가 버튼 클릭 (완료)
    // input에 있는 텍스트가 setTodos를 통해 todos 값에 추가 ()
 
const addTodo = async (e) => {
  e.preventDefault();

  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ text: inputValue }])
      .select();

    if (error) {
      console.error('Error adding todo:', error.message);
      return;
    }

    if (data && data.length > 0) {
      setTodos([data[0], ...todos]);
    }

    setInputValue('');
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};
  
const toggleTodo = async (id) => {
  try {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const { data, error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed }) 
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating todo:', error.message);
      return;
    }

    if (data && data.length > 0) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? data[0] : todo
        )
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
};

  const deleteTodo = async (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    try{
      const { error } = await supabase.from('todos').delete()
      if (error) {
        console.error('Error deleteting from supabase: ', error.message);
        return
      }
      setTodos(todos.filter((todo)=> todo.id !==id));
    } catch (err){
      console.error("Unexpected error had occured", err);
    }
  };

  return (
  <>
  <div className='app'>
    <div className='todo-container'>
      <header className='header'>
        <h1>✏️ Todo List</h1>
        <p className='subtitle'>일정을 체계적으로 관리하세요</p>
      </header>
      <form className='input-form' onSubmit={addTodo}>
        <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="새로운 할 일을 입력하세요..."
        className='todo-input'
        />
        <button type="submit" className="add-button">
          추가
        </button>
      </form>
      <div className='todo-list'>
        {
          todos.length === 0? (
            <div className='empty-state'>
              아직 할 일이 없습니다.
            </div>
          ) : (
            todos.map((todo) => (<div className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <label className='todo-checkbox'>
                <input
                  type = "checkbox"
                  checked = {todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="checkmark"></span>
                 </label>
                 <span className="todo-text">{todo.text}</span>
      <button
  className="delete-button"
  onClick={() => deleteTodo(todo.id)}
>
  🗑️
</button>

                <input/>
            </div>
            ))
          )
        }
      </div>
    </div>
  </div>
  </>)
}

export default App