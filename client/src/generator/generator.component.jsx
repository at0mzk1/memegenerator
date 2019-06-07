import React from 'react'
import Card from "../theme/Card";
import CardBody from "../theme/CardBody";
import CardHeader from "../theme/CardHeader";
import customTabsStyle from "../theme/customTabsStyle";
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const onChange = (e, image) => {
  e.preventDefault();
  const transform = Array.from(e.target.elements)
  .filter(el => el.id)
  .reduce((a, b) => ({ ...a, [b.id]: b.value }), {});
  const formData = {
    transform,
    image: image
  }

  fetch(`${process.env.REACT_APP_API_HOSTNAME}/api/image-process`, {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(formData)
  })
  .then(res => {
    if (!res.ok) {
      throw res
    }
    console.log(res.json())
  })
  .catch(err => {
    err.json().then(e => {
      console.log(e)
    })
  })
}

export default props => 
  (<Container>
      <Card>
        <CardHeader color="primary" >
            <div className={customTabsStyle.cardTitle}>Add Text to your meme</div>
        </CardHeader>
        <CardBody>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div key={props.image.id}>
                <img src={props.image.secure_url_ref} alt='' />
              </div>
            </Grid>
            <Grid item xs={6}>
              <MemeTextForm {...props}/>
            </Grid>
          </Grid>
        </CardBody>
      </Card>
    </Container>
  )

const MemeTextForm = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    position: ''
  });

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  function submitForm(e) {
    onChange(e, props.image.secure_url_ref)
  }

  return (
    <form className={classes.root} autoComplete="off" onSubmit={submitForm}>
      <Typography component="div" style={{ padding: 8 * 3 }}>
        Please input your desired text:
      </Typography>
      <input id="memetext" name="memetext" label="Meme Text" type="text" />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="position-simple">Position</InputLabel>
        <Select
          value={values.position}
          onChange={handleChange}
          inputProps={{
            name: 'position',
            id: "position",
          }}
        >
          <MenuItem value="TOP LEFT">TOP LEFT</MenuItem>
          <MenuItem value="TOP">TOP</MenuItem>
          <MenuItem value="TOP RIGHT">TOP RIGHT</MenuItem>
          <MenuItem value="LEFT">LEFT</MenuItem>
          <MenuItem value="CENTER">CENTER</MenuItem>
          <MenuItem value="RIGHT">RIGHT</MenuItem>
          <MenuItem value="BOTTOM LEFT">BOTTOM LEFT</MenuItem>
          <MenuItem value="BOTTOM">BOTTOM</MenuItem>
          <MenuItem value="BOTTOM RIGHT">BOTTOM RIGHT</MenuItem>
        </Select>
      </FormControl>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  )
}
