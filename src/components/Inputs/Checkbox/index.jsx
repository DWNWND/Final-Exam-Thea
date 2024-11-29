export default function Checkbox({ innerText, id, onChangeFunc, color, checked, register }) {
  return (
    <div className="flex items-center">
      <input id={id} type="checkbox" className="h-6 w-6 cursor-pointer" onChange={onChangeFunc} defaultChecked={checked} {...(register && register(id))} />
      <label htmlFor={id} className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
        {innerText}
      </label>
    </div>
  );
}
