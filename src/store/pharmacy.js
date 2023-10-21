import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { MDKEY } from "../utilities/constantes";

export const useStore = create((set) => {
  const {medicines} = JSON.parse(localStorage.getItem(MDKEY));

  return {
    medicines,
    insertMedicine: ({ name, price }) =>
      set((state) => {
        const mdObj = {
          medicines: [...state.medicines, { id: uuid(), name, price }],
        };
        localStorage.setItem(MDKEY, JSON.stringify(mdObj));
        return mdObj;
      }),

    updateMedicine: ({ id, name, price }) =>
      set((state) => {
        const medicineFound = state.medicines.find((md) => md.id === id);
        medicineFound.name = name;
        medicineFound.price = price;

        const mdObj = { medicines: [...state.medicines] };
        localStorage.setItem(MDKEY, JSON.stringify(mdObj));
        return mdObj;
      }),

    dropMedicine: (id) =>
      set((state) => {
        const mdObj = {
          medicines: state.medicines.filter((md) => md.id !== id),
        };
        localStorage.setItem(MDKEY, JSON.stringify(mdObj));
        return mdObj;
      }),
  };
});
