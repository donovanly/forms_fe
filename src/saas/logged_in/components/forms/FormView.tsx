import React from 'react';

import MaterialTable from "material-table";
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RootState } from "../../../../state/root";
import { useSelector } from 'react-redux'
import { forwardRef } from 'react';
import { Icons } from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

const FormView = () => {
  const classes = useStyles();
  const formList = useSelector((state: RootState) => state.formListReducer.formList);
  const rows = formList.map( form => ({
    ...form,
    created: moment(form.created).format("LL"),
    updated: moment(form.updated).format("LLL"),
  }))
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MaterialTable
          actions={[
            {
              icon: Edit,
              tooltip: 'Edit Form',
              onClick: (event, rowData) => (console.log(event))
            }
          ]}
          columns={[
            { title: "Form Name", field: "name", cellStyle: { padding: "5px 10px" }, headerStyle: { padding: "5px 10px" } },
            { title: "Created Date", field: "created", cellStyle: { padding: "5px 10px" }, headerStyle: { padding: "5px 10px" } },
            { title: "Last Modified", field: "updated", cellStyle: { padding: "5px 10px" }, headerStyle: { padding: "5px 10px" } },
          ]}
          data={rows}
          icons={tableIcons}
          options={{
          }}
        />
      </Paper>
    </div>
  );
}

export default FormView