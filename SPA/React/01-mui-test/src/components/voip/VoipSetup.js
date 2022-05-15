import { useContext, useState } from "react";
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
import classes from "./VoipSetup.module.css";

//temporary until the backend values are not available - to be deleted
import VoipConfig from "./VoIPConfigMock.json";
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
  const [tabIndex, setTabIndex] = useState(0);
  const TabChangeHandler = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const [advanced, setAdvanced] = useState(false);

  const voIPSettingsHandler = () => {
    setAdvanced((advanced) => !advanced);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.switchButtonContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={voIPSettingsHandler}
        >
          {advanced ? "SWITCH TO STANDARD" : "SWITCH TO ADVANCED"}
        </Button>
      </Box>

      <Box>
        <AppBar
          position="static"
          style={{
            background: "white",
            marginLeft: "1.5rem",
            marginRight: "2rem",
            width: "auto"
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={TabChangeHandler}
            className={classes.tabPanel}
          >
            <Tab className={classes.tab} label="SIP Config" {...a11yProps(0)} />
            <Tab className={classes.tab} label="Features" {...a11yProps(1)} />
            <Tab className={classes.tab} label="Dial Plan" {...a11yProps(2)} />
            <Tab
              className={classes.tab}
              label="Quality of Service"
              {...a11yProps(3)}
            />
            <Tab className={classes.tab} label="NAT" {...a11yProps(4)} />
            <Tab
              className={classes.tab}
              label="Voice Features"
              {...a11yProps(5)}
            />
          </Tabs>
        </AppBar>

        <TabPanel value={tabIndex} index={0}>
          <Sip advancedConfig={advanced} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Features advancedConfig={advanced} />
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <DialPlan />
        </TabPanel>

        <TabPanel value={tabIndex} index={3}>
          <Qos />
        </TabPanel>

        <TabPanel value={tabIndex} index={4}>
          <Nat />
        </TabPanel>

        <TabPanel value={tabIndex} index={5}>
          <VoiceFeature />
        </TabPanel>
      </Box>
    </div>
  );
};

export default VoipSetup;
