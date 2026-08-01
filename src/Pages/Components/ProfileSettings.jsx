import { useState } from "react";

export default function ProfileSettings() {
  const [form, setForm] = useState({
    salonName: "GlamTap Beauty Studio",
    email: "studio@glamtap.com",
    mobile: "9876543210",
    address: "123, Fashion Street, Bandra, Mumbai, Maharashtra",
    about: "We provide premium and affordable beauty services at your doorstep.",
  });

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-slate-800">
        Profile &amp; Settings
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_220px]">
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-slate-600">
              Salon Name
            </span>
            <input
              value={form.salonName}
              onChange={update("salonName")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-600">
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-600">
              Mobile
            </span>
            <input
              value={form.mobile}
              onChange={update("mobile")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
          </label>

          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-slate-600">
              Address
            </span>
            <input
              value={form.address}
              onChange={update("address")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
          </label>

          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-slate-600">
              About Us
            </span>
            <textarea
              rows={3}
              value={form.about}
              onChange={update("about")}
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
            >
              Update Profile
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center justify-start gap-3 rounded-xl border border-dashed border-rose-200 p-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-500 text-2xl font-bold text-white">
            G
          </div>
          <p className="text-center text-xs text-slate-500">
            Add your professional &amp; beauty logo here
          </p>
          <button className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-500 hover:bg-rose-50">
            Change Logo
          </button>
        </div>
      </div>
    </div>
  );
}