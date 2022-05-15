import { React, useContext, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import classes from "./Sip.module.css";
import VoipConfig from "./VoIPConfigMock.json";

//import { DefaultContext } from "../../context/DefaultContext";

export default function Sip(SipProps) {
  //const context = useContext(DefaultContext);

  //const [settings, setSettings] = useState(context.settingsManager.settings);

  const [showPassword, setShowPassword] = useState(false);
  const [saveState, setSaveState] = useState(false);

  const vendorSpecificURL = [
    "https://google.com",
    "https://google.com",
    "https://google.com",
    "https://google.com",
    "https://google.com",
  ];

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
                    href={vendorSpecificURL[VoipConfig.account.vendor]}
                    target="_blank"
                  >
                    Vendor Specific Setup Instructions
                  </Link>
                </Typography>
                <Select
                  name="voip__account__vendor"
                  value={VoipConfig.account.vendor}
                  onChange={onChange}
                  size="small"
                  variant="outlined"
                >
                  <MenuItem value={0}>Generic UC</MenuItem>
                  <MenuItem value={1}>Avaya SM</MenuItem>
                  <MenuItem value={2}>Avaya IPO</MenuItem>
                  <MenuItem value={3}>Cisco</MenuItem>
                  <MenuItem value={4}>Mitel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                SIP&nbsp;User&nbsp;Name
              </Typography>
              <TextField
                name="voip__account__user"
                value={VoipConfig.account.user}
                onChange={onChange}
                variant="outlined"
                size="small"
                className={classes.Text}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Authentication&nbsp;User&nbsp;Name
              </Typography>
              <TextField
                name="voip__account__auth__name"
                value={VoipConfig.account.auth.name}
                onChange={onChange}
                variant="outlined"
                type="Text"
                size="small"
                className={classes.Text}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center" className={classes.gridContainer}>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Proxy&nbsp;Address
              </Typography>
              <TextField
                name="voip__account__proxies__0__addr"
                value={VoipConfig.account.proxies[0].addr}
                onChange={onChange}
                variant="outlined"
                size="small"
                type="Text"
                className={classes.Text}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Proxy&nbsp;Port{" "}
              </Typography>
              <TextField
                name="voip__account__proxies__0__port"
                value={VoipConfig.account.proxies[0].port}
                onChange={onChange}
                variant="outlined"
                size="small"
                type="number"
                className={classes.Text}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                SIP&nbsp;Display&nbsp;Name
              </Typography>
              <TextField
                name="voip__account__displayName"
                value={VoipConfig.account.displayName}
                onChange={onChange}
                variant="outlined"
                size="small"
                type="Text"
                className={classes.Text}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                Authentication&nbsp;Password
              </Typography>
              <OutlinedInput
                name="voip__account__auth__passwd"
                onChange={onChange}
                value={VoipConfig.account.auth.passwd}
                type={showPassword ? "text" : "password"}
                variant="outlined"
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

          <Grid container alignItems="center" className={classes.gridContainer}>
            {SipProps.advancedConfig && (
              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  DNS&nbsp;NAPTR/SRV&nbsp;Lookup
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    name="voip__account__dnsServ"
                    value={VoipConfig.account.dnsServ}
                    onChange={onChange}
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
                    name="voip__account__transport"
                    value={VoipConfig.account.transport}
                    onChange={onChange}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem value={0}>UDP</MenuItem>
                    <MenuItem value={1}>TCP</MenuItem>
                    <MenuItem value={2}>TLS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={3}>
              <Typography component="h4" className={classes.labelTitle}>
                SIP&nbsp;Domain&nbsp;Name
              </Typography>
              <TextField
                name="voip__account__domain"
                value={VoipConfig.account.domain}
                onChange={onChange}
                variant="outlined"
                type="Text"
                size="small"
                className={classes.Text}
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
                    name="voip__account__reqRegister"
                    value={VoipConfig.account.regRegister}
                    onChange={onChange}
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
                name="voip__account__regInterval"
                value={VoipConfig.account.regInterval}
                onChange={onChange}
                variant="outlined"
                type="number"
                size="small"
                className={classes.Text}
              />
            </Grid>

            {!SipProps.advancedConfig && (
              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  Configuration&nbsp;File
                </Typography>
                <TextField
                  name="voip__settings__upload"
                  type="file"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  size="small"
                />
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
                  >
                    UPLOAD
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.operationButton}
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
                    name="voip__account__avpf"
                    value={VoipConfig.account.avpf}
                    onChange={onChange}
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
                  name="voip__account__avpfInterval"
                  value={VoipConfig.account.avpfInterval}
                  onChange={onChange}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.smallText}
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
                    name="voip__callControl__prack"
                    value={VoipConfig.callControl.prack}
                    onChange={onChange}
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
                    name="voip__callControl__sessTimer__enable"
                    value={VoipConfig.callControl.sessTimer.enable}
                    onChange={onChange}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.Text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Session&nbsp;Refresher
                  </Typography>
                  <Select
                    name="voip__callControl__sessTimer__refresher"
                    value={VoipConfig.callControl.sessTimer.refresher}
                    onChange={onChange}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem value={0}>Auto</MenuItem>
                    <MenuItem value={1}>UAS</MenuItem>
                    <MenuItem value={2}>UAC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  Session&nbsp;Expiration
                </Typography>
                <TextField
                  name="voip__callControl__sessTimer__expires"
                  value={VoipConfig.callControl.sessTimer.expires}
                  onChange={onChange}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.Text}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  Min&nbsp;Session&nbsp;Expiration
                </Typography>
                <TextField
                  name="voip__callControl__sessTimer__minExpires"
                  value={VoipConfig.callControl.sessTimer.minExpires}
                  onChange={onChange}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.Text}
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
                    name="voip__transports__rtpUdp__random"
                    value={VoipConfig.transports.rtpUdp.random}
                    onChange={onChange}
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
                  name="voip__transports__rtpUdp__port"
                  value={VoipConfig.transports.rtpUdp.port}
                  onChange={onChange}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.Text}
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.Text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Media&nbsp;Encryption&nbsp;Preference
                  </Typography>
                  <Select
                    name="voip__callControl__encryption__mode"
                    value={VoipConfig.callControl.encryption.mode}
                    onChange={onChange}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>Optional</MenuItem>
                    <MenuItem value={2}>Required</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.Text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Media&nbsp;Encryption&nbsp;Method
                  </Typography>
                  <Select
                    name="voip__callControl__encryption__algorithm"
                    value={VoipConfig.callControl.encryption.algorithm}
                    onChange={onChange}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem value={0}>DTLS</MenuItem>
                    <MenuItem value={1}>SRTP</MenuItem>
                    <MenuItem value={2}>ZRTP</MenuItem>
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
                    name="voip__transports__sipUdp__enable"
                    value={VoipConfig.transports.sipUdp.enable}
                    onChange={onChange}
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
                    name="voip__transports__sipUdp__random"
                    value={VoipConfig.transports.sipUdp.random}
                    onChange={onChange}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h4" className={classes.labelTitle}>
                  SIP&nbsp;UDP&nbsp;Port
                </Typography>
                <TextField
                  name="voip__transports__sipUdp__port"
                  value={VoipConfig.transports.sipUdp.port}
                  onChange={onChange}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.Text}
                />
              </Grid>

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Enable&nbsp;TCP
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    name="voip__transports__sipTcp__enable"
                    value={VoipConfig.transports.sipTcp.enable}
                    onChange={onChange}
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
                    name="voip__transports__sipTcp__random"
                    value={VoipConfig.transports.sipTcp.random}
                    onChange={onChange}
                    variant="outlined"
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  SIP&nbsp;TCP&nbsp;Port
                </Typography>
                <TextField
                  name="voip__transports__sipTcp__port"
                  value={VoipConfig.transports.sipTcp.port}
                  onChange={onChange}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.Text}
                />
              </Grid>

              <Grid item xs={4}>
                <Typography component="h4" className={classes.labelTitle}>
                  Enable&nbsp;TLS
                </Typography>
                <Grid item className={classes.switch}>
                  <Grid item>Off</Grid>
                  <Switch
                    name="voip__transports__sipTls__enable"
                    value={VoipConfig.transports.sipTls.enable}
                    onChange={onChange}
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
                    name="voip__transports__sipTls__random"
                    value={VoipConfig.transports.sipTls.random}
                    onChange={onChange}
                    size="small"
                    color="primary"
                  />
                  <Grid item>On</Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Typography component="h4" className={classes.labelTitle}>
                  SIP&nbsp;TLS&nbsp;Port
                </Typography>
                <TextField
                  name="voip__transports__sipTls__port"
                  value={VoipConfig.transports.sipTls.port}
                  onChange={onChange}
                  variant="outlined"
                  type="number"
                  size="small"
                  className={classes.Text}
                />
              </Grid>

              <Grid item xs={2}>
                <Typography component="h4" className={classes.labelTitle}>
                  TLS&nbsp;Version
                </Typography>
                <TextField
                  name="voip__tls__version"
                  value={VoipConfig.tls.version}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  type="text"
                  size="small"
                  className={classes.Text}
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
                <FormControl className={classes.Text} size="small">
                  <Typography component="h4" className={classes.labelTitle}>
                    Certificate&nbsp;Preference
                  </Typography>
                  <Select
                    name="voip__tls__cert__tlsCertPref"
                    value={VoipConfig.tls.cert.tlsCertPref}
                    onChange={onChange}
                    size="small"
                    variant="outlined"
                  >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>Mutual</MenuItem>
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
                    name="voip__account__sipsUri"
                    value={VoipConfig.account.sipsUri}
                    onChange={onChange}
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
        </CardContent>
      </Card>
      {/* {SipProps.advancedConfig && (
        <Card>
          <CardContent>
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
          </CardContent>
        </Card>
      )} */}
    </>
  );
}
