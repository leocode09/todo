import EditTodo from "@/components/EditTodo";

const getTodoById = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/todos/${id}`,  {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error("failed to fetch");
        return res.json();
    } catch (error) {
        console.error(error);
    }
}

export default async function EditTodoPage({ params }) {
    const { id } = params;
    const { todo } = await getTodoById(id);
    console.log(todo);
    const { title, description } = todo

    return <EditTodo id={id} title={title} description={description}/>
}