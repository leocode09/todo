"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddTodoPage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title || !description) {
            alert("required")
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description
                })
            })
            if(res.ok) {router.push('/')} else throw new Error("failed to fetch")
        } catch (error) {
            console.log(error)
        }
    }

    return <form action="" className="addTodo" onSubmit={handleSubmit}>
        <input 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo Title..." 
            type="text" 
        />
        <textarea
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Todo description..." 
            name="" 
            id="" 
            cols="30" 
            rows="10"
        ></textarea>
        <div className="formButtons">
            <button className="cancel">Cancel</button>
            <button type="submit" className="add">Add +</button>
        </div>
    </form>
}