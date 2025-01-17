import { MariaPrea } from "./componentes";
import { SubComponente } from "../componentes/subcomponente";
import { ComponenteComParametro } from "../componentes/ComponenteComParametro";

export default function NovaRotaHome() {
  return (
    <div>
      <h1>Nova Rota, Nova Página</h1>
      <SubComponente />
      <ComponenteComParametro
        mensagem="Mensagem recebida como parâmetro!"
        estilo={{ color: "blue", fontWeight: "bold" }}
      />

      <MariaPrea />
    </div>
  );
}
