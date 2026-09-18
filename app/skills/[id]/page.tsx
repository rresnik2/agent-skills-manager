import { notFound } from "next/navigation";
import { getSkills } from "../SKILLS";


export default async function SkillsDetailPage({params}: {params: {id: string}}) {
    
    const skills = await getSkills(); // Fetch the skills from the server or use a state management solution

    const {id} = await params;

    const skill = skills.find((s) => s.id === id);

    if (!skill) {
        return notFound();
    }
    return (
            <article className="p-4 flex flex-col gap-4 max-w-md mx-auto">
                <h1>{skill.name}</h1>
                <p>{skill.description}</p>
                <p>Category: {skill.category}</p>
                <p>Created At: {new Date(skill.createdAt).toLocaleDateString()}</p>
                <p>Updated At: {new Date(skill.updatedAt).toLocaleDateString()}</p>
            </article>
        )

}   