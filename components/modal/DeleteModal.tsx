'use client';
import Modal from './Modal';

interface DeleteModal {
    modalOpen: boolean,
    onClose: () => void,
    onDelete: () => void
}

export default function DeleteModal ({ modalOpen, onClose, onDelete }: DeleteModal ) {

  const handleDeletion = () => {
    onDelete()
    onClose()
  }
  return (
    <Modal isOpen={modalOpen} onClose={onClose} title="Confirm Delete" >
        <div className="flex-col flex space-y-6">
        <h3 className="text-else">Are you sure you want to delete the selected items, this change cannot be undone.</h3>
        <span className="flex space-x-2 self-end">
            <button
              onClick={onClose}
              type="button" 
              className="capitalize text-else hover:text-main ring-transparent  w-24  normal-space hover:cursor-pointer  rounded-full"
            >
            cancel
            </button>
            <button
              onClick={handleDeletion} 
              type="button" 
              className="capitalize text-error normal-space hover:bg-error w-24 hover:text-darker rounded-full hover:cursor-pointer"
            >
            delete
            </button>
        </span>
        </div>
    </Modal>
  );
}