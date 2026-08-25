
import styled from "styled-components";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../contexts/CyclesContexts";

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["green-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }
`;

const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;



export function NewCycleForm() {
    const {activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
