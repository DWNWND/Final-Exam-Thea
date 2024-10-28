export default function NavBtn({ innerText, tailw, color }) {
  return <button className={`${tailw} p-2 px-4 w-full  text-nowrap flex justify-center border border-solid border-${color} text-${color} uppercase hover:shadow-md`}>{innerText}</button>;
}
