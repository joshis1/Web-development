import { React, useContext, useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";

import classes from "./Qos.module.css";

import VoipConfig from "./VoIPConfigMock.json";


export default function Qos() {
  // const context = useContext(DefaultContext);
  // const [settings, setSettings] = useState(context.settingsManager.settings);

  const [saveState, setSaveState] = useState(false);

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
        <CardContent>
          <Typography
            component="h5"
            variant="h5"
            className={classes.title}
            gutterBottom
          >
            Layer&nbsp;3&nbsp;DiffServ
          </Typography>
          <form onSubmit={onSubmit}>
            <Box className={classes.formControlContainer}>
              <FormControl className={classes.formControl} size="small">
                <Typography component="h4" className={classes.labelTitle}>
                  RTP&nbsp;Traffic
                </Typography>
                <Select
                  name="voip__qos__rtpL3"
                  value={VoipConfig.qos.rtpL3}
                  onChange={onChange}
                  size="small"
                  variant="outlined"
                >
                  <MenuItem value={0}></MenuItem>
                  <MenuItem value={1}>CSO</MenuItem>
                  <MenuItem value={2}>CS1</MenuItem>
                  <MenuItem value={3}>AF11</MenuItem>
                  <MenuItem value={4}>AF12</MenuItem>
                  <MenuItem value={5}>AF13</MenuItem>
                  <MenuItem value={6}>CS2</MenuItem>
                  <MenuItem value={7}>AF21</MenuItem>
                  <MenuItem value={8}>AF22</MenuItem>
                  <MenuItem value={9}>AF23</MenuItem>
                  <MenuItem value={10}>CS3</MenuItem>
                  <MenuItem value={11}>AF31</MenuItem>
                  <MenuItem value={12}>AF32</MenuItem>
                  <MenuItem value={13}>AF33</MenuItem>
                  <MenuItem value={14}>CS4</MenuItem>
                  <MenuItem value={15}>AF41</MenuItem>
                  <MenuItem value={16}>AF42</MenuItem>
                  <MenuItem value={17}>AF43</MenuItem>
                  <MenuItem value={18}>CS5</MenuItem>
                  <MenuItem value={19}>EF</MenuItem>
                  <MenuItem value={20}>CS6</MenuItem>
                  <MenuItem value={21}>CS7</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl} size="small">
                <Typography component="h4" className={classes.labelTitle}>
                  Call&nbsp;Control&nbsp;Traffic
                </Typography>
                <Select
                  name="voip__qos__sipL3"
                  value={VoipConfig.qos.sipL3}
                  onChange={onChange}
                  size="small"
                  variant="outlined"
                >
                  <MenuItem value={0}></MenuItem>
                  <MenuItem value={1}>CSO</MenuItem>
                  <MenuItem value={2}>CS1</MenuItem>
                  <MenuItem value={3}>AF11</MenuItem>
                  <MenuItem value={4}>AF12</MenuItem>
                  <MenuItem value={5}>AF13</MenuItem>
                  <MenuItem value={6}>CS2</MenuItem>
                  <MenuItem value={7}>AF21</MenuItem>
                  <MenuItem value={8}>AF22</MenuItem>
                  <MenuItem value={9}>AF23</MenuItem>
                  <MenuItem value={10}>CS3</MenuItem>
                  <MenuItem value={11}>AF31</MenuItem>
                  <MenuItem value={12}>AF32</MenuItem>
                  <MenuItem value={13}>AF33</MenuItem>
                  <MenuItem value={14}>CS4</MenuItem>
                  <MenuItem value={15}>AF41</MenuItem>
                  <MenuItem value={16}>AF42</MenuItem>
                  <MenuItem value={17}>AF43</MenuItem>
                  <MenuItem value={18}>CS5</MenuItem>
                  <MenuItem value={19}>EF</MenuItem>
                  <MenuItem value={20}>CS6</MenuItem>
                  <MenuItem value={21}>CS7</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={classes.saveButtonContainer}>
              <Button
                type="submit"
                className={`${
                  saveState ? `${classes.button}` : `${classes.buttonDisable}`
                }`}
                disabled={!saveState}
              >
                SAVE&nbsp;CHANGES
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
