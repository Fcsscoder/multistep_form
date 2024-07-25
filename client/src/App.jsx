// icons

import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";

// components

import UserForm from "./components/UserForm";
import ReviewForm from "./components/ReviewForm";
import Thanks from "./components/Thanks";
import Steps from "./components/Steps";

import "./App.css";

// hooks

import { useForm } from "./hooks/useForm";
import { useState } from "react";

const formTemplate = {
  name: "",
  email: "",
  review: "",
  coment: "",
};

function App() {
  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key, value) => {
    setData((prevData) => {
      return { ...prevData, [key]: value };
    });
  };

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler} />,
    <Thanks data={data} />,
  ];

  const { currentStep, currentComponent, changeForm, isLastStep, isFirtsStep } =
    useForm(formComponents);

  return (
    <>
      <div className="app">
        <div className="header">
          <h2>Deixe sua avaliação</h2>
          <p>
            Ficamos felizes com a sua compra, utilize o formulário abaico para
            avaliar o produto
          </p>
        </div>
        <div className="form-container">
          <Steps currentStep={currentStep} />
          <form onSubmit={(e) => changeForm(currentStep + 1, e)}>
            <div className="inputs-container">{currentComponent}</div>
            <div className="actions">
              {!isFirtsStep && (
                <button
                  type="button"
                  onClick={() => changeForm(currentStep - 1)}>
                  <GrFormPrevious />
                  <span>Voltar</span>
                </button>
              )}
              {!isLastStep ? (
                <button
                  type="submit"
                  onSubmit={(e) => changeForm(currentStep + 1, e)}>
                  <GrFormNext />
                  <span>Avançar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onSubmit={(e) => changeForm(currentStep + 1, e)}>
                  <FiSend />
                  <span>Enviar</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
