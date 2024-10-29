export default function NavBtn({ innerText, tailw, color }) {
  return <button className={`${tailw} p-1 px-3 w-full text-sm text-nowrap flex justify-center border border-solid border-${color} text-${color} uppercase hover:shadow-md`}>{innerText}</button>;
}
