import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href={"/"}>Lightme.</Link>
      <Link href={"/addTodo"} className="addBtn">Add Todo</Link>
    </nav>
  )
}