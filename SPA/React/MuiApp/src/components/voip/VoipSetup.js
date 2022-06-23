import { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Qos from "./Qos";
import VoiceFeature from "./VoiceFeature";
import Nat from "./Nat";
import DialPlan from "./DialPlan";
import Features from "./Features";
import Sip from "./Sip";
import classes from "./VoipStyles.module.css";

import AlertDialog from "../AlertDialog";
import ErrorDialog from "../ErrorDialog";

//temporary until the backend values are not available - to be deleted
// import VoipConfig from "./VoIPConfigMock.json";
// ends here

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`voip-tabpanel-${index}`}
      aria-labelledby={`voip-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

// TODO: lift
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// TODO: lift
function a11yProps(index) {
  return {
    id: `voip-tab-${index}`,
    "aria-controls": `voip-tabpanel-${index}`,
  };
}

const VoipSetup = () => {

  const unsavedDialogText = 'The current tab has unsaved changes, are you sure you would like to navigate away?'
  const errVal = { 'show': false, 'title': 'VoIP Settings', 'text': "VoIP Registration failed" }

  const [tabIndex, setTabIndex] = useState(0);
  const [advanced, setAdvanced] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(errVal);
  const [navigate, setNavigate] = useState(0);

  const tabChangeHandler = (event, newTabIndex) => {
    if (saveStatus) {
      setAlertDialog(true);
      setNavigate(newTabIndex);
    }
    else {
      setTabIndex(newTabIndex);
    }
  };

  const voIPSettingsHandler = () => {
    setAdvanced((advanced) => !advanced);
  };

  const saveStateModalHandler = (state) => {
    setSaveStatus(state);
  }

  const handleAlertDialogClose = (state) => {
    setAlertDialog(false);
    if (state) {
      //change the tab
      setSaveStatus(false);
      setTabIndex(navigate);
    }
  }

  const handleErrorDialogClose = () => {
    setErrorDialog(false);
  }

  //Settings Manager should call this callback in order to show the error dialogue.
  // the props are not decided yet but the title, message info will be sufficient.
  const onErrorHandler = (props) => {
    setErrorDialog(true);
  }

  return (
    <div id="voip-setup" className={classes.root}>
      <Box id="voip-setup-button-container" className={classes.switchButtonContainer}>
        <Button
          id="voip-setup-toggle-advanced-button"
          variant="contained"
          className={classes.button}
          onClick={voIPSettingsHandler}
        >
          {advanced ? "SWITCH TO STANDARD" : "SWITCH TO ADVANCED"}
        </Button>
      </Box>

      <Box id="voip-setup-main-box">
        <AppBar
          id="voip-setup-app-bar"
          position="static"
          style={{
            background: "white",
            marginLeft: "1.5rem",
            marginRight: "2rem",
            width: "auto",
          }}
        >
          <Tabs
            id="voip-setup-tabs"
            value={tabIndex}
            onChange={tabChangeHandler}
            className={classes.tabPanel}
          >
            <Tab id="voip-setup-sip-config-tab" className={classes.tab} label="SIP Config" {...a11yProps(0)} />
            <Tab id="voip-setup-features-tab" className={classes.tab} label="Features" {...a11yProps(1)} />
            <Tab id="voip-setup-dial-plan-tab" className={classes.tab} label="Dial Plan" {...a11yProps(2)} />
            <Tab
              id="voip-setup-qos-tab"
              className={classes.tab}
              label="Quality of Service"
              {...a11yProps(3)}
            />
            <Tab id="voip-setup-nat-tab" className={classes.tab} label="NAT" {...a11yProps(4)} />
            <Tab
              id="voip-setup-voice-features-tab"
              className={classes.tab}
              label="Voice Features"
              {...a11yProps(5)}
            />
          </Tabs>
        </AppBar>

        <TabPanel id="voip-setup-sip-tab-panel" value={tabIndex} index={0}>
          <Sip advancedConfig={advanced} onSaveState={saveStateModalHandler} id="voip-setup-sip" />
        </TabPanel>
        <TabPanel id="voip-setup-features-tab-panel" value={tabIndex} index={1}>
          <Features advancedConfig={advanced} onSaveState={saveStateModalHandler} id="voip-setup-features" />
        </TabPanel>

        <TabPanel id="voip-setup-dial-plan-tab-panel" value={tabIndex} index={2}>
          <DialPlan onSaveState={saveStateModalHandler} id="voip-setup-dial-plan" />
        </TabPanel>

        <TabPanel id="voip-setup-qos-tab-panel" value={tabIndex} index={3}>
          <Qos onSaveState={saveStateModalHandler} id="voip-setup-qos" />
        </TabPanel>

        <TabPanel id="voip-setup-nat-tab-panel" value={tabIndex} index={4}>
          <Nat onSaveState={saveStateModalHandler} id="voip-setup-nat" />
        </TabPanel>

        <TabPanel id="voip-setup-voice-feature-tab-panel" value={tabIndex} index={5}>
          <VoiceFeature onSaveState={saveStateModalHandler} id="voip-setup-voice-feature" />
        </TabPanel>
      </Box>

      <AlertDialog open={alertDialog} onclose={handleAlertDialogClose} title='Confirmation'
        text={unsavedDialogText} />

      <ErrorDialog open={errorDialog.show} onclose={handleErrorDialogClose} title={errorDialog.title}
        text={errorDialog.text} />


    </div >
  );
};

export default VoipSetup;
