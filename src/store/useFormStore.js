import {create } from 'zustand';

export const useFormStore = create ((set) => ({
    formData: {
        username: "",
        email: "",
        password: "",
        preferRecipy: [],
        description: "",

    },

    updateFormData: (data) => set((state) => ({
        formData: {...state.formData, ...data}
    })),

    resetForm: () => set({ formData: {
        username: "",
        email: "",
        password: "",
        preferRecipy: [],
        description: ""}})
}))