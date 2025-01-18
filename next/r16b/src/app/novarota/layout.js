

export const metadata = {
    title: 'Nova Rota',
    description: 'Layout para a rota /novarota',
  };
  
  export default function NovaRotaLayout({ children }) {
    console.log('Montando layout para Nova Rota');
    return (
      <div>
        <header>
          <h1>Seção Nova Rota</h1>
        </header>
        {children}
      </div>
    );
  }
  