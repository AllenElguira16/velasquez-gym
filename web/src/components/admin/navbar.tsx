import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  return (
    <>
      <div className="h-screen w-1/6 bg-gray-900 text-white">
        <header className="px-2 py-1 cursor-pointer text-center">
          <h1>Admin</h1>
        </header>
        <div>
          <Link href="/admin/members">
            <a className="px-2 py-1 cursor-pointer block">Members</a>
          </Link>
          <Link href="/admin/trainers">
            <a className="px-2 py-1 cursor-pointer block">Trainers</a>
          </Link>
          <Link href="/admin/fitness-type">
            <a className="px-2 py-1 cursor-pointer block">Fitness Type</a>
          </Link>
          <div className="px-2 py-1 cursor-pointer block">Logout</div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
