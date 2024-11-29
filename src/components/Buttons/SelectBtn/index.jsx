export default function SelectBtn({ innerText, tailw, color, selected }) {
  if (selected) {
    return <button className={`${tailw} w-full p-2 px-20 flex justify-center bg-${color} text-white uppercase hover:shadow-md`}>{innerText}</button>;
  } else {
    return <button className={`${tailw} w-full p-2 px-20 flex justify-center border border-solid border-${color} text-${color} uppercase hover:shadow-md`}>{innerText}</button>;
  }
}
