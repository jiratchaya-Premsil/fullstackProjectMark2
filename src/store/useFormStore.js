import {create } from 'zustand';

export const useFormStore = create ((set) => ({
    formData: {
        firstName: "",
        lastName: "",
        email: "",
        exprience: "",
        skills: "",

    },

    updateFormData: (data) => set((state) => ({
        formData: {...state.formData, ...data}
    })),

    resetForm: () => set({ formData: {
        firstName: "",
        lastName: "",
        email: "",
        exprience: "",
        skills: "",}})
}))