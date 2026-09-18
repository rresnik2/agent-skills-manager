"use client";

import { useActionState } from "react";
import { createSkill } from "@/app/actions/skills";

const initialState = {
    message: "",
};

export default function NewSkillPage() {
    const [state, formAction, pending] = useActionState(createSkill, initialState);

    return (
        <form className="p-4 max-w-md mx-auto form flex flex-col gap-4" action={formAction}>
            <input name="name" placeholder="Skill Name" className="input input-bordered w-full" />
            <textarea name="description" placeholder="Skill Description" rows={3} className="input input-bordered w-full" />
            <input name="category" placeholder="Category" className="input input-bordered w-full" />

            <p aria-live="polite" className="text-sm text-red-500">
                {state?.message}
            </p>
            <button className="btn btn-primary" disabled={pending}>
                {pending ? "Creating..." : "Create Skill"}
            </button>
        </form>
    );
}   