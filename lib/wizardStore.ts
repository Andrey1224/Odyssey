import { create } from "zustand";

export type WizardType = "global" | "walk-in-baths";

interface WizardStore {
  activeWizard: WizardType | null;
  openWizard: (type?: WizardType) => void;
  closeWizard: () => void;
}

export const useWizardStore = create<WizardStore>((set) => ({
  activeWizard: null,
  openWizard: (type = "global") => set({ activeWizard: type }),
  closeWizard: () => set({ activeWizard: null }),
}));
