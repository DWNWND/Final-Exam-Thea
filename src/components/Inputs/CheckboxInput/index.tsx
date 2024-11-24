interface CheckboxInputProps {
  innerText: string;
  id: string;
  onChangeFunc?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color: string;
  checked?: boolean;
  register?: (id: string) => any;
}

export function CheckboxInput({ innerText, id, onChangeFunc, color, checked = false, register }: CheckboxInputProps) {
  return (
    <div className="flex items-center">
      <input id={id} type="checkbox" className="h-6 w-6 cursor-pointer" onChange={onChangeFunc} defaultChecked={checked} {...(register && register(id))} />
      <label htmlFor={id} className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
        {innerText}
      </label>
    </div>
  );
}
