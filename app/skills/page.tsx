import { getSkills } from "./SKILLS";
import Link from "next/link";

export default async function SkillsPage() {
  const skills = await getSkills();
  return <section className="p-4 flex flex-col gap-4 max-w-md mx-auto">
    <h1>Skills</h1>
    <Link href="/skills/create" className="btn btn-primary mb-4 self-end">Add Skill</Link>
    <ul className="menu flex-col gap-2">
      {skills.map((skill) => (
        <li key={skill.id}>
          <Link href={`/skills/${skill.id}`}>{skill.name}</Link>
        </li>
      ))}
    </ul>
  </section>;
} 