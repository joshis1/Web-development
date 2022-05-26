import { React, useContext, useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";

import classes from "./VoipStyles.module.css";
import VoipConfig from "./VoIPConfigMock.json";
//import { DefaultContext } from "../../context/DefaultContext";

export default function Qos(qosProps) {
  //const context = useContext(DefaultContext);
  //const [settings, setSettings] = useState(context.settingsManager.settings);

  const [saveState, setSaveState] = useState(false);

  const onChangeHandler = (event) => {
    //context.settingsManager.onChange(event, setSettings);
    qosProps.onSaveState(true);
    setSaveState(true);
  };

  const onSubmitHandler = (event) => {
    //context.settingsManager.onSubmit(event);
    qosProps.onSaveState(false);
    setSaveState(false);
  };

  return (
    <>
      <Card id="qos-card">
        <CardContent id="qos-card-content">
          <Typography
            component="h5"
            variant="h5"
            className={classes.title}
            gutterBottom
          >
            Layer&nbsp;3&nbsp;DiffServ
          </Typography>
          <Grid container alignItems="center" className={classes.gridContainer}>
            <Grid item xs={6}>
              <FormControl
                id="qos-form-control"
                className={classes.FormControl}
                size="small"
                style={{ minWidth: 300 }}
              >
                <Typography component="h4" className={classes.labelTitle}>
                  RTP&nbsp;Traffic
                </Typography>
                <Select
                  id="voip__qos__rtpL3"
                  name="voip__qos__rtpL3"
                  value={VoipConfig.qos.rtpL3}
                  onChange={onChangeHandler}
                  size="small"
                  variant="outlined"
                >
                  <MenuItem id="qos-rtp-l3-0" value={0}></MenuItem>
                  <MenuItem id="qos-rtp-l3-1" value={1}>CSO</MenuItem>
                  <MenuItem id="qos-rtp-l3-2" value={2}>CS1</MenuItem>
                  <MenuItem id="qos-rtp-l3-3" value={3}>AF11</MenuItem>
                  <MenuItem id="qos-rtp-l3-4" value={4}>AF12</MenuItem>
                  <MenuItem id="qos-rtp-l3-5" value={5}>AF13</MenuItem>
                  <MenuItem id="qos-rtp-l3-6" value={6}>CS2</MenuItem>
                  <MenuItem id="qos-rtp-l3-7" value={7}>AF21</MenuItem>
                  <MenuItem id="qos-rtp-l3-8" value={8}>AF22</MenuItem>
                  <MenuItem id="qos-rtp-l3-9" value={9}>AF23</MenuItem>
                  <MenuItem id="qos-rtp-l3-10" value={10}>CS3</MenuItem>
                  <MenuItem id="qos-rtp-l3-11" value={11}>AF31</MenuItem>
                  <MenuItem id="qos-rtp-l3-12" value={12}>AF32</MenuItem>
                  <MenuItem id="qos-rtp-l3-13" value={13}>AF33</MenuItem>
                  <MenuItem id="qos-rtp-l3-14" value={14}>CS4</MenuItem>
                  <MenuItem id="qos-rtp-l3-15" value={15}>AF41</MenuItem>
                  <MenuItem id="qos-rtp-l3-16" value={16}>AF42</MenuItem>
                  <MenuItem id="qos-rtp-l3-17" value={17}>AF43</MenuItem>
                  <MenuItem id="qos-rtp-l3-18" value={18}>CS5</MenuItem>
                  <MenuItem id="qos-rtp-l3-19" value={19}>EF</MenuItem>
                  <MenuItem id="qos-rtp-l3-20" value={20}>CS6</MenuItem>
                  <MenuItem id="qos-rtp-l3-21" value={21}>CS7</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                className={classes.formControl}
                size="small"
                style={{ minWidth: 300 }}
              >
                <Typography component="h4" className={classes.labelTitle}>
                  Call&nbsp;Control&nbsp;Traffic
                </Typography>
                <Select
                  id="voip__qos__sipL3"
                  name="voip__qos__sipL3"
                  value={VoipConfig.qos.sipL3}
                  onChange={onChangeHandler}
                  size="small"
                  variant="outlined"
                >
                  <MenuItem id="qos-sip-l3-0" value={0}></MenuItem>
                  <MenuItem id="qos-sip-l3-1" value={1}>CSO</MenuItem>
                  <MenuItem id="qos-sip-l3-2" value={2}>CS1</MenuItem>
                  <MenuItem id="qos-sip-l3-3" value={3}>AF11</MenuItem>
                  <MenuItem id="qos-sip-l3-4" value={4}>AF12</MenuItem>
                  <MenuItem id="qos-sip-l3-5" value={5}>AF13</MenuItem>
                  <MenuItem id="qos-sip-l3-6" value={6}>CS2</MenuItem>
                  <MenuItem id="qos-sip-l3-7" value={7}>AF21</MenuItem>
                  <MenuItem id="qos-sip-l3-8" value={8}>AF22</MenuItem>
                  <MenuItem id="qos-sip-l3-9" value={9}>AF23</MenuItem>
                  <MenuItem id="qos-sip-l3-10" value={10}>CS3</MenuItem>
                  <MenuItem id="qos-sip-l3-11" value={11}>AF31</MenuItem>
                  <MenuItem id="qos-sip-l3-12" value={12}>AF32</MenuItem>
                  <MenuItem id="qos-sip-l3-13" value={13}>AF33</MenuItem>
                  <MenuItem id="qos-sip-l3-14" value={14}>CS4</MenuItem>
                  <MenuItem id="qos-sip-l3-15" value={15}>AF41</MenuItem>
                  <MenuItem id="qos-sip-l3-16" value={16}>AF42</MenuItem>
                  <MenuItem id="qos-sip-l3-17" value={17}>AF43</MenuItem>
                  <MenuItem id="qos-sip-l3-18" value={18}>CS5</MenuItem>
                  <MenuItem id="qos-sip-l3-19" value={19}>EF</MenuItem>
                  <MenuItem id="qos-sip-l3-20" value={20}>CS6</MenuItem>
                  <MenuItem id="qos-sip-l3-21" value={21}>CS7</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box className={classes.saveButtonContainer}>
            <Button
              id="qos-save-button"
              type="submit"
              onClick={onSubmitHandler}
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
