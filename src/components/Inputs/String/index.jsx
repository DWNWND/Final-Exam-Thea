export default function StringInput({ type, id, label, placeholder, error, register, defaultValue }) {
  return (
    <div className="">
      <label htmlFor={id} className="block text-primary-green mb-2">
        {label}
      </label>
      <input placeholder={placeholder} type={type} id={id} defaultValue={defaultValue} {...register(id)} className={`${defaultValue && "focus:border-primary-green active:border-primary-green "}placeholder:italic placeholder:font-light font-light text-comp-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-gray rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && "border-danger"}`} />
    </div>
  );
}
