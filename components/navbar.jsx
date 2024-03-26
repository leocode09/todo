import Link from "next/link"

export default function Navbar() {
  return (
    <nav>
      <Link href={"/"}>Lightme.</Link>
      <Link href={"/addTodo"}>Add Todo</Link>
    </nav>
  )
}