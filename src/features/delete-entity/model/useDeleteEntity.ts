import { useState, useCallback } from 'react';

export const useDeleteEntity = (
    deleteApiFn: (id: string) => Promise<void>,
    onSuccess?: () => void
) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDeleteModal = useCallback((id: string) => {
        setItemToDelete(id);
        setIsModalOpen(true);
        setError(null);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setIsModalOpen(false);
        setItemToDelete(null);
        setError(null);
    }, []);

    const handleDelete = useCallback(async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);
        setError(null);

        try {
            await deleteApiFn(itemToDelete);
            onSuccess?.();
            closeDeleteModal();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete item');
        } finally {
            setIsDeleting(false);
        }
    }, [itemToDelete, deleteApiFn, onSuccess, closeDeleteModal]);

    return {
        isDeleting,
        error,
        isModalOpen,
        openDeleteModal,
        closeDeleteModal,
        handleDelete,
        itemToDelete
    };
};
