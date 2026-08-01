import React from "react";
import { X, LogIn } from "lucide-react";

function LoginPromptModal({ onClose, onLogin }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-6 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-stone-400 hover:text-stone-600"
        >
          <X size={20} />
        </button>

        <div className="mx-auto w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4">
          <LogIn size={26} />
        </div>

        <h3 className="font-serif text-xl text-stone-900">Login Required</h3>
        <p className="text-sm text-stone-500 mt-2">
          Please login to add this package to your cart.
        </p>

        <button
          onClick={onLogin}
          className="w-full mt-5 bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-xl transition-colors"
        >
          Login to Continue
        </button>
      </div>
    </div>
  );
}

export default LoginPromptModal;