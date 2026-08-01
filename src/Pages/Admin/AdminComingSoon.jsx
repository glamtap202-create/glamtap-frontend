import AdminSidebar from "./AdminSidebar";

export default function AdminComingSoon({ title }) {
  return (
    <div className="min-h-screen bg-[#FBF6F4] flex">

      <AdminSidebar />

      <main className="flex-1 p-8">

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h1 className="text-3xl font-bold text-[#2A1B26]">
            {title}
          </h1>

          <p className="mt-3 text-gray-500">
            {title} management page coming soon...
          </p>

        </div>

      </main>

    </div>
  );
}