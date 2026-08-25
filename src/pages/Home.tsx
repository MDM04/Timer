import { HandPalm, Play } from "phosphor-react";
import styled from "styled-components";
import * as zod from "zod";
import { useContext } from "react";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./CountDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../contexts/CyclesContexts";

const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: ${(props) => props.theme["gray-100"]};

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme["green-500"]};
  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
  }
`;

const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme["red-500"]};
  &:not(:disabled):hover {
    background: ${(props) => props.theme["red-700"]};
  }
`;

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisable = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
