import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
}));

const SignedInMenu = ({ signOut }) => {
  const classes = useStyles();
  const profile = useSelector(state => state.firebase.profile, []);
  // const auth = useSelector(state => state.firebase.auth, []);
  return (
    <div className={classes.root}>
      <Avatar
        alt="profile picture"
        src={profile.photoURL || "/assets/user.png"}
        className={classes.bigAvatar}
      />

      <p>text={profile.displayName}</p>

      <button onClick={signOut}>sign out</button>
    </div>
  );
};

export default SignedInMenu;
