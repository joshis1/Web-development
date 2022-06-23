import { React, useContext, useState } from "react";
import { Switch } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { MenuItem, Select } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

import classes from "./VoipStyles.module.css";
import VoipConfig from "./VoIPConfigMock.json";
//import { DefaultContext } from "../../context/DefaultContext";

export default function Features(featureProps) {
  //const context = useContext(DefaultContext);
  //const [settings, setSettings] = useState(context.settingsManager.settings);

  const [saveState, setSaveState] = useState(false);

  const [saveRinger, setSaveRinger] = useState(false);

  const onChangeHandler = (event) => {
    //context.settingsManager.onChange(event, setSettings);
    featureProps.onSaveState(true);
    setSaveState(true);
  };

  const onSubmitHandler = (event) => {
    //context.settingsManager.onSubmit(event);
    featureProps.onSaveState(false);
    setSaveState(false);
  };


  const uploadRingerHandler = (event) => {
    // API to upload the user ringer
    if (saveRinger) {
      console.log('upload ringer handler invoked');
      // promise call that once it is done then  set the state back to false.
      event.stopPropagation();
      event.preventDefault();
      setSaveRinger(false);
    }

  }

  const onDeleteRingerHandler = (event) => {
    // delete the ringer - user added only.
    // use backend API for deleting from the file system.
    console.log('Delete ringer handler invoked');
  }

  const onSetRingerHandler = (event) => {
    // Set the ringer tone.
    // use backend API for setting up a particular ringer tone.
    console.log('set ringer handler invoked');
  }

  return (
    <>
      <Card id="features-card">
        <CardContent id="features-card-content" className={classes.container}>
          <Typography
            component="h5"
            variant="h5"
            className={classes.title}
            gutterBottom
          >
            Tones
          </Typography>

          <Typography component="div">
            <Grid
              container
              alignItems="center"
              className={classes.gridContainer}
              sm
            >
              {featureProps.advancedConfig && (
                <Grid item xs={4}>
                  <Typography component="h4" className={classes.labelTitle}>
                    Local&nbsp;DTMF&nbsp;(Mute)
                  </Typography>

                  <Grid item className={classes.switch}>
                    <Grid item>Off</Grid>

                    <Switch
                      id="voip__callControl__tone__localDtmfMute"
                      name="voip__callControl__tone__localDtmfMute"
                      checked={VoipConfig.callControl.tone.localDtmfMute}
                      onChange={onChangeHandler}
                      size="small"
                      color="primary"
                    />

                    <Grid item>On</Grid>
                  </Grid>
                </Grid>
              )}

              {featureProps.advancedConfig && (
                <Grid item xs={4}>
                  <Typography component="h4" className={classes.labelTitle}>
                    Local&nbsp;DTMF&nbsp;Level
                  </Typography>

                  <Grid item className={classes.switch}>
                    <TextField
                      id="voip__callControl__tone__localDtmfLevel"
                      name="voip__callControl__tone__localDtmfLevel"
                      value={VoipConfig.callControl.tone.localDtmfLevel}
                      onChange={onChangeHandler}
                      type="number"
                      variant="outlined"
                      size="small"
                      InputProps={{ inputProps: { min: -100, max: 12, step: 1 } }}
                    />
                  </Grid>
                </Grid>
              )}

              <FormControl className={classes.formControl} size="small">
                <Grid item xs={4}>
                  <Typography component="h4" className={classes.labelTitle}>
                    DTMF&nbsp;Scheme
                  </Typography>

                  <Grid item className={classes.switch}>
                    <Select
                      id="voip__callControl__tone__dtmfType"
                      name="voip__callControl__tone__dtmfType"
                      value={VoipConfig.callControl.tone.dtmfType}
                      onChange={onChangeHandler}
                      size="small"
                      variant="outlined"
                    >
                      <MenuItem value={1}>Out-Of-Band</MenuItem>

                      <MenuItem value={2}>SIP Info</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </FormControl>

              {featureProps.advancedConfig && (
                <Grid item xs={4}>
                  <Typography component="h4" className={classes.labelTitle}>
                    Call&nbsp;Progress&nbsp;Tone&nbsp;Level
                  </Typography>

                  <Grid item className={classes.switch}>
                    <TextField
                      id="voip__callControl__tone__CPTLevel"
                      name="voip__callControl__tone__CPTLevel"
                      value={VoipConfig.callControl.tone.CPTLevel}
                      onChange={onChangeHandler}
                      type="number"
                      variant="outlined"
                      size="small"
                      InputProps={{ inputProps: { min: -100, max: 12, step: 1 } }}
                    />
                  </Grid>
                </Grid>
              )}

              <FormControl className={classes.formControl} size="small">
                <Grid item xs={4}>
                  <Typography component="h4" className={classes.labelTitle}>
                    Ringer
                  </Typography>

                  <Grid item className={classes.switch}>
                    <Select
                      id="voip__callControl__tone__ringer"
                      name="voip__callControl__tone__ringer"
                      value={VoipConfig.callControl.tone.ringer}
                      onChange={onChangeHandler}
                      size="small"
                      variant="outlined"
                    >
                      <MenuItem value={"leaving_dreams.mkv"}>
                        leaving_dreams.mkv
                      </MenuItem>
                      <MenuItem value={"soft_as_snow.mkv"}>
                        soft_as_snow.mkv
                      </MenuItem>
                      <MenuItem value={"house_keeping.mkv"}>
                        house_keeping.mkv
                      </MenuItem>
                      <MenuItem value={"notes_of_the_optimistic.mkv"}>
                        notes_of_the_optimistic.mkv
                      </MenuItem>
                      <MenuItem value={"oldphone-mono.wav"}>
                        oldphone-mono.wav
                      </MenuItem>
                      <MenuItem value={"four_hands_together.mkv"}>
                        four_hands_together.mkv
                      </MenuItem>
                      <MenuItem value={"its_a_game.mkv"}>
                        its_a_game.mkv
                      </MenuItem>
                    </Select>

                    {featureProps.advancedConfig && (
                      <Grid item xs={2} className={classes.ringerElements}>
                        <Grid item>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon sx={{ marginLeft: 1.5 }} />}
                            style={{
                              maxWidth: "40px",
                              maxHeight: "40px",
                              minWidth: "40px",
                              minHeight: "40px",
                            }}
                            onClick={onDeleteRingerHandler}
                          ></Button>
                        </Grid>
                      </Grid>
                    )}

                    <Grid item xs={2} className={classes.ringerElements}>
                      <Grid item>
                        <Button
                          onClick={onSetRingerHandler}
                          variant="outlined"
                          startIcon={
                            <PlayCircleFilledWhiteIcon
                              sx={{ marginLeft: 1.5 }}
                            />
                          }
                          style={{
                            maxWidth: "40px",
                            maxHeight: "40px",
                            minWidth: "40px",
                            minHeight: "40px",
                          }}
                        ></Button>
                      </Grid>
                    </Grid>

                    {featureProps.advancedConfig && (
                      <Grid item xs={2} className={classes.ringerElements}>
                        <Grid item>
                          <input type="file" hidden id="ringer__file" accept=".mkv,.wav"
                            onInput={(e) => {
                              console.log(e.value);
                              e.value != "" ? setSaveRinger(true) : setSaveRinger(false)
                            }}
                            disabled={saveRinger}
                          />
                          <label
                            htmlFor="ringer__file" >
                            <Button
                              variant="contained"
                              component="span"
                              type="file"
                              style={{
                                maxHeight: "40px",
                                minHeight: "40px",
                              }}
                              className={classes.ringerButton}
                              onClick={uploadRingerHandler}
                            >
                              {saveRinger ? <span>Save&nbsp;Ringer</span> : <span>Add&nbsp;Ringer</span>}
                            </Button>
                          </label>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Box className={classes.formControlContainer}>
              <Typography
                component="h5"
                variant="h5"
                className={classes.title}
                gutterBottom
              >
                Call&nbsp;Features
              </Typography>
            </Box>

            <Grid
              container
              alignItems="center"
              className={classes.gridContainer}
            >
              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Redial
                </Typography>

                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>

                  <Switch
                    id="voip__callControl__redial"
                    name="voip__callControl__redial"
                    checked={VoipConfig.callControl.redial}
                    onChange={onChangeHandler}
                    color="primary"
                    size="small"
                  />

                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Consultative&nbsp;Transfer
                </Typography>

                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>

                  <Switch
                    id="voip__callControl__consultTransfer"
                    name="voip__callControl__consultTransfer"
                    checked={VoipConfig.callControl.consultTransfer}
                    onChange={onChangeHandler}
                    color="primary"
                    size="small"
                  />

                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              {featureProps.advancedConfig && (
                <Grid item xs={4}>
                  <Typography component="h4" className={classes.labelTitle}>
                    Do&nbsp;Not&nbsp;Disturb
                  </Typography>

                  <Grid item className={classes.switch}>
                    <Grid item>Off</Grid>

                    <Switch
                      id="voip__callControl__dnd"
                      name="voip__callControl__dnd"
                      checked={VoipConfig.callControl.dnd}
                      onChange={onChangeHandler}
                      color="primary"
                      size="small"
                    />

                    <Grid item>On</Grid>
                  </Grid>
                </Grid>
              )}

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Auto&nbsp;Answer
                </Typography>

                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>

                  <Switch
                    id="voip__callControl__autoAnswer__enabled"
                    name="voip__callControl__autoAnswer__enabled"
                    checked={VoipConfig.callControl.autoAnswer.enabled}
                    onChange={onChangeHandler}
                    color="primary"
                    size="small"
                  />

                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Auto&nbsp;Answer&nbsp;Delay
                </Typography>

                <Grid item className={classes.switch}>
                  <TextField
                    id="voip__callControl__autoAnswer__delay"
                    name="voip__callControl__autoAnswer__delay"
                    value={VoipConfig.callControl.autoAnswer.delay}
                    onChange={onChangeHandler}
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={!VoipConfig.callControl.autoAnswer.enabled}
                    InputProps={{ inputProps: { min: 1, max: 30, step: 1 } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Box className={classes.saveButtonContainer}>
              <Button
                id="features-save-button"
                type="submit"
                onClick={onSubmitHandler}
                className={`${saveState ? `${classes.button}` : `${classes.buttonDisable}`
                  }`}
                disabled={!saveState}
              >
                SAVE&nbsp;CHANGES
              </Button>
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
