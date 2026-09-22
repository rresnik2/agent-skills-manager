export type Skill = {
    id: string;
    name: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
};

export let SKILLS: Skill[] = [
    
]

export async function getSkills(){
    await new Promise((resolve) => setTimeout(() => resolve(null), 2000)); // Simulate async operation
    return [...SKILLS]
}

export async function addSkill(skill: Skill){
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
    SKILLS = [...SKILLS, skill];
    console.log('Skill added: ', skill);
    return getSkills();
}
