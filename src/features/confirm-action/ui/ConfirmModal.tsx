import { type FC } from 'react';
import Modal from 'react-modal';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    isDangerous?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Подтвердить', isDangerous = false }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={title}
            className="bg-[var(--surface)] p-6 rounded-xl max-w-sm w-full shadow-2xl focus:outline-none border border-[var(--border)] relative"
            overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
        >
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <p className="mb-6">{message}</p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Отмена
                </button>
                <button
                    onClick={onConfirm}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${isDangerous
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                >
                    {confirmText}
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
