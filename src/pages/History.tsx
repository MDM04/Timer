import { useContext } from "react";
import styled from "styled-components";
import { CyclesContext } from "../contexts/CyclesContexts";
import { formatDistanceToNow } from "date-fns";
import {ptBR} from "date-fns/locale/pt-BR";
const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme["gray-100"]};
  }
`;

const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme["gray-600"]};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme["gray-700"]};
      border-top: 4px solid ${(props) => props.theme["gray-800"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;
const STATUS_COLORS = {
  yellow: "yellow-500",
  green: "green-500",
  red: "red-500",
} as const;

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS;
}

const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`;

export function History() {
  const { cycles } = useContext(CyclesContext);
  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
