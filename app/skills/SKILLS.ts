export type Skill = {
    id: string;
    name: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
};

export let SKILLS: Skill[] = [
    {
        id: "1",
        name: "JavaScript",
        description: "A high-level, versatile programming language.",
        category: "Programming Language",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
    },              
    {
        id: "2",
        name: "TypeScript",
        description: "A typed superset of JavaScript that compiles to plain JavaScript.",
        category: "Programming Language",
        createdAt: "2023-01-02T00:00:00Z",
        updatedAt: "2023-01-02T00:00:00Z",
    },
    {
        id: "3",
        name: "React",
        description: "A JavaScript library for building user interfaces.",
        category: "Library",
        createdAt: "2023-01-03T00:00:00Z",
        updatedAt: "2023-01-03T00:00:00Z",
    }
]

export async function getSkills(){
    await new Promise((resolve) => setTimeout(() => resolve(null), 5000)); // Simulate async operation
    return [...SKILLS]
}

export async function addSkill(skill: Skill){
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate async operation
    SKILLS = [...SKILLS, skill];
    console.log('Skill added: ', skill);
    return getSkills();
}
