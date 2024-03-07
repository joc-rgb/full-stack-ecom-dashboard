import { create } from "zustand";

interface useStoreModalState{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useStoreModalStore = create<useStoreModalState>((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))