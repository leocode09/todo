"use client"
import { HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RemoveTodo({ id }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const removeTodo = async () => {
        if (deleting) return; // If deletion is already in progress, do nothing
        const confirmed = confirm('Are you sure you want to remove this Todo?');
        if (confirmed) {
            setDeleting(true); // Set deletion to in progress
            try {
                const res = await fetch(`http://localhost:3000/api/todos/?id=${id}`, {
                    method: 'DELETE',
                }).then(() => {
                    router.push("/");
                });
                if (res.ok) {
                    router.push("/");
                }
            } catch (error) {
                console.error('Error removing todo:', error);
            } finally {
                setDeleting(false); // Reset deletion status
            }
        }
    };

    // Refresh the todo list after deletion
    useEffect(() => {
        if (!deleting) {
            router.refresh();
        }
    }, [deleting, router]);

    return (
        <button onClick={removeTodo} className="delete" disabled={deleting}>
            {deleting ? 'Deleting...' : <HiOutlineTrash size={24} />}
        </button>
    );
}
