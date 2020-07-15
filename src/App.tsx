import React from "react";
import { IDatagridProps } from "./@interface";
import { DatagridProvider } from "./context/DatagridContext";
import { DatagridLayoutProvider } from "./context/DatagridLayoutContext";
import Datagrid from "./components/Datagrid";

const App: React.FC<IDatagridProps> = props => {
  return (
    <DatagridProvider>
      <DatagridLayoutProvider>
        <Datagrid {...props} />
      </DatagridLayoutProvider>
    </DatagridProvider>
  );
};

export default App;
