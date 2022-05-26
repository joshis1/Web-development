import { React, useContext, useState, useRef } from "react";
import { Typography } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Switch } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Link } from "@material-ui/core";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import classes from "./VoipStyles.module.css";
import VoipConfig from "./VoIPConfigMock.json";
import PasswordInput from "../PasswordInput";
//import { DefaultContext } from "../../context/DefaultContext";

export default function Sip(SipProps) {
  //const context = useContext(DefaultContext);
  const inputRootCertificateFile = useRef(null);
  const inputCertificateFile = useRef(null);
  const voipConfigFile = useRef(null);

  //const [settings, setSettings] = useState(context.settingsManager.settings);

  // To do - Certificate can be a component ??

  // expecting the structure to be the following.
  // [ {subject: '', issuedBy: '', notAfter: '' }, {}...]
  const [rootCertificates, setRootCertificates] = useState(
    []
    //context.settingsManager.VoipConfig.callControl.dialPlan.normRules
    // placeHolder for root Certificate
  );

  // expecting the structure to be the following.
  // [ {subject: '', issuedBy: '', notAfter: '', inUse: true }, {}...]
  const [certificates, setCertificates] = useState(
    []
    //context.settingsManager.VoipConfig.callControl.dialPlan.normRules
    // placeHolder for root Certificate
  );

  const [saveState, setSaveState] = useState(false);

  const [uploadState, setUploadState] = useState(false);

  const vendorSpecificURL = [
    "https://support.biamp.com/Tesira/VoIP/Generic_VoIP_configuration_for_Tesira_using_the_VoIP_web_interface",
    "https://support.biamp.com/Tesira/VoIP/Avaya_Session_Manager_configuration_for_Tesira_using_the_VoIP_web_interface",
    "https://support.biamp.com/Tesira/VoIP/Avaya_IP_Office_configuration_for_Tesira_using_the_VoIP_web_interface",
    "https://support.biamp.com/Tesira/VoIP/Cisco_CallManager_configuration_for_Tesira_using_the_VoIP_web_interface",
    "https://support.biamp.com/Tesira/VoIP/Mitel_3300_ICP_configuration_for_Tesira_using_the_VoIP_web_interface",
  ];

  const onChangeHandler = (event) => {
    context.settingsManager.onChange(event, setSettings);
    SipProps.onSaveState(true);
    setSaveState(true);
  };

  const onSubmitHandler = (event) => {
    context.settingsManager.onSubmit(event);
    SipProps.onSaveState(false);
    setSaveState(false);
  };

  const onConfigUploadHandler = (event) => {
    //send the config file to backend.
    setUploadState(false);
  }

  const onConfigDownloadHandler = (event) => {
    //request backend for the running VoIP config 
    // make it available to download.
  }


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

  const rowCertificationHeader = [
    {
      title: "Subject",
      field: "subject",
      editable: "never",
    },
    {
      title: "Issued By",
      field: "issuedBy",
      editable: "never",
    },
    {
      title: "Not After",
      field: "notAfter",
      editable: "never",
    },
  ];

  const certificatesHeader = [
    ...rowCertificationHeader,
    { title: "Use", field: "inUse", type: "boolean" },
  ];

  const onRootCertificateAddHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    inputRootCertificateFile.current.click();
  };

  const onRowDeleteRootCertificateHandler = (oldData) =>
    new Promise((resolve, reject) => {
      const deletedRootCertificateRow = [...rootCertificates];
      //send the backend the file to be deleted.
      const index = oldData.tableData.id;
      deletedRootCertificateRow.splice(index, 1);
      setRootCertificates(deletedRootCertificateRow);
      setSaveState(true);
      resolve();
    });

  const onCertificateAddHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    inputCertificateFile.current.click();
  };

  const onRowDeleteCertificateHandler = (oldData) =>
    new Promise((resolve, reject) => {
      const deletedCertificateRow = [...certificates];
      //send the backend the file to be deleted.
      const index = oldData.tableData.id;
      deletedCertificateRow.splice(index, 1);
      setCertificates(deletedCertificateRow);
      setSaveState(true);
      resolve();
    });

  const onRowUpdateCertificateHandler = (newData, oldData) =>
    new Promise((resolve, reject) => {
      const updateCertificateRow = [...certificates];
      // make all the certificates in use to false.
      // only one certificate can be true at a time.
      updateCertificateRow.forEach((cert) => {
        cert.inUse = false;
      });
      const index = oldData.tableData.id;
      updateCertificateRow[index] = newData;
      setCertificates([...updateCertificateRow]);
      setSaveState(true);
      resolve();
    });

  return (
    <>
      <Card id="sip-card">
        <CardContent id="sip-card-content" className={classes.container}>
          {SipProps.advancedConfig && (
            <Typography
              component="h5"
              variant="h5"
              className={classes.title}
              gutterBottom
            >
              Account
            </Typography>
          )}

          <Grid container alignItems="center" className={classes.gridContainer}>
            <Grid item xs={6}>
              <FormControl className={classes.FormControl} size="small">
                <Typography component="h4" className={classes.labelTitle}>
                  Proxy&nbsp;Vendor&emsp;
                  <Link
                    id="sip-vendor-link"
                    href={vendorSpecificURL[VoipConfig.account.vendor]}
                    color="primary"
                    underline="always"
                    target="_blank"
                  >
                    Vendor Specific Setup Instructions
                  </Link>
                </Typography>
                <Select
                  id="voip__account__vendor"
                  name="voip__account__vendor"
                  value={VoipConfig.account.vendor}
                  onChange={onChangeHandler}
                  size="small"
                  variant="outlined"
                >
                  <MenuItem id="sip-vendor-1" value={1}>Generic UC</MenuItem>
                  <MenuItem id="sip-vendor-2" value={2}>Avaya SM</MenuItem>
                  <MenuItem id="sip-vendor-3" value={3}>Avaya IPO</MenuItem>
                  <MenuItem id="sip-vendor-4" value={4}>Cisco</MenuItem>
                  <MenuItem id="sip-vendor-5" value={5}>Mitel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Extension
              </Typography>
              <TextField
                id="voip__account__user"
                name="voip__account__user"
                value={VoipConfig.account.user}
                onChange={onChangeHandler}
                variant="outlined"
                size="small"
                className={classes.text}
                InputProps={{ inputProps: { maxLength: 48 } }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Authentication&nbsp;User&nbsp;Name
              </Typography>
              <TextField
                id="voip__account__auth__name"
                name="voip__account__auth__name"
                value={VoipConfig.account.auth.name}
                onChange={onChangeHandler}
                variant="outlined"
                type="Text"
                size="small"
                className={classes.text}
                InputProps={{ inputProps: { maxLength: 48 } }}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center" className={classes.gridContainer}>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                SIP&nbsp;Proxy&nbsp;Address
              </Typography>
              <TextField
                id="voip__account__proxies__0__addr"
                name="voip__account__proxies__0__addr"
                value={VoipConfig.account.proxies[0].addr}
                onChange={onChangeHandler}
                variant="outlined"
                size="small"
                type="Text"
                className={classes.text}
                InputProps={{ inputProps: { pattern: "^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" } }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                SIP&nbsp;Proxy&nbsp;Port{" "}
              </Typography>
              <TextField
                id="voip__account__proxies__0__port"
                name="voip__account__proxies__0__port"
                value={VoipConfig.account.proxies[0].port}
                onChange={onChangeHandler}
                variant="outlined"
                size="small"
                type="number"
                className={classes.text}
                InputProps={{ inputProps: { min: 2000, max: 65535, step: 1 } }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Display&nbsp;Name
              </Typography>
              <TextField
                id="voip__account__displayName"
                name="voip__account__displayName"
                value={VoipConfig.account.displayName}
                onChange={onChangeHandler}
                variant="outlined"
                size="small"
                type="Text"
                className={classes.text}
                InputProps={{ inputProps: { maxLength: 48 } }}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Password
              </Typography>
              <PasswordInput
                id="voip__account__auth__passwd"
                name="voip__account__auth__passwd"
                onChange={onChangeHandler}
                value={VoipConfig.account.auth.passwd}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center" className={classes.gridContainer}>
            {SipProps.advancedConfig && (
              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  DNS&nbsp;NAPTR/SRV&nbsp;Lookup
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__account__dnsServ"
                    name="voip__account__dnsServ"
                    value={VoipConfig.account.dnsServ}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>
            )}

            {SipProps.advancedConfig && (
              <Grid item xs={3}>
                <FormControl className={classes.FormControl} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Proxy&nbsp;Transport
                  </Typography>

                  <Select
                    id="voip__account__transport"
                    name="voip__account__transport"
                    value={VoipConfig.account.transport}
                    onChange={onChangeHandler}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem id="sip-transport-1" value={1}>UDP</MenuItem>
                    <MenuItem id="sip-transport-2" value={2}>TCP</MenuItem>
                    <MenuItem id="sip-transport-3" value={3}>TLS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                SIP&nbsp;Domain&nbsp;Name
              </Typography>
              <TextField
                id="voip__account__domain"
                name="voip__account__domain"
                value={VoipConfig.account.domain}
                onChange={onChangeHandler}
                variant="outlined"
                type="Text"
                size="small"
                className={classes.text}
                InputProps={{ inputProps: { maxLength: 48 } }}
              />
            </Grid>

            {SipProps.advancedConfig && (
              <Grid item xs={2}>
                <Typography component="h4" className={classes.labelTitle}>
                  Register
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__account__reqRegister"
                    name="voip__account__reqRegister"
                    value={VoipConfig.account.regRegister}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Registration&nbsp;Expiration
              </Typography>
              <TextField
                id="voip__account__regInterval"
                name="voip__account__regInterval"
                value={VoipConfig.account.regInterval}
                onChange={onChangeHandler}
                variant="outlined"
                type="number"
                size="small"
                className={classes.text}
                InputProps={{ inputProps: { min: 30, max: 9999, step: 1 } }}
              />
            </Grid>

            {!SipProps.advancedConfig && (
              <Grid item xs={3}>
                <label htmlFor="voipConfig" className={classes.labelTitle}>Configuration&nbsp;File</label>
                <input type="file"
                  id="voipConfig" name="voipConfig"
                  accept=".json"
                  ref={voipConfigFile}
                  onInput={(e) => {
                    console.log(e.value);
                    e.value != "" ? setUploadState(true) : setUploadState(false)

                  }}></input>
              </Grid>
            )}

            {!SipProps.advancedConfig && (
              <Grid item xs={3}>
                <Box
                  className={classes.addDeleteContainer}
                  style={{ marginTop: "4rem" }}
                >
                  <Button
                    variant="contained"
                    className={classes.operationButton}
                    disabled={!uploadState}
                    onClick={onConfigUploadHandler}
                  >
                    UPLOAD
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.operationButton}
                    onClick={onConfigDownloadHandler}
                  >
                    DOWNLOAD
                  </Button>
                </Box>
              </Grid>
            )}

            {SipProps.advancedConfig && (
              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  AVPF
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__account__avpf"
                    name="voip__account__avpf"
                    value={VoipConfig.account.avpf}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>
            )}

            {SipProps.advancedConfig && (
              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  AVPF&nbsp;Interval
                </Typography>
                <TextField
                  id="voip__account__avpfInterval"
                  name="voip__account__avpfInterval"
                  value={VoipConfig.account.avpfInterval}
                  onChange={onChangeHandler}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.smallText}
                  disabled={!VoipConfig.account.avpf}
                  InputProps={{ inputProps: { min: 1, max: 5, step: 1 } }}
                />
              </Grid>
            )}

            {SipProps.advancedConfig && (
              <Grid item xs={2}>
                <Typography component="h4" className={classes.labelTitle}>
                  PRACK
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__callControl__prack"
                    name="voip__callControl__prack"
                    value={VoipConfig.callControl.prack}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>
            )}
          </Grid>

          {SipProps.advancedConfig && (
            <Grid
              container
              alignItems="center"
              className={classes.gridContainer}
            >
              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  Session&nbsp;Timer
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__callControl__sessTimer__enable"
                    name="voip__callControl__sessTimer__enable"
                    value={VoipConfig.callControl.sessTimer.enable}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Session&nbsp;Refresher
                  </Typography>
                  <Select
                    id="voip__callControl__sessTimer__refresher"
                    name="voip__callControl__sessTimer__refresher"
                    value={VoipConfig.callControl.sessTimer.refresher}
                    onChange={onChangeHandler}
                    size="small"
                    variant="outlined"
                    disabled={!VoipConfig.callControl.sessTimer.enable}
                  >
                    <MenuItem id="sip-refresher-1" value={1}>Auto</MenuItem>
                    <MenuItem id="sip-refresher-2" value={2}>UAS</MenuItem>
                    <MenuItem id="sip-refresher-3" value={3}>UAC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  Session&nbsp;Expiration
                </Typography>
                <TextField
                  id="voip__callControl__sessTimer__expires"
                  name="voip__callControl__sessTimer__expires"
                  value={VoipConfig.callControl.sessTimer.expires}
                  onChange={onChangeHandler}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.text}
                  disabled={!VoipConfig.callControl.sessTimer.enable}
                  InputProps={{ inputProps: { min: 90, max: 65535, step: 1 } }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  Min&nbsp;Session&nbsp;Expiration
                </Typography>
                <TextField
                  id="voip__callControl__sessTimer__minExpires"
                  name="voip__callControl__sessTimer__minExpires"
                  value={VoipConfig.callControl.sessTimer.minExpires}
                  onChange={onChangeHandler}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.text}
                  disabled={!VoipConfig.callControl.sessTimer.enable}
                  InputProps={{ inputProps: { min: 90, max: 65535, step: 1 } }}
                />
              </Grid>
            </Grid>
          )}

          {SipProps.advancedConfig && (
            <Box className={classes.formControlContainer}>
              <Typography
                component="h5"
                variant="h5"
                className={classes.title}
                gutterBottom
              >
                RTP/SRTP
              </Typography>
            </Box>
          )}

          {SipProps.advancedConfig && (
            <Grid
              container
              alignItems="center"
              className={classes.gridContainer}
            >
              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  Random&nbsp;RTP&nbsp;port
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__transports__rtpUdp__random"
                    name="voip__transports__rtpUdp__random"
                    value={VoipConfig.transports.rtpUdp.random}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  Audio&nbsp;RTP&nbsp;UDP&nbsp;Port
                </Typography>
                <TextField
                  id="voip__transports__rtpUdp__port"
                  name="voip__transports__rtpUdp__port"
                  value={VoipConfig.transports.rtpUdp.port}
                  onChange={onChangeHandler}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.text}
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Media&nbsp;Encryption&nbsp;Preference
                  </Typography>
                  <Select
                    id="voip__callControl__encryption__mode"
                    name="voip__callControl__encryption__mode"
                    value={VoipConfig.callControl.encryption.mode}
                    onChange={onChangeHandler}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem id="sip-encryption-mode-1" value={1}>None</MenuItem>
                    <MenuItem id="sip-encryption-mode-2" value={2}>Optional</MenuItem>
                    <MenuItem id="sip-encryption-mode-3" value={3}>Required</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Media&nbsp;Encryption&nbsp;Method
                  </Typography>
                  <Select
                    id="voip__callControl__encryption__algorithm"
                    name="voip__callControl__encryption__algorithm"
                    value={VoipConfig.callControl.encryption.algorithm}
                    onChange={onChangeHandler}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem id="sip-encryption-algorithm-1" value={1}>DTLS</MenuItem>
                    <MenuItem id="sip-encryption-algorithm-2" value={2}>SRTP</MenuItem>
                    <MenuItem id="sip-encryption-algorithm-3" value={3}>ZRTP</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {SipProps.advancedConfig && (
            <Box className={classes.formControlContainer}>
              <Typography
                component="h5"
                variant="h5"
                className={classes.title}
                gutterBottom
              >
                Network&nbsp;Protocol&nbsp;and&nbsp;Ports
              </Typography>
            </Box>
          )}

          {SipProps.advancedConfig && (
            <Grid
              container
              alignItems="center"
              className={classes.gridContainer}
            >
              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Enable&nbsp;UDP
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__transports__sipUdp__enable"
                    name="voip__transports__sipUdp__enable"
                    value={VoipConfig.transports.sipUdp.enable}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={2}>
                <Typography component="h4" className={classes.labelTitle}>
                  Random&nbsp;UDP&nbsp;Port
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__transports__sipUdp__random"
                    name="voip__transports__sipUdp__random"
                    value={VoipConfig.transports.sipUdp.random}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                    disabled={!VoipConfig.transports.sipUdp.enable}
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  SIP&nbsp;UDP&nbsp;Port
                </Typography>
                <TextField
                  id="voip__transports__sipUdp__port"
                  name="voip__transports__sipUdp__port"
                  value={VoipConfig.transports.sipUdp.port}
                  onChange={onChangeHandler}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.text}
                  disabled={!VoipConfig.transports.sipUdp.enable}
                  InputProps={{ inputProps: { min: 2000, max: 65535, step: 1 } }}
                />
              </Grid>

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Enable&nbsp;TCP
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__transports__sipTcp__enable"
                    name="voip__transports__sipTcp__enable"
                    value={VoipConfig.transports.sipTcp.enable}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={2}>
                <Typography component="h4" className={classes.labelTitle}>
                  Random&nbsp;TCP&nbsp;Port
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__transports__sipTcp__random"
                    name="voip__transports__sipTcp__random"
                    value={VoipConfig.transports.sipTcp.random}
                    onChange={onChangeHandler}
                    variant="outlined"
                    size="small"
                    color="primary"
                    disabled={!VoipConfig.transports.sipTcp.enable}
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  SIP&nbsp;TCP&nbsp;Port
                </Typography>
                <TextField
                  id="voip__transports__sipTcp__port"
                  name="voip__transports__sipTcp__port"
                  value={VoipConfig.transports.sipTcp.port}
                  onChange={onChangeHandler}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.text}
                  disabled={!VoipConfig.transports.sipTcp.enable}
                  InputProps={{ inputProps: { min: 2000, max: 65535, step: 1 } }}
                />
              </Grid>

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Enable&nbsp;TLS
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__transports__sipTls__enable"
                    name="voip__transports__sipTls__enable"
                    value={VoipConfig.transports.sipTls.enable}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={2}>
                <Typography component="h4" className={classes.labelTitle}>
                  Random&nbsp;TLS&nbsp;Port
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__transports__sipTls__random"
                    name="voip__transports__sipTls__random"
                    value={VoipConfig.transports.sipTls.random}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                    disabled={!VoipConfig.transports.sipTls.enable}
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  SIP&nbsp;TLS&nbsp;Port
                </Typography>
                <TextField
                  id="voip__transports__sipTls__port"
                  name="voip__transports__sipTls__port"
                  value={VoipConfig.transports.sipTls.port}
                  onChange={onChangeHandler}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.text}
                  disabled={!VoipConfig.transports.sipTls.enable}
                  InputProps={{ inputProps: { min: 2000, max: 65535, step: 1 } }}
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl className={classes.text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    TLS&nbsp;Version
                  </Typography>
                  <Select
                    id="voip__tls__version"
                    name="voip__tls__version"
                    value={VoipConfig.tls.version}
                    onChange={onChangeHandler}
                    size="small"
                    variant="outlined"
                    disabled={!VoipConfig.transports.sipTls.enable}
                  >
                    <MenuItem id="sip-tls-ver-1" value={1}>TLS 1.0</MenuItem>
                    <MenuItem id="sip-tls-ver-2" value={2}>TLS 1.1</MenuItem>
                    <MenuItem id="sip-tls-ver-3" value={3}>TLS 1.2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {SipProps.advancedConfig && (
            <Box className={classes.formControlContainer}>
              <Typography
                component="h5"
                variant="h5"
                className={classes.title}
                gutterBottom
              >
                SIPS
              </Typography>
            </Box>
          )}

          {SipProps.advancedConfig && (
            <Grid
              container
              alignItems="center"
              className={classes.gridContainer}
            >
              <Grid item xs={6}>
                <FormControl className={classes.text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Certificate&nbsp;Preference
                  </Typography>
                  <Select
                    id="voip__tls__cert__tlsCertPref"
                    name="voip__tls__cert__tlsCertPref"
                    value={VoipConfig.tls.cert.tlsCertPref}
                    onChange={onChangeHandler}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem id="sip-tls-cert-pref-1" value={1}>None</MenuItem>
                    <MenuItem id="sip-tls-cert-pref-2" value={2}>Mutual</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  SIP&nbsp;URI
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    id="voip__account__sipsUri"
                    name="voip__account__sipsUri"
                    value={VoipConfig.account.sipsUri}
                    onChange={onChangeHandler}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Box className={classes.saveButtonContainer}>
            <Button
              id="sip-save-button"
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
      {SipProps.advancedConfig && (
        <Card id="sip-cert-card">
          <CardContent id="sip-cert-card-content" className={classes.container}>
            <Box className={classes.formControlContainer}>
              <Typography
                component="h5"
                variant="h5"
                className={classes.title}
                gutterBottom
              >
                Certificate&nbsp;Management
              </Typography>
            </Box>

            <input
              type="file"
              id="file"
              accept=".pem,.der"
              ref={inputRootCertificateFile}
              style={{ display: "none" }}
            />

            <ThemeProvider theme={theme}>
              <MaterialTable
                columns={rowCertificationHeader}
                data={rootCertificates}
                title="Root Certificates"
                options={{
                  selection: true,
                  search: false,
                  paging: false,
                  actionsColumnIndex: -1,
                  addRowPosition: "first",
                  headerStyle: {
                    backgroundColor: "#EEE",
                  },
                  rowStyle: (rowData) => ({
                    backgroundColor:
                      rowData.tableData.id % 2 === 0 ? "#FFF" : "#EEE",
                  }),
                }}
                editable={{
                  onRowDelete: onRowDeleteRootCertificateHandler,
                }}
                actions={[
                  {
                    icon: "add",
                    tooltip: "Add Root Certificate",
                    isFreeAction: true,
                    onClick: onRootCertificateAddHandler,
                  },
                ]}
              />
            </ThemeProvider>

            <Box className={classes.formControlContainer}>
              <Typography
                component="h5"
                variant="h5"
                className={classes.title}
                gutterBottom
              />
            </Box>
            <input
              type="file"
              id="file"
              accept=".pfx"
              ref={inputCertificateFile}
              style={{ display: "none" }}
            />
            <ThemeProvider theme={theme}>
              <MaterialTable
                columns={certificatesHeader}
                data={certificates}
                title="Certificates"
                options={{
                  selection: true,
                  search: false,
                  paging: false,
                  actionsColumnIndex: -1,
                  addRowPosition: "first",
                  headerStyle: {
                    backgroundColor: "#EEE",
                  },
                  rowStyle: (rowData) => ({
                    backgroundColor:
                      rowData.tableData.id % 2 === 0 ? "#FFF" : "#EEE",
                  }),
                }}
                editable={{
                  onRowDelete: onRowDeleteCertificateHandler,
                  onRowUpdate: onRowUpdateCertificateHandler,
                }}
                actions={[
                  {
                    icon: "add",
                    tooltip: "Add Certificate",
                    isFreeAction: true,
                    onClick: onCertificateAddHandler,
                  },
                ]}
              />
            </ThemeProvider>
          </CardContent>
        </Card>
      )}
    </>
  );
}
