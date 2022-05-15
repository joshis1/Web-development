import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, makeStyles } from "@material-ui/core";
import Qos from "./Qos";
import VoiceFeature from "./VoiceFeature";
import Nat from "./Nat";
import DialPlan from  "./DialPlan";
import Features from "./Features";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `voip-tab-${index}`,
    "aria-controls": `voip-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  switchButtonContainer: {
    color: "black",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0.5em",
  },

  switchButton: {
    background: "#91D7EA",
  },

  tabPanel: {
    background: "#4D4D4D",
  },
  tab: {
    textTransform: "none",
  },
});

const Line = () => {
  const classes = useStyles();

  const [tabIndex, setTabIndex] = React.useState(0);

  const TabChangeHandler = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <>
      <Box className={classes.switchButtonContainer}>
        <Button variant="contained" className={classes.switchButton}>
          SWITCH TO ADVANCED
        </Button>
      </Box>

      <Box>
        <AppBar position="static">
          <Tabs
            value={tabIndex}
            onChange={TabChangeHandler}
            aria-label="voip tabs example"
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
          SIP Config
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
         <Features />
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
    </>
  );
};

export default Line;
