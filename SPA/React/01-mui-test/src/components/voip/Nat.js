import { React, useContext, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import classes from "./Nat.module.css";
//import { DefaultContext } from "../../context/DefaultContext";
import VoipConfig from "./VoIPConfigMock.json";


export default function Nat() {
  //const context = useContext(DefaultContext);
  //const [settings, setSettings] = useState(context.settingsManager.settings);

  const [saveState, setSaveState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (event) => {
    //context.settingsManager.onChange(event, setSettings);
    setSaveState(true);
  };

  const onSubmit = (event) => {
    //context.settingsManager.onSubmit(event);
    setSaveState(false);
  };

  return (
    <>
      <Card>
        <CardContent className={classes.container}>
          <Typography component="div">
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  Keepalive
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    name="voip__nat__keepalive"
                    checked={VoipConfig.nat.keepalive}
                    onChange={onChange}
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
                    name="voip__nat__ice"
                    checked={VoipConfig.nat.ice}
                    onChange={onChange}
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
                  name="voip__nat__turnEnable"
                  checked={VoipConfig.nat.turnEnable}
                  onChange={onChange}
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
                    onChange={onChange}
                    type="text"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  STUN/TURN&nbsp;Server&nbsp;Port
                </Typography>
                <Grid item className={classes.switch}>
                  <TextField
                    name="voip__nat__stunTurnSrv__port"
                    value={VoipConfig.nat.stunTurnSrv.port}
                    onChange={onChange}
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  TURN&nbsp;User&nbsp;Name
                </Typography>
                <Grid item className={classes.switch}>
                  <TextField
                    name="voip__nat__auth__user"
                    value={VoipConfig.nat.auth.user}
                    onChange={onChange}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={!VoipConfig.nat.turnEnable}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  TURN&nbsp;Password
                </Typography>
                <Grid item className={classes.switch}>
                  <OutlinedInput
                    name="voip__nat__auth__passwd"
                    value={VoipConfig.nat.auth.passwd}
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    disabled={!VoipConfig.nat.turnEnable}
                    onChange={onChange}
                    size="small"
                    sx={{ height: 38, width: 190 }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
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
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
