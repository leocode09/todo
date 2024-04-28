"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EditTodo({id, title, description}) {
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)

    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newTitle,
                    newDescription
                })
            }).then(() => {
                router.push("/")
            })
        } catch (error) {
            console.error(error)
        }
    }

    return <form action="" onSubmit={handleSubmit} className="addTodo">
    <input onChange={e => setNewTitle(e.target.value)} value={newTitle} placeholder="Todo Title..." type="text" />
    <textarea onChange={e => setNewDescription(e.target.value)} value={newDescription} placeholder="Todo description..." name="" id="" cols="30" rows="10"></textarea>
    <div className="formButtons">
        <button className="cancel">Cancel</button>
        <button type="submit" className="add">Edit -</button>
    </div>
</form>
}