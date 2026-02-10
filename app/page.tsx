import { LayoutTemplate, Palette, Moon } from "lucide-react";

export default function Dashboard() {
  const designs = [
    {
      id: "v1",
      name: "Accessible & Ethical",
      desc: "Warm Cream & Teal. High contrast, large type. (Original Spec)",
      path: "/design-v1",
      icon: LayoutTemplate,
      color: "bg-teal-700",
      textColor: "text-teal-50",
    },
    {
      id: "v2",
      name: "Modern Minimalist",
      desc: "Clean white & blue. Sharp edges, standard typography.",
      path: "/design-v2",
      icon: Palette,
      color: "bg-blue-600",
      textColor: "text-blue-50",
    },
    {
      id: "v3",
      name: "Dark Premium",
      desc: "Luxury dark mode. Gold accents, serif fonts.",
      path: "/design-v3",
      icon: Moon,
      color: "bg-slate-900",
      textColor: "text-slate-50",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-8 font-sans">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Odyssey Baths <span className="text-slate-400">Design Lab</span>
          </h1>
          <p className="text-xl text-slate-600">
            Select a design concept to preview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {designs.map((design) => (
            <a
              key={design.id}
              href={design.path}
              className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 flex flex-col"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${design.color} ${design.textColor} flex items-center justify-center mb-6 shadow-md`}
              >
                <design.icon size={32} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {design.name}
              </h2>
              <p className="text-slate-500 mb-8 flex-1">
                {design.desc}
              </p>

              <div className="flex items-center font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                View Prototype &rarr;
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center text-slate-400 text-sm">
          Project: Odyssey Baths Web • Build: Prototype v0.1
        </div>
      </div>
    </main>
  );
}
