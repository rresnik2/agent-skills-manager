// app/skills/loading.tsx
export default function SkillsLoading() {
  return (
    <div className="p-6 max-w-md mx-auto my-8">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="skeleton bg-red-300 h-6 w-3/4"></div>
          <div className="skeleton bg-blue-300 h-4 w-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}