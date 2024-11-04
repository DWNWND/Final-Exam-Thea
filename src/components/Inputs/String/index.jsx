export default function StringInput({ type, id, label, placeholder, error, register, defaultValue }) {
  return (
    <div className="">
      <label htmlFor={id} className="block text-primary-green mb-2">
        {label}
      </label>
      <input placeholder={placeholder} type={type} id={id} defaultValue={defaultValue} {...register(id)} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? "border-danger" : "border-primary-green"}`} />
    </div>
  );
}
