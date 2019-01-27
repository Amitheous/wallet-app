import React from "react";

export default function Footer() {
  return (
    <footer className="bg-info text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Wallet
    </footer>
  );
}