import {  useState } from "react";
import { useStore } from "./store/pharmacy";
import { EditIcon, TrashIcon } from "./utilities/icon";
import { ACTIONS } from "./utilities/constantes";
import classNames from "classnames";
const { EDIT_MEDICINE, NEW_MEDICINE } = ACTIONS;

function App() {

  const { medicines, insertMedicine, updateMedicine, dropMedicine } = useStore(
    (state) => state
  );
  const [action, setAction] = useState(NEW_MEDICINE);
  const [idSelected, setIdSelected] = useState(null);

  const changeActionToNew = () => {
    setAction(NEW_MEDICINE);
    setIdSelected(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const medicineEntries = Object.fromEntries(form);

    if (action === NEW_MEDICINE) {
      insertMedicine(medicineEntries);
    }

    if (action === EDIT_MEDICINE) {
      updateMedicine({ id: idSelected, ...medicineEntries });
      changeActionToNew();
    }
  };

  const handleEditMedicine = (id) => {
    setAction(EDIT_MEDICINE);
    setIdSelected(id);
  };

  return (
    <main>
      <section className=" lg:w-[980px] lg:m-auto  h-screen p-4  flex flex-col lg:flex-row-reverse gap-4">
        <div className="lg:mt-9">
          <form
            className="w-full  rounded flex flex-col gap-2  border p-4 relative"
            onSubmit={handleSubmit}
          >
            {idSelected && (
              <p
                className="absolute right-3 top-3 font-semibold cursor-pointer"
                onClick={changeActionToNew}
              >
                X
              </p>
            )}

            <label className="flex flex-col gap-1 font-semibold">
              Name:
              <input
                type="text"
                name="name"
                id="name"
                className="p-2 text-black outline-none rounded"
              />
            </label>

            <label className="flex flex-col gap-1 font-semibold">
              Price:
              <input
                type="text"
                name="price"
                id="price"
                className="p-2  text-black outline-none rounded"
              />
            </label>

            <button className="bg-blue-600 px-8 py-2 rounded mt-2 w-full ml-auto">
              {action === NEW_MEDICINE ? "Add" : "Edit "}
            </button>
          </form>
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-semibold">Medicines</h2>

          <ul className="flex flex-col gap-2 mt-2">

            {medicines.length < 1 && 
              <li className="text-xl">Medicines not found</li>
            }
            {medicines.map(({ id, name, price }) => (
              <li
                className={classNames(
                  "text-black rounded p-4 flex  bg-slate-100",
                  {
                    "bg-slate-600 text-white":
                      idSelected !== null && idSelected === id,
                  }
                )}
                key={id}
              >
                <div>
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <div className="flex gap-2">
                    <p className="text-base font-medium ">Price: </p>
                    {price}€
                  </div>
                </div>
                <div className="ml-auto flex gap-2 items-start">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => handleEditMedicine(id)}
                  >
                    <EditIcon />
                  </button>

                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => dropMedicine(id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default App;
