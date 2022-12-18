import React, { useRef } from 'react'
import "../styles.css"

interface Properties {
  todo: string;
  setTodo: (todo: string) => void;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Properties> = ({ todo, setTodo, handleAdd }: Properties) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="input" onSubmit={(e) => {
      handleAdd(e);
      inputRef.current?.blur();
    }}>
      <input
        ref={inputRef}
        type="input"
        value={todo}
        onChange={
          (e) => {
            setTodo(e.target.value)
          }
        }
        placeholder="Enter a Task"
        className="input__box"
      />
      <button className="input_submit">Go</button>
    </form>
  )
}

export default InputField