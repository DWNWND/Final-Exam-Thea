export default function NavBtn({ innerText, tailw, color }) {
  return <button className={`${tailw} w-full p-2 px-20 flex justify-center border border-solid border-${color} text-${color} uppercase hover:shadow-md`}>{innerText}</button>;
}
