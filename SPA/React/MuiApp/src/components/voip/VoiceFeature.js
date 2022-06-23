import { React, useContext, useState } from "react";
import { Switch } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import VoipConfig from "./VoIPConfigMock.json";

//import { DefaultContext } from "../../context/DefaultContext";
import classes from "./VoipStyles.module.css";

export default function VoiceFeature(voiceFeatureProps) {
  //const context = useContext(DefaultContext);
  //const [settings, setSettings] = useState(context.settingsManager.settings);

  const [codecRow, setCodecRow] = useState(VoipConfig.callControl.codecs);
  const [saveState, setSaveState] = useState(false);

  const onChange = (event) => {
    //context.settingsManager.onChange(event, setSettings);
    voiceFeatureProps.onSaveState(true);
    setSaveState(true);
  };
  const onSubmit = (event) => {
    /** update the value here */
    let codecEvent = {
      target: {
        name: "voip__callControl__codecs",
        value: codecRow,
      },
    };

    // On Change called for submit so that the key values are changed.
    //context.settingsManager.onChange(codecEvent, setSettings);
    // On Submit called usual one.
    //context.settingsManager.onSubmit(event);
    voiceFeatureProps.onSaveState(false);
    setSaveState(false);
  };

  const onRowUpdateHandler = (newData, oldData) =>
    new Promise((resolve, reject) => {
      const updateCodecRow = [...codecRow];
      const index = oldData.tableData.id;
      updateCodecRow[index] = newData;
      setCodecRow([...updateCodecRow]);
      voiceFeatureProps.onSaveState(true);
      setSaveState(true);
      resolve();
    });

  const voiceCodePriorityHeader = [
    {
      title: "Use",
      field: "inUse",
      type: "boolean",
    },
    {
      title: "Codec",
      field: "codec",
      lookup: { 1: "OPUS", 2: "G722", 3: "G711U", 4: "G711A", 5: "G729AB" },
      editable: "never",
    },
    {
      title: "Bit Rate",
      field: "conf.bitRate",
    },
    {
      title: "Use CBR",
      field: "conf.cbr",
      type: "boolean",
    },
    {
      title: "Use DTX",
      field: "conf.usedtx",
      type: "boolean",
    },
    {
      title: "Use inBand FEC",
      field: "conf.useinbandfec",
      type: "boolean",
    },
  ];

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
      <Card id="voice-feature-card">
        <CardContent id="voice-feature-card-content" className={classes.container}>
          <Typography component="div">
            <Grid container id="voice-feature-grid" alignItems="center">
              <Grid item xs={12}>
                <Typography component="h4" className={classes.labelTitle}>
                  Comfort&nbsp;Noise
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__callControl__comfortNoise"
                    name="voip__callControl__comfortNoise"
                    checked={VoipConfig.callControl.comfortNoise}
                    onChange={onChange}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Typography>

          <Box className={classes.formControlContainer}>
            <Typography
              component="h5"
              variant="h5"
              className={classes.title}
              gutterBottom
            >
              Voice&nbsp;Codec&nbsp;Priorities
            </Typography>
          </Box>

          <ThemeProvider theme={theme}>
            <MaterialTable
              columns={voiceCodePriorityHeader}
              data={codecRow}
              title="Voice Codec Priorities"
              options={{
                search: false,
                paging: false,
                actionsColumnIndex: -1,
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
                onRowUpdate: onRowUpdateHandler,
              }}
            />
          </ThemeProvider>

          <Box className={classes.saveButtonContainer}>
            <Button
              id="voice-feature-save-button"
              type="submit"
              onClick={onSubmit}
              className={`${saveState ? `${classes.button}` : `${classes.buttonDisable}`
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
