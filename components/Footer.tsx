import React from "react";
import Link from "next/link";

export default function App() {
  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <img
                src="https://1000logos.net/wp-content/uploads/2022/08/One-Piece-Logo.png"
                height={16}
                width={100}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/tos" className="hover:underline">
                    Terms Of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              Animunet
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </>
  );
}
