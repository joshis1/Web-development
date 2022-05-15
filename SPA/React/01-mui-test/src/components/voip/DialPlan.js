import { React, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import VoipConfig from "./VoIPConfigMock.json";


import classes from "./DialPlan.module.css";
//import { DefaultContext } from "../../context/DefaultContext";

export default function DialPlan() {
  //const context = useContext(DefaultContext);
  //const [settings, setSettings] = useState(context.settingsManager.settings);

  const [saveState, setSaveState] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [normalizationRow, setNormalizationRow] = useState(
    VoipConfig.callControl.dialPlan.normRules
  );

  const onChange = (event) => {
    //context.settingsManager.onChange(event, setSettings);
    setSaveState(true);
  };

  const onSubmit = (event) => {
    /** update the value here */
    let normEvent = {
      target: {
        name: "voip__callControl__dialPlan__normRules",
        value: normalizationRow,
      },
    };

    // On Change called for submit so that the key values are changed.
    //context.settingsManager.onChange(normEvent, setSettings);
    // On Submit called usual one.
    //context.settingsManager.onSubmit(event);
    setSaveState(false);
  };

  const normalizationHeader = [
    {
      title: "Label",
      field: "label",
      validate: (rowData) =>
        rowData.label === undefined
          ? { isValid: false, helperText: "Label cannot be empty" }
          : rowData.label === ""
          ? { isValid: false, helperText: "Label cannot be empty" }
          : true,
    },
    {
      title: "Number Pattern",
      field: "matchPattern",
      validate: (rowData) =>
        rowData.matchPattern === undefined
          ? { isValid: false, helperText: "Number Pattern cannot be empty" }
          : rowData.matchPattern === ""
          ? { isValid: false, helperText: "Number Pattern cannot be empty" }
          : true,
    },
    {
      title: "Translation",
      field: "translationPattern",
      validate: (rowData) =>
        rowData.translationPattern === undefined
          ? { isValid: false, helperText: "Translation cannot be empty" }
          : rowData.translationPattern === ""
          ? { isValid: false, helperText: "Translation cannot be empty" }
          : true,
    },
  ];

  const onRowAddHandler = (newData) =>
    new Promise((resolve, reject) => {
      const updatedNormalizationRow = [...normalizationRow, newData];
      setNormalizationRow(updatedNormalizationRow);
      setSaveState(true);
      resolve();
    });

  const onRowUpdateHandler = (newData, oldData) =>
    new Promise((resolve, reject) => {
      const updateNormalizationRow = [...normalizationRow];
      const index = oldData.tableData.id;
      updateNormalizationRow[index] = newData;
      setNormalizationRow([...updateNormalizationRow]);
      setSaveState(true);
      resolve();
    });

  const isSameRow = (a, b) =>
    a.label === b.label &&
    a.matchPattern === b.matchPattern &&
    a.translationPattern === b.translationPattern;

  const onBulkDeleteHandler = () => {
    const updatedRows = normalizationRow.filter((normRow) => {
      return !selectedRows.some((selectedRow) =>
        isSameRow(selectedRow, normRow)
      );
    });
    setNormalizationRow([...updatedRows]);
    setSaveState(true);
  };

  const onSelectionChangeHandler = (rows) => {
    setSelectedRows(rows);
  };

  // E.g.
  //
  // <TextField name='voip__callControl__dialPlan__digitMap' value={settings.voip.callControl.dialPlan.digitMap} onChange={onChange} />
  // <TextField name='voip__callControl__dialPlan__dialingTimeout' value={settings.voip.callControl.dialPlan.dialingTimeout} onChange={onChange} />
  // <TextField name='voip__callControl__dialPlan__normRules' value={settings.voip.callControl.dialPlan.normRules}/> />

  const theme = createTheme({
    palette: {
      primary: {
        main: "#808080",
      },
      secondary: {
        main: "#808080",
      },
    },
  });

  return (
    <>
      <Card>
        <CardContent>
          <Grid container alignItems="center" className={classes.dialContainer}>
            <Grid item xs={6}>
              <Typography component="h4" className={classes.labelTitle}>
                Local&nbsp;Dial&nbsp;Plan
              </Typography>

              <TextField
                name="voip__callControl__dialPlan__digitMap"
                value={VoipConfig.callControl.dialPlan.digitMap}
                onChange={onChange}
                type="text"
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={6}>
              <Typography component="h4" className={classes.labelTitle}>
                Dialing&nbsp;Timeout&nbsp;(seconds)
              </Typography>

              <TextField
                name="voip__callControl__dialPlan__dialingTimeOut"
                value={VoipConfig.callControl.dialPlan.dialingTimeOut}
                onChange={onChange}
                type="number"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>

          <Typography
            component="h5"
            variant="h5"
            className={classes.title}
            gutterBottom
          >
            Normalization
          </Typography>

          <ThemeProvider theme={theme}>
            <MaterialTable
              columns={normalizationHeader}
              data={normalizationRow}
              title="Normalization"
              options={{
                selection: true,
                search: false,
                paging: false,
                actionsColumnIndex: -1,
                addRowPosition: "first",
                showTitle: false,
                headerStyle: {
                  backgroundColor: "#EEE",
                },
                rowStyle: (rowData) => ({
                  backgroundColor:
                    rowData.tableData.id % 2 === 0 ? "#FFF" : "#EEE",
                }),
              }}
              editable={{
                onRowAdd: onRowAddHandler,
                onRowUpdate: onRowUpdateHandler,
              }}
              actions={[
                {
                  icon: "delete",
                  tooltip: "Delete all selected rows",
                  onClick: onBulkDeleteHandler,
                },
              ]}
              onSelectionChange={onSelectionChangeHandler}
            />
          </ThemeProvider>

          <Box className={classes.saveButtonContainer}>
            <Button
              type="submit"
              onClick={onSubmit}
              className={`${
                saveState ? `${classes.button}` : `${classes.buttonDisable}`
              }`}
              disabled={!saveState}
            >
              SAVE&nbsp;CHANGES
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
