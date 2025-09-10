import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-xs">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete?
        </h2>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-300" onClick={onClose}>
            I change my mind
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white"
            onClick={onConfirm}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};
