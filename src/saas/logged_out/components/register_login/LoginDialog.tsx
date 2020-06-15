import React, {
  useState, useCallback, useRef,
} from 'react';
import classNames from 'classnames';
import {
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FormDialog from '../../../shared/components/FormDialog';
import HighlightedInformation from '../../../shared/components/HighlightedInformation';
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress';
import VisibilityPasswordTextField from '../../../shared/components/VisibilityPasswordTextField';
import { loginRequest } from '../../../../state/ducks/auth';
import { RootState } from '../../../../state/root';

interface IProps {
  classes: any,
  onClose: () => void,
  openChangePasswordDialog: () => void,
  setStatus: (value: React.SetStateAction<null>) => void,
  status: string,
}

const useStyles = makeStyles((theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:enabled:hover': {
      color: theme.palette.primary.dark,
    },
    '&:enabled:focus': {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: 'auto',
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
}));

const LoginDialog = (props: IProps) => {
  const {
    onClose,
    openChangePasswordDialog,
    setStatus,
    status,
  } = props;
  const classes = useStyles();
  const isLoading = useSelector((state: RootState) => state.authReducer.isLoading);
  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef<HTMLDivElement>(null);
  const loginPassword = useRef<HTMLDivElement>(null);

  const login = useCallback(() => {
    if (loginEmail && loginEmail.current && loginPassword && loginPassword.current) {
      dispatch(loginRequest({
        username: (loginEmail.current as HTMLInputElement).value,
        password: (loginPassword.current as HTMLInputElement).value,
      }));
    }
  }, [loginEmail, loginPassword, dispatch]);

  return (
    <>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="Login"
        content={(
          <>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === 'invalidEmail'}
              required
              fullWidth
              label="Email Address"
              inputRef={loginEmail}
              autoFocus
              autoComplete="off"
              type="email"
              onChange={() => {
                if (status === 'invalidEmail') {
                  setStatus(null);
                }
              }}
              helperText={
                status === 'invalidEmail'
                && "This email address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === 'invalidPassword'}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === 'invalidPassword') {
                  setStatus(null);
                }
              }}
              helperText={
                status === 'invalidPassword' && (
                  <span>
                    Incorrect password. Try again, or click on
                    {' '}
                    <b>&quot;Forgot Password?&quot;</b>
                    {' '}
                    to reset it.
                  </span>
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            {status === 'verificationEmailSend' && (
              <HighlightedInformation>
                We have send instructions on how to reset your password to your
                email address
              </HighlightedInformation>
            )}
          </>
        )}
        actions={(
          <>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null,
              )}
              color="primary"
              onClick={() => !isLoading && openChangePasswordDialog()}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13)
                  || event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
              Forgot Password?
            </Typography>
          </>
        )}
      />
    </>
  );
};

export default LoginDialog;
