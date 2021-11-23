import * as React from "react";
import { IDatagridProps } from "./@interface";
import { DatagridProvider } from "./context/DatagridContext";
import { DatagridLayoutProvider } from "./context/DatagridLayoutContext";
import Datagrid from "./components/Datagrid";
import { DatagridThemeProvider } from "./context/DatagridThemeContext";

const App: React.FC<IDatagridProps> = (props) => {
  return (
    <DatagridProvider>
      <DatagridLayoutProvider>
        <DatagridThemeProvider>
          <Datagrid {...props} />
        </DatagridThemeProvider>
      </DatagridLayoutProvider>
    </DatagridProvider>
  );
};

export default App;
