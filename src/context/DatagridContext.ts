import React, { createContext } from 'react';
import { IDatagridContext } from '../lib/@interface';

const initialValues: [
  IDatagridContext,
  React.Dispatch<React.SetStateAction<IDatagridContext>>,
] = [{}, () => {}];

const DatagridContext = createContext(initialValues);

export default DatagridContext;
