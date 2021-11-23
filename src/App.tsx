import * as React from "react";
import { IDatagridProps } from "./@interface";
import { DatagridProvider } from "./context/DatagridContext";
import { DatagridLayoutProvider } from "./context/DatagridLayoutContext";
import Datagrid from "./components/Datagrid";
import { DatagridFilterProvider } from "./context/DatagridFilterContext";

const App: React.FC<IDatagridProps> = (props) => {
  return (
    <DatagridProvider>
      <DatagridLayoutProvider>
        <DatagridFilterProvider>
          <Datagrid {...props} />
        </DatagridFilterProvider>
      </DatagridLayoutProvider>
    </DatagridProvider>
  );
};

export default App;
