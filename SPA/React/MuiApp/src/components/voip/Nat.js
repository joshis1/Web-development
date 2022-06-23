import { React, useContext, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";

import classes from "./VoipStyles.module.css";
import VoipConfig from "./VoIPConfigMock.json";
import PasswordInput from "../PasswordInput";
//import { DefaultContext } from "../../context/DefaultContext";

export default function Nat(natProps) {
  //const context = useContext(DefaultContext);
  //const [settings, setSettings] = useState(context.settingsManager.settings);

  const [saveState, setSaveState] = useState(false);

  const onChangeHandler = (event) => {
    //context.settingsManager.onChange(event, setSettings);
    natProps.onSaveState(true);
    setSaveState(true);
  };

  const onSubmitHandler = (event) => {
    //context.settingsManager.onSubmit(event);
    natProps.onSaveState(false);
    setSaveState(false);
  };

  return (
    <>
      <Card id="nat-card">
        <CardContent id="nat-card-content" className={classes.container}>
          <Typography component="div">
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  Keepalive
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__nat__keepalive"
                    name="voip__nat__keepalive"
                    checked={VoipConfig.nat.keepalive}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  ICE
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__nat__ice"
                    name="voip__nat__ice"
                    checked={VoipConfig.nat.ice}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Typography component="h4" className={classes.labelTitle}>
                TURN
              </Typography>
              <Grid item xs={12} className={classes.switch}>
                <Grid item>Off</Grid>
                <Switch
                  id="voip__nat__turnEnable"
                  name="voip__nat__turnEnable"
                  checked={VoipConfig.nat.turnEnable}
                  onChange={onChangeHandler}
                  size="small"
                  color="primary"
                />
                <Grid item>On</Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  STUN/TURN&nbsp;Server
                </Typography>
                <Grid item className={classes.switch}>
                  <TextField
                    name="voip__nat__stunTurnSrv__addr"
                    value={VoipConfig.nat.stunTurnSrv.addr}
                    onChange={onChangeHandler}
                    type="text"
                    variant="outlined"
                    size="small"
                    InputProps={{ inputProps: { maxLength: 48 } }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  STUN/TURN&nbsp;Server&nbsp;Port
                </Typography>
                <Grid item className={classes.switch}>
                  <TextField
                    id="voip__nat__stunTurnSrv__port"
                    name="voip__nat__stunTurnSrv__port"
                    value={VoipConfig.nat.stunTurnSrv.port}
                    onChange={onChangeHandler}
                    type="number"
                    variant="outlined"
                    size="small"
                    InputProps={{ inputProps: { min: 2000, max: 65535, step: 1 } }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  TURN&nbsp;User&nbsp;Name
                </Typography>
                <Grid item className={classes.switch}>
                  <TextField
                    id="voip__nat__auth__user"
                    name="voip__nat__auth__user"
                    value={VoipConfig.nat.auth.user}
                    onChange={onChangeHandler}
                    type="text"
                    variant="outlined"
                    size="small"
                    className={
                      !VoipConfig.nat.turnEnable ? classes.disable : ""
                    }
                    disabled={!VoipConfig.nat.turnEnable}
                    InputProps={{ inputProps: { maxLength: 48 } }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  TURN&nbsp;Password
                </Typography>
                <Grid item className={classes.switch}>
                  <PasswordInput
                    id="voip__nat__auth__passwd"
                    name="voip__nat__auth__passwd"
                    onChange={onChangeHandler}
                    value={VoipConfig.nat.auth.passwd}
                    disabled={!VoipConfig.nat.turnEnable}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box className={classes.saveButtonContainer}>
              <Button
                id="nat-save-button"
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
